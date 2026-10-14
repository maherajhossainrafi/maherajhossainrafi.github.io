// Marks the nav link of the section currently in view (aria-current). Purely a highlight, no animation.
const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      map.get(e.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach((s) => io.observe(s));
}
