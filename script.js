document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeBtn = document.getElementById('modeBtn');

    const applyTheme = (darkMode) => {
        body.classList.toggle('dark', darkMode);
        if (modeBtn) {
            modeBtn.textContent = darkMode ? '☀️' : '🌙';
        }
        localStorage.setItem('sau-theme', darkMode ? 'dark' : 'light');
    };

    const savedTheme = localStorage.getItem('sau-theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    }

    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            applyTheme(!body.classList.contains('dark'));
        });
    }

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const scrollThreshold = 32;
        const getScrollPosition = () => Math.max(
            window.scrollY || 0,
            document.documentElement.scrollTop || 0,
            document.body.scrollTop || 0
        );
        let hasScrolled = getScrollPosition() > scrollThreshold;
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'sidebar-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'site-navigation');
        toggle.innerHTML = '<span aria-hidden="true">☰</span><span>Menu</span>';
        sidebar.id = 'site-navigation';

        const logo = sidebar.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentElement('afterend', toggle);
        } else {
            sidebar.insertBefore(toggle, sidebar.firstChild);
        }

        const closeMenu = () => {
            sidebar.classList.remove('is-open');
            sidebar.classList.toggle(
                'is-compact',
                window.matchMedia('(max-width: 980px)').matches && hasScrolled
            );
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<span aria-hidden="true">☰</span><span>Menu</span>';
        };

        const updateCompactState = () => {
            const isResponsiveNav = window.matchMedia('(max-width: 980px)').matches;
            if (getScrollPosition() > scrollThreshold) {
                hasScrolled = true;
            }

            if (!isResponsiveNav) {
                closeMenu();
                sidebar.classList.remove('is-compact');
                return;
            }

            sidebar.classList.toggle('is-compact', hasScrolled || sidebar.classList.contains('is-open'));
        };

        toggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.innerHTML = isOpen
                ? '<span aria-hidden="true">×</span><span>Close</span>'
                : '<span aria-hidden="true">☰</span><span>Menu</span>';
            updateCompactState();
        });

        sidebar.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        const handleScroll = () => {
            if (getScrollPosition() > scrollThreshold && sidebar.classList.contains('is-open')) {
                closeMenu();
            }
            updateCompactState();
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        window.addEventListener('resize', updateCompactState);
        updateCompactState();
    }
});
