const {dom} = require('../util');
const event = require('../core/event');
const resource = require('../core/resource');

const KEY = 'h5ai_theme';
const tpl =
    `<div id="theme" class="tool" role="button" tabindex="0" title="Toggle theme" aria-pressed="false">
        <img src="${resource.image('theme')}" alt="theme"/>
    </div>`;

const setTheme = theme => {
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
    document.body.setAttribute('data-theme', theme);
    const el = document.getElementById('theme');
    if (el) {
        el.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        if (theme === 'dark') el.classList.add('active'); else el.classList.remove('active');
    }
    // notify listeners that theme has been applied
    try { event.pub('theme.changed', theme); } catch { /* ignore */ }
};

const toggleTheme = () => {
    const current = document.body.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
};

const init = () => {
    const stored = (() => {
        try { return localStorage.getItem(KEY); } catch { return null; }
    })();

    const prefersDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const initial = stored || (prefersDark ? 'dark' : 'light');
    const $theme = dom(tpl).appTo('#toolbar');
    $theme.on('click', toggleTheme);
    $theme.on('keydown', e => {
        const key = e.key || e.keyCode;
        if (key === 'Enter' || key === ' ' || key === 13 || key === 32) {
            e.preventDefault();
            toggleTheme();
        }
    });
    // Apply theme after the theme button exists, so its active class is set correctly
    setTheme(initial);
};

init();
