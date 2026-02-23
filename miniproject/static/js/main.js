/* ═══════════════════════════════════════════════════════
   FarmShare — Main JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFlashMessages();
    initFormValidation();
    initSmoothScroll();
});

/* ─── Navbar ────────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('open');
        });

        // Close menu on link click
        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('open');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('open');
            }
        });
    }
}

/* ─── Flash Messages ────────────────────────────────────── */
function initFlashMessages() {
    const container = document.getElementById('flashContainer');
    if (!container) return;

    const messages = container.querySelectorAll('.flash-message');
    messages.forEach((msg, index) => {
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            msg.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => msg.remove(), 300);
        }, 5000 + index * 500);

        // Click to dismiss
        msg.addEventListener('click', () => {
            msg.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => msg.remove(), 300);
        });
    });

    // Add slideOut keyframes dynamically
    if (!document.getElementById('slideOutStyle')) {
        const style = document.createElement('style');
        style.id = 'slideOutStyle';
        style.textContent = `
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ─── Form Validation ───────────────────────────────────── */
function initFormValidation() {
    // Register form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            const password = registerForm.querySelector('#password');
            const confirm = registerForm.querySelector('#confirm_password');
            const username = registerForm.querySelector('#username');

            if (username && username.value.trim().length < 3) {
                e.preventDefault();
                showFieldError(username, 'Username must be at least 3 characters');
                return;
            }

            if (password && password.value.length < 6) {
                e.preventDefault();
                showFieldError(password, 'Password must be at least 6 characters');
                return;
            }

            if (password && confirm && password.value !== confirm.value) {
                e.preventDefault();
                showFieldError(confirm, 'Passwords do not match');
                return;
            }
        });
    }

    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const username = loginForm.querySelector('#username');
            const password = loginForm.querySelector('#password');

            if (username && !username.value.trim()) {
                e.preventDefault();
                showFieldError(username, 'Please enter your username');
                return;
            }

            if (password && !password.value) {
                e.preventDefault();
                showFieldError(password, 'Please enter your password');
                return;
            }
        });
    }

    // Equipment form validation
    const equipmentForm = document.getElementById('equipmentForm');
    if (equipmentForm) {
        equipmentForm.addEventListener('submit', (e) => {
            const name = equipmentForm.querySelector('#name');
            const price = equipmentForm.querySelector('#price');
            const description = equipmentForm.querySelector('#description');

            if (name && !name.value.trim()) {
                e.preventDefault();
                showFieldError(name, 'Equipment name is required');
                return;
            }

            if (price && (isNaN(price.value) || parseFloat(price.value) <= 0)) {
                e.preventDefault();
                showFieldError(price, 'Please enter a valid price');
                return;
            }

            if (description && !description.value.trim()) {
                e.preventDefault();
                showFieldError(description, 'Description is required');
                return;
            }
        });
    }

    // Clear errors on input
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#d93025';
    field.style.background = '#fce8e6';
    const errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.textContent = message;
    errEl.style.cssText = 'color:#d93025;font-size:0.8rem;margin-top:4px;display:block;font-weight:500;';
    field.parentNode.appendChild(errEl);
    field.focus();
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.background = '';
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
}

/* ─── Smooth Scroll ─────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ─── Toggle Add Equipment Form ─────────────────────────── */
function toggleAddForm() {
    const form = document.getElementById('addEquipmentForm');
    const btn = document.getElementById('toggleAddForm');
    if (form) {
        if (form.style.display === 'none') {
            form.style.display = 'block';
            if (btn) btn.textContent = '✕ Cancel';
        } else {
            form.style.display = 'none';
            if (btn) btn.textContent = '➕ Add Your Equipment';
        }
    }
}
