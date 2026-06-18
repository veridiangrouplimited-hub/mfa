/* ============================================================
   Ministry of Foreign Affairs — shared behaviours
   Mobile nav + mega accordion run on every page; the news filter
   and slider are guarded so inner pages without them don't error.
   ============================================================ */
(function () {
  'use strict';

  var mq = window.matchMedia('(max-width: 880px)');

  /* ---- Mobile hamburger ---- */
  var burger = document.getElementById('burger');
  var backdrop = document.getElementById('backdrop');
  function closeNav() {
    document.body.classList.remove('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);

  /* ---- Mega-menu accordion on mobile (tap parent to expand) ---- */
  document.querySelectorAll('.menu .has-mega > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (mq.matches) {
        e.preventDefault();
        var li = link.parentElement;
        var wasOpen = li.classList.contains('open');
        document.querySelectorAll('.menu .has-mega.open').forEach(function (n) { n.classList.remove('open'); });
        if (!wasOpen) li.classList.add('open');
      }
    });
  });
  // close the drawer when a leaf link is tapped
  document.querySelectorAll('.menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mq.matches && !a.parentElement.classList.contains('has-mega')) closeNav();
    });
  });
  window.addEventListener('resize', function () { if (!mq.matches) closeNav(); });

  /* ---- News tab filter (HMFA / HMOS / MFA — home + press) ---- */
  var tabs = document.getElementById('tabs');
  if (tabs) {
    var cards = document.querySelectorAll('#newsGrid .card');
    function applyFilter(f) {
      cards.forEach(function (c) {
        c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    }
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('is-active'); });
      btn.classList.add('is-active');
      applyFilter(btn.getAttribute('data-filter'));
    });
    // show only the active tab's category on load
    var active = tabs.querySelector('.tab.is-active');
    if (active) applyFilter(active.getAttribute('data-filter'));
  }

  /* ---- Consular services slider (home only) ---- */
  var slider = document.getElementById('slider');
  if (slider) {
    var slides = slider.querySelectorAll('.slide');
    var dotsWrap = document.getElementById('dots');
    var idx = 0, timer;
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' is-active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll('.dot');
    function go(n) {
      slides[idx].classList.remove('is-active');
      dots[idx].classList.remove('is-active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      dots[idx].classList.add('is-active');
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }
    document.getElementById('next').addEventListener('click', function () { next(); restart(); });
    document.getElementById('prev').addEventListener('click', function () { go(idx - 1); restart(); });
    restart();
  }

  /* ---- Header shadow once the page is scrolled ---- */
  var topbar = document.querySelector('.topbar');
  function onScroll() {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 8);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 400);
    spy();
  }

  /* ---- Back-to-top button (injected so every page gets it) ---- */
  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '↑';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(toTop);

  /* ---- Mark the current top-level nav item for assistive tech ---- */
  var current = document.querySelector('.menu > li.is-current > a');
  if (current) current.setAttribute('aria-current', 'page');

  /* ---- Skip-to-content link (injected as the first focusable element) ---- */
  var main = document.querySelector('section');
  if (main) {
    if (!main.id) main.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + main.id;
    skip.textContent = 'Skip to main content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* ---- Scrollspy for the About page side rail ---- */
  var sideLinks = Array.prototype.slice.call(document.querySelectorAll('.side-nav a[href^="#"]'));
  var spyTargets = sideLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);
  function spy() {
    if (!spyTargets.length) return;
    var pos = window.scrollY + 140;
    var activeId = spyTargets[0].id;
    spyTargets.forEach(function (t) { if (t.offsetTop <= pos) activeId = t.id; });
    sideLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + activeId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
