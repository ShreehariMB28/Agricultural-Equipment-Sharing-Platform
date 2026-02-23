import os
import uuid
import sqlite3
from functools import wraps
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash, g, jsonify
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'farmer-equipment-sharing-secret-key-2026'
app.config['DATABASE'] = os.path.join(app.root_path, 'database.db')
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5 MB max
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ─── Database Helpers ───────────────────────────────────────────────

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    db.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS equipment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT DEFAULT NULL,
            owner_id INTEGER NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        );
    ''')
    db.commit()

    # Migration: add image column if missing
    cols = [row[1] for row in db.execute('PRAGMA table_info(equipment)').fetchall()]
    if 'image' not in cols:
        db.execute('ALTER TABLE equipment ADD COLUMN image TEXT DEFAULT NULL')
        db.commit()


with app.app_context():
    init_db()


# ─── Auth Decorator ─────────────────────────────────────────────────

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated


# ─── Context Processor ──────────────────────────────────────────────

@app.context_processor
def inject_user():
    user = None
    if 'user_id' in session:
        db = get_db()
        user = db.execute(
            'SELECT * FROM users WHERE id = ?', (session['user_id'],)
        ).fetchone()
    return dict(current_user=user, cart_count=len(session.get('cart', [])))


# ─── Page Routes ────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


# ─── Auth Routes ────────────────────────────────────────────────────

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        confirm = request.form.get('confirm_password', '').strip()

        if not username or not email or not password:
            flash('All fields are required.', 'error')
            return redirect(url_for('register'))
        if password != confirm:
            flash('Passwords do not match.', 'error')
            return redirect(url_for('register'))
        if len(password) < 6:
            flash('Password must be at least 6 characters.', 'error')
            return redirect(url_for('register'))

        db = get_db()
        try:
            db.execute(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                (username, email, generate_password_hash(password))
            )
            db.commit()
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username or email already exists.', 'error')
            return redirect(url_for('register'))

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        if not username or not password:
            flash('Please fill in all fields.', 'error')
            return redirect(url_for('login'))

        db = get_db()
        user = db.execute(
            'SELECT * FROM users WHERE username = ?', (username,)
        ).fetchone()

        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['username'] = user['username']
            flash(f'Welcome back, {user["username"]}!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password.', 'error')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))


# ─── Profile Route ──────────────────────────────────────────────────

@app.route('/profile')
@login_required
def profile():
    db = get_db()
    user = db.execute(
        'SELECT * FROM users WHERE id = ?', (session['user_id'],)
    ).fetchone()
    equipment = db.execute(
        'SELECT * FROM equipment WHERE owner_id = ?', (session['user_id'],)
    ).fetchall()
    return render_template('profile.html', user=user, equipment=equipment)


# ─── Equipment Routes ───────────────────────────────────────────────

@app.route('/equipment')
def equipment():
    db = get_db()
    search = request.args.get('search', '').strip()
    min_price = request.args.get('min_price', '')
    max_price = request.args.get('max_price', '')

    query = '''
        SELECT equipment.*, users.username AS owner_name
        FROM equipment JOIN users ON equipment.owner_id = users.id
        WHERE 1=1
    '''
    params = []

    if search:
        query += ' AND (equipment.name LIKE ? OR equipment.description LIKE ?)'
        params.extend([f'%{search}%', f'%{search}%'])
    if min_price:
        try:
            query += ' AND equipment.price >= ?'
            params.append(float(min_price))
        except ValueError:
            pass
    if max_price:
        try:
            query += ' AND equipment.price <= ?'
            params.append(float(max_price))
        except ValueError:
            pass

    query += ' ORDER BY equipment.id DESC'
    items = db.execute(query, params).fetchall()
    return render_template(
        'equipment.html', equipment=items,
        search=search, min_price=min_price, max_price=max_price
    )


@app.route('/equipment/add', methods=['POST'])
@login_required
def add_equipment():
    name = request.form.get('name', '').strip()
    description = request.form.get('description', '').strip()
    price = request.form.get('price', '').strip()

    if not name or not description or not price:
        flash('All fields are required to add equipment.', 'error')
        return redirect(url_for('equipment'))

    try:
        price = float(price)
        if price <= 0:
            raise ValueError
    except ValueError:
        flash('Please enter a valid positive price.', 'error')
        return redirect(url_for('equipment'))

    # Handle image upload
    image_filename = None
    file = request.files.get('image')
    if file and file.filename:
        if allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            image_filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))
        else:
            flash('Invalid image format. Allowed: png, jpg, jpeg, gif, webp', 'error')
            return redirect(url_for('equipment'))

    db = get_db()
    db.execute(
        'INSERT INTO equipment (name, description, price, image, owner_id) VALUES (?, ?, ?, ?, ?)',
        (name, description, price, image_filename, session['user_id'])
    )
    db.commit()
    flash('Equipment added successfully!', 'success')
    return redirect(url_for('equipment'))


@app.route('/equipment/delete/<int:item_id>', methods=['POST'])
@login_required
def delete_equipment(item_id):
    db = get_db()
    db.execute(
        'DELETE FROM equipment WHERE id = ? AND owner_id = ?',
        (item_id, session['user_id'])
    )
    db.commit()
    flash('Equipment removed.', 'success')
    return redirect(url_for('profile'))


# ─── Cart Routes ────────────────────────────────────────────────────

@app.route('/cart')
@login_required
def cart():
    cart_items = session.get('cart', [])
    items = []
    total = 0
    if cart_items:
        db = get_db()
        for entry in cart_items:
            item = db.execute(
                'SELECT * FROM equipment WHERE id = ?', (entry['id'],)
            ).fetchone()
            if item:
                duration = entry.get('duration', 1)
                subtotal = item['price'] * duration
                items.append({
                    'id': item['id'],
                    'name': item['name'],
                    'description': item['description'],
                    'price': item['price'],
                    'image': item['image'],
                    'duration': duration,
                    'subtotal': subtotal
                })
                total += subtotal
    return render_template('cart.html', items=items, total=total)


@app.route('/cart/add/<int:item_id>', methods=['POST'])
@login_required
def add_to_cart(item_id):
    duration = int(request.form.get('duration', 1))
    if duration < 1:
        duration = 1

    cart = session.get('cart', [])
    # prevent duplicate
    for entry in cart:
        if entry['id'] == item_id:
            flash('Item is already in your cart.', 'warning')
            return redirect(url_for('equipment'))

    cart.append({'id': item_id, 'duration': duration})
    session['cart'] = cart
    flash('Item added to cart!', 'success')
    return redirect(url_for('equipment'))


@app.route('/cart/remove/<int:item_id>', methods=['POST'])
@login_required
def remove_from_cart(item_id):
    cart = session.get('cart', [])
    cart = [entry for entry in cart if entry['id'] != item_id]
    session['cart'] = cart
    flash('Item removed from cart.', 'success')
    return redirect(url_for('cart'))


@app.route('/cart/update/<int:item_id>', methods=['POST'])
@login_required
def update_cart(item_id):
    duration = int(request.form.get('duration', 1))
    if duration < 1:
        duration = 1
    cart = session.get('cart', [])
    for entry in cart:
        if entry['id'] == item_id:
            entry['duration'] = duration
            break
    session['cart'] = cart
    flash('Cart updated.', 'success')
    return redirect(url_for('cart'))


@app.route('/cart/checkout', methods=['POST'])
@login_required
def checkout():
    if not session.get('cart'):
        flash('Your cart is empty.', 'warning')
        return redirect(url_for('cart'))

    session['cart'] = []
    flash('🎉 Checkout successful! Your equipment rental has been confirmed.', 'success')
    return redirect(url_for('equipment'))


# ─── Error Handlers ─────────────────────────────────────────────────

@app.errorhandler(404)
def not_found(e):
    flash('Page not found.', 'error')
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=5000)
