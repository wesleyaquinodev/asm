const html = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
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

const setMenuState = (isOpen) => {
    if (!menuBtn) return;
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    const icon = menuBtn.querySelector('i');
    if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
};

setMenuState(false);
menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    setMenuState(isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        setMenuState(false);
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.header__inner') && !event.target.closest('#navMenu') && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        setMenuState(false);
    }
});

// Close nav with Escape key when open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        setMenuState(false);
        menuBtn.focus();
    }
});
