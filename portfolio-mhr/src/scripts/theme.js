// Theme toggle. The OS preference is the default; a manual choice is remembered in localStorage.
const root = document.documentElement;
const dark = window.matchMedia('(prefers-color-scheme: dark)');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const current = () => root.dataset.theme || (dark.matches ? 'dark' : 'light');

function label(btn) {
  btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  label(btn);
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    // Short crossfade: colour transitions are enabled only for the moment of the switch.
    if (!reduce.matches) {
      root.classList.add('theme-fade');
      window.setTimeout(() => root.classList.remove('theme-fade'), 320);
    }
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    label(btn);
  });
});
dark.addEventListener('change', () => document.querySelectorAll('[data-theme-toggle]').forEach(label));
