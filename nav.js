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

  /* ---- News tab filter (home only) ---- */
  var tabs = document.getElementById('tabs');
  if (tabs) {
    var cards = document.querySelectorAll('#newsGrid .card');
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function (c) {
        c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
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
})();
