(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  if (saved === 'dark') root.dataset.theme = 'dark';
  const header = document.querySelector('.site-header');
  if (header) {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    const sync = () => {
      const dark = root.dataset.theme === 'dark';
      button.innerHTML = dark
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M11 1h2v4h-2zM11 19h2v4h-2zM1 11h4v2H1zM19 11h4v2h-4zM4 3l3 3-1 1-3-3zM17 17l3 3-1 1-3-3zM3 20l3-3 1 1-3 3zM17 6l3-3 1 1-3 3z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 15.1A9 9 0 0 1 8.9 3.4 9 9 0 1 0 20.6 15.1Z"/></svg>';
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('aria-pressed', String(dark));
    };
    sync();
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch {}
      sync();
    });
    header.append(button);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.hero h1,.lead,.hero-actions,.profile-card,.projects-heading>*,.project-copy,.project-media,.about>h2,.intro-text,.about-grid article,.stat,.section-heading,.timeline-item,.skill-group,.contact-copy>*,.contact-links,.project-detail-hero>*,.project-detail-content article,.project-gallery figure').forEach(el => observer.observe(el));
    const nav = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.site-nav a').forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main>section[id]').forEach(el => nav.observe(el));
  }
})();
