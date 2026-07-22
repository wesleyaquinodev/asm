const html = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navCloseBtn = document.getElementById('navCloseBtn');
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

const storedTheme = localStorage.getItem('asmTheme');
const activeTheme = storedTheme || 'light';

const setTheme = (theme) => {
    if (theme === 'dark') {
        html.classList.add('dark-theme');
        body.classList.add('dark-theme');
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        html.classList.remove('dark-theme');
        body.classList.remove('dark-theme');
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    localStorage.setItem('asmTheme', theme);
};

setTheme(activeTheme);

const toggleTheme = () => {
    const isDark = html.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
};

themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

menuBtn.setAttribute('aria-expanded', 'false');
menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
});

if (navCloseBtn) {
    navCloseBtn.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.header__inner') && !event.target.closest('#navMenu') && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Close nav with Escape key when open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
    }
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitButton = document.getElementById('submitButton');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!formStatus || !submitButton) return;

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar');
            }

            contactForm.reset();
            const firstInput = contactForm.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
            formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formStatus.classList.add('form-status--success');
        } catch (error) {
            formStatus.textContent = 'Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.';
            formStatus.classList.add('form-status--error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar solicitação';
        }
    });
}
