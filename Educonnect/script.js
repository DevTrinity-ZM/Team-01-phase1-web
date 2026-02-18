// Smooth scrolling for all navbar links that point to sections
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar .menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slide-in animation for main sections
    const slideSections = document.querySelectorAll('.main-section');

    function revealOnLoad() {
        slideSections.forEach(section => {
            if (section.id === 'home') {
                section.classList.add('visible');
            }
        });
    }

    function initSectionObserver() {
        if (!('IntersectionObserver' in window) || !slideSections.length) {
            slideSections.forEach(section => section.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        slideSections.forEach(section => observer.observe(section));
    }

    revealOnLoad();
    initSectionObserver();

    // Auth tabs switching (login / signup)
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const navLogin = document.getElementById('nav-login');
    const navSignup = document.getElementById('nav-signup');

    function setActiveAuthTab(tabName) {
        authTabs.forEach(tab => {
            const isActive = tab.dataset.authTab === tabName;
            tab.classList.toggle('active', isActive);
        });

        if (loginForm && signupForm) {
            loginForm.classList.toggle('active', tabName === 'login');
            signupForm.classList.toggle('active', tabName === 'signup');
        }
    }

    authTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.dataset.authTab;
            if (tabName) {
                setActiveAuthTab(tabName);
            }
        });
    });

    if (navLogin) {
        navLogin.addEventListener('click', function () {
            setActiveAuthTab('login');
        });
    }

    if (navSignup) {
        navSignup.addEventListener('click', function () {
            setActiveAuthTab('signup');
        });
    }

    // Theme toggle (dark / light) shared by landing + dashboard
    const root = document.documentElement;
    const themeToggles = document.querySelectorAll('.theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('educonnect-theme', theme);
        } catch (e) {
            // ignore storage errors
        }

        themeToggles.forEach(btn => {
            const icon = btn.querySelector('.theme-icon');
            if (!icon) return;
            if (theme === 'light') {
                icon.textContent = '☀️';
            } else {
                icon.textContent = '🌙';
            }
        });
    }

    function initTheme() {
        let saved = null;
        try {
            saved = localStorage.getItem('educonnect-theme');
        } catch (e) {
            saved = null;
        }
        const prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = saved || (prefersDark ? 'dark' : 'light');
        applyTheme(initial);
    }

    initTheme();

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    });
});
