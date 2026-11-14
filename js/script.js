document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => preloader.classList.add('loaded');
  window.addEventListener('load', () => setTimeout(hidePreloader, 300));
  setTimeout(hidePreloader, 1800);

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    document.querySelector('.back-to-top').classList.toggle('show', window.scrollY > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  /* ---------- Hero video slider ---------- */
  const heroVideos = Array.from(document.querySelectorAll('.hero-video'));
  const heroDots = Array.from(document.querySelectorAll('.hero-dot'));
  let heroIndex = 0;
  let heroTimer;

  function showHero(i) {
    heroVideos.forEach((v, idx) => {
      if (idx === i) {
        v.classList.add('active');
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.classList.remove('active');
        v.pause();
      }
    });
    heroDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    heroIndex = i;
  }

  function nextHero() {
    showHero((heroIndex + 1) % heroVideos.length);
  }

  function restartHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHero, 7000);
  }

  if (heroVideos.length) {
    showHero(0);
    restartHeroTimer();
    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        showHero(parseInt(dot.dataset.i, 10));
        restartHeroTimer();
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el, i) => el.style.setProperty('--d', i % 8));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  /* ---------- Pause repair videos when out of view ---------- */
  const repairVideos = document.querySelectorAll('.repair-video video');
  const vIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) entry.target.pause();
    });
  }, { threshold: 0.1 });
  repairVideos.forEach(v => vIo.observe(v));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
