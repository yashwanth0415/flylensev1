(function() {
    'use strict';
    console.log('[header-include.js] Loading...');

    const currentPage = (() => {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    })();
    console.log('[header-include.js] Current page:', currentPage);

    const headerCSS = `<style>
        /* ── FLOATING SOCIAL ── */
        .floating-social {
            position: fixed;
            bottom: 30px;
            z-index: 9998;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
        .floating-social-left { left: 24px; }
        .floating-social-right { right: 24px; }
        .floating-social a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            color: #fff;
            font-size: 1.4rem;
            text-decoration: none;
            transition: all var(--transition-bounce);
            box-shadow: var(--shadow-card);
            position: relative;
        }
        .floating-social a:hover {
            transform: scale(1.12) translateY(-4px);
            box-shadow: var(--shadow-accent-strong);
        }
        .floating-social a .tooltip {
            position: absolute;
            background: var(--bg-elevated);
            color: #fff;
            padding: 6px 14px;
            border-radius: var(--radius-sm);
            font-size: 0.7rem;
            font-weight: 500;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all var(--transition-fast);
            border: 1px solid var(--border-light);
        }
        .floating-social a:hover .tooltip { opacity: 1; }
        .floating-social-left a .tooltip { left: 70px; top: 50%; transform: translateY(-50%); }
        .floating-social-right a .tooltip { right: 70px; top: 50%; transform: translateY(-50%); }
        .social-instagram { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%); }
        .social-whatsapp { background: #25D366; }
        .social-instagram::after, .social-whatsapp::after {
            content: ''; position: absolute; inset: -4px; border-radius: 50%;
            animation: pulse-ring 2.5s ease-out infinite; opacity: 0;
        }
        .social-instagram::after { border: 2px solid #fd5949; }
        .social-whatsapp::after { border: 2px solid #25D366; }
        @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 576px) {
            .floating-social a { width: 48px; height: 48px; font-size: 1.1rem; }
            .floating-social { gap: 10px; }
            .floating-social-left { left: 16px; }
            .floating-social-right { right: 16px; }
            .floating-social a .tooltip { display: none; }
        }

        /* ── NAVBAR ── */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            height: var(--nav-height);
            background: transparent;
            backdrop-filter: none;
            border-bottom: 1px solid transparent;
            transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s, box-shadow 0.4s, height 0.4s;
            will-change: background, backdrop-filter, box-shadow, border-color, height;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s, box-shadow 0.4s, height 0.4s;
        }
        .navbar.loaded {
            opacity: 1;
            transform: translateY(0);
        }
        .navbar.scrolled {
            height: 88px;
            background: rgba(5, 5, 5, 0.98);
            backdrop-filter: blur(24px);
            border-bottom: 1px solid var(--border-subtle);
            box-shadow: var(--shadow-soft);
        }
        .navbar-container {
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 0 var(--container-padding);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .nav-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1001;
            flex-shrink: 0;
            transition: transform var(--transition-bounce);
        }
        .nav-logo:hover {
            transform: scale(1.04);
        }
        .nav-logo img {
            height: 40px;
            width: auto;
            object-fit: contain;
        }
        .nav-logo img.logo-title {
            height: 48px;
        }
        .navbar.scrolled .nav-logo img {
            filter: brightness(1) invert(0);
        }
        .nav-links {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .nav-links a {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.88rem;
            font-weight: 500;
            padding: 0.55rem 1.2rem;
            border-radius: var(--radius-full);
            transition: all 0.3s ease;
            position: relative;
            white-space: nowrap;
            letter-spacing: 0.01em;
        }
        .navbar.scrolled .nav-links a {
            color: rgba(255, 255, 255, 0.85);
        }
        .nav-links a::before {
            content: '';
            position: absolute;
            bottom: 8px;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--accent-gradient);
            border-radius: 2px;
            transform: translateX(-50%);
            transition: width var(--transition-smooth);
        }
        .nav-links a:hover::before,
        .nav-links a.active::before {
            width: 60%;
        }
        .nav-links a:hover {
            color: #fff;
        }
        .nav-links a.active {
            color: #fff;
            font-weight: 600;
        }
        .nav-links li.dropdown {
            position: relative;
        }
        .nav-links .dropdown-toggle {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0.55rem 1.2rem;
            border-radius: var(--radius-full);
            transition: all 0.3s ease;
        }
        .nav-links .dropdown-toggle::after {
            content: '\\f107';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 0.7rem;
            transition: transform var(--transition-fast);
        }
        .nav-links li.dropdown:hover .dropdown-toggle::after {
            transform: rotate(180deg);
        }
        .nav-links .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 220px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-elevated);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all var(--transition-smooth);
            z-index: 1001;
            padding: 0.5rem 0;
            margin-top: 0;
            background: var(--bg-card);
            border: 1px solid var(--border-light);
        }
        .nav-links li.dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .nav-links .dropdown-menu a {
            display: block;
            padding: 0.7rem 1.5rem;
            color: var(--text-secondary);
            font-size: 0.88rem;
            font-weight: 500;
            border-radius: 0;
            white-space: nowrap;
        }
        .nav-links .dropdown-menu a:hover {
            background: rgba(6, 102, 204, 0.08);
            color: #fff;
            padding-left: 1.8rem;
        }
        .nav-cta {
            background: var(--accent-gradient);
            color: #030508 !important;
            font-weight: 600;
            padding: 0.6rem 1.5rem;
            border-radius: var(--radius-full);
            box-shadow: var(--shadow-accent);
            transition: all var(--transition-bounce);
        }
        .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-accent-strong);
        }

        /* ── HAMBURGER ── */
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            z-index: 1001;
            padding: 10px 12px;
            border-radius: var(--radius-sm);
            transition: transform var(--transition-bounce), background var(--transition-fast);
            background: rgba(5, 5, 5, 0.5);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }
        .hamburger:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        .hamburger:active {
            transform: scale(0.95);
        }
        .hamburger span {
            display: block;
            width: 26px;
            height: 2.5px;
            background: #fff;
            border-radius: 2px;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: center;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            width: 28px;
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
            transform: translateX(-12px) scale(0.5);
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
            width: 28px;
        }

        .menu-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 998;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.4s;
            backdrop-filter: blur(4px);
        }
        .menu-backdrop.active {
            opacity: 1;
            visibility: visible;
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 360px;
            max-width: 90%;
            height: 100vh;
            background: var(--bg-deep);
            z-index: 999;
            padding: 100px 2.5rem 2rem;
            transition: right 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            overflow-y: auto;
            box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
            border-left: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .mobile-menu.active {
            right: 0;
        }
        .mobile-menu a {
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 500;
            padding: 1rem 1.2rem;
            border-radius: var(--radius-md);
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            border-left: 3px solid transparent;
        }
        .mobile-menu a:hover {
            color: var(--accent);
            background: rgba(6, 102, 204, 0.08);
            border-left-color: var(--accent);
            transform: translateX(6px);
        }
        .mobile-menu a.active {
            color: var(--accent);
            font-weight: 600;
            background: rgba(6, 102, 204, 0.1);
            border-left-color: var(--accent);
        }
        .mobile-dropdown {
            margin: 0.5rem 0;
        }
        .mobile-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 1rem 1.2rem;
            background: transparent;
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 500;
            border-radius: var(--radius-md);
            border-left: 3px solid transparent;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            text-align: left;
        }
        .mobile-dropdown-toggle:hover {
            color: var(--accent);
            background: rgba(6, 102, 204, 0.08);
            border-left-color: var(--accent);
            transform: translateX(6px);
        }
        .mobile-dropdown-menu {
            display: none;
            padding: 0.5rem 0 0.5rem 2.5rem;
        }
        .mobile-dropdown.active .mobile-dropdown-menu {
            display: block;
        }
        .mobile-dropdown-menu a {
            display: block;
            padding: 0.6rem 1rem;
            color: var(--text-muted);
            font-size: 0.95rem;
            font-weight: 500;
            transition: all var(--transition-fast);
        }
        .mobile-dropdown-menu a:hover {
            color: var(--accent);
            padding-left: 1.5rem;
        }
        .mobile-dropdown-toggle i {
            transition: transform 0.3s;
        }
        .mobile-dropdown-toggle.active i {
            transform: rotate(180deg);
        }
        .menu-divider {
            width: 50px;
            height: 2px;
            background: var(--accent-gradient);
            border-radius: 2px;
            margin: 0.5rem 0 1.5rem;
            transition: width var(--transition-smooth);
        }
        .mobile-menu.active .menu-divider {
            width: 80px;
        }
        .menu-footer {
            display: none;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            :root {
                --nav-height: 64px;
            }
            .nav-links {
                display: none;
            }
            .hamburger {
                display: flex !important;
            }
            .navbar.scrolled {
                height: 72px;
            }
        }
    </style>`;

    const headerHTML = headerCSS + `<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <a href="index.html" class="nav-logo">
            <img src="img/logo.png" alt="FlyLense Logo" class="logo-icon">
            <img src="img/title.png" alt="FlyLense" class="logo-title">
        </a>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.html" data-page="index">Home</a></li>
            <li><a href="about.html" data-page="about">About</a></li>
            <li class="dropdown">
                <a href="portfolio.html" class="dropdown-toggle" data-page="portfolio">Portfolio</a>
                <div class="dropdown-menu">
                    <a href="education.html" data-page="education">Education</a>
                    <a href="jewellery.html" data-page="jewellery">Jewellery</a>
                    <a href="food.html" data-page="food">Food & Restaurants</a>
                </div>
            </li>
            <li><a href="industry.html" data-page="industry">Industries</a></li>
            <li><a href="blogs.html" data-page="blogs">Blogs</a></li>
            <li><a href="contact.html" data-page="contact">Let's Connect</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>

<!-- Menu Backdrop -->
<div class="menu-backdrop" id="menuBackdrop"></div>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu">
    <a href="index.html" data-page="index">Home</a>
    <a href="about.html" data-page="about">About</a>
    <div class="mobile-dropdown">
        <button class="mobile-dropdown-toggle">Portfolio <i class="fa-solid fa-chevron-down"></i></button>
        <div class="mobile-dropdown-menu">
            <a href="education.html" data-page="education">Education</a>
            <a href="jewellery.html" data-page="jewellery">Jewellery</a>
            <a href="food.html" data-page="food">Food & Restaurants</a>
        </div>
    </div>
    <a href="industry.html" data-page="industry">Industries</a>
    <a href="blogs.html" data-page="blogs">Blogs</a>
    <a href="contact.html" class="mobile-cta" data-page="contact">Let's Connect</a>
    <div class="menu-divider"></div>
    <div class="menu-footer">
        <span>&copy; 2026 FlyLense Media Partner</span>
        <span>Crafting Cinematic Stories</span>
    </div>
</div>`;

    function loadHeader() {
        console.log('[header-include] loadHeader called');
        const placeholder = document.getElementById('header-placeholder');
        console.log('[header-include] placeholder:', placeholder);
        if (placeholder) {
            placeholder.innerHTML = headerHTML;
        } else {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }
        console.log('[header-include] Header injected, initializing navbar');
        initNavbar();
        setActiveLinks();
    }

    function setActiveLinks() {
        const navLinks = document.querySelectorAll('#navLinks a[data-page]');
        const mobileLinks = document.querySelectorAll('#mobileMenu a[data-page]');
        const dropdownToggle = document.querySelector('.dropdown-toggle[data-page]');
        const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });

        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });

        const dropdownPages = ['education', 'jewellery', 'food'];
        if (dropdownPages.includes(currentPage) && dropdownToggle) {
            dropdownToggle.classList.add('active');
        }

        if (dropdownPages.includes(currentPage) && mobileDropdownToggle) {
            mobileDropdownToggle.classList.add('active');
        }
    }

    function initNavbar() {
        console.log('[header-include] initNavbar called');
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBackdrop = document.getElementById('menuBackdrop');
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        console.log('[header-include] Elements found:', { navbar: !!navbar, hamburger: !!hamburger, mobileMenu: !!mobileMenu, menuBackdrop: !!menuBackdrop });

        if (navbar) {
            console.log('[header-include] Navbar found, attaching scroll handler');
            setTimeout(() => navbar.classList.add('loaded'), 100);
            
            const scrollThreshold = 50;

            function handleScroll() {
                const currentScroll = window.pageYOffset;
                console.log('[header-include] Scroll:', currentScroll);
                
                if (currentScroll > scrollThreshold) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                // Removed: navbar.style.transform = 'translateY(-100%)' on scroll down
            }

            window.addEventListener('scroll', handleScroll, { passive: true });
            // Initial check
            handleScroll();
        }

        if (hamburger && mobileMenu && menuBackdrop) {
            function toggleMenu() {
                const isOpen = mobileMenu.classList.toggle('active');
                menuBackdrop.classList.toggle('active', isOpen);
                hamburger.classList.toggle('active', isOpen);
                hamburger.setAttribute('aria-expanded', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }

            hamburger.addEventListener('click', toggleMenu);
            menuBackdrop.addEventListener('click', toggleMenu);
            mobileMenu.querySelectorAll('a:not(.mobile-dropdown-menu a)').forEach(a => a.addEventListener('click', toggleMenu));

            mobileDropdownToggles.forEach(btn => {
                btn.addEventListener('click', () => {
                    const dropdown = btn.closest('.mobile-dropdown');
                    dropdown.classList.toggle('active');
                });
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                const isOpen = mobileMenu.classList.contains('active');
                mobileMenu.classList.remove('active');
                menuBackdrop.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        const navLinks = document.querySelectorAll('#navLinks a[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('dropdown-toggle')) return;
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            // CSS :hover handles dropdown display, no JS needed
        }

        // ── REVEAL OBSERVER (for .reveal animations) ──
        window.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Observe all .reveal elements after header loads
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();