/* ============================================================
   Ministry of Foreign Affairs — shared site script
   Injects the utility bar, header nav and footer into every page
   (so links stay consistent), then wires up all behaviours.
   A page opts in with <body data-page="home|about|nigeria|policy|
   services|press|missions"> and empty <div id="site-header">/
   <div id="site-footer"> placeholders.
   ============================================================ */
(function () {
  'use strict';

  var EXT = ' target="_blank" rel="noopener noreferrer"';

  /* ---------- Utility bar + header ---------- */
  function headerHTML(page) {
    function cur(p) { return p === page ? ' is-current' : ''; }
    return '' +
    '<div class="utility"><div class="wrap">' +
      '<div class="u-social">' +
        '<a' + EXT + ' href="https://www.facebook.com/NigeriaMFA" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9C15.4 4.8 14.4 4.7 13.5 4.7 11 4.7 9.3 6.2 9.3 9V11H7v3h2.3v8H13z"/></svg></a>' +
        '<a' + EXT + ' href="https://www.instagram.com/nigeriamofa" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4m0 7.6A3 3 0 1 1 12 9a3 3 0 0 1 0 6m5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0M12 4c2.6 0 3 0 4 .1.9 0 1.4.2 1.7.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.8.3 1.7.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.4-.3 1.7-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.8.3-1.7.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.4-.2-1.7-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.1-.3-.3-.8-.3-1.7C4 15 4 14.6 4 12s0-3 .1-4c0-.9.2-1.4.3-1.7.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.8-.3 1.7-.3 1-.1 1.4-.1 4-.1z"/></svg></a>' +
        '<a' + EXT + ' href="https://x.com/NigeriaMFA" aria-label="Twitter / X"><svg viewBox="0 0 24 24"><path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.3 5.6-6.3m-1.2 17.8h1.8L7.1 4.3H5.1l11.9 16z"/></svg></a>' +
        '<a' + EXT + ' href="https://www.youtube.com/@nigeriamofa" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.5 4 12 4 12 4s-4.5 0-7.8.2c-.5.1-1.5.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.2c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8M9.8 15.1V8.9l5.9 3.1z"/></svg></a>' +
      '</div>' +
      '<a class="u-mail" href="mailto:info@foreignaffairs.gov.ng"><svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M2 5h20v14H2V5m2 2v.4l8 5 8-5V7H4m16 2.6-8 5-8-5V17h16V9.6z"/></svg> info@foreignaffairs.gov.ng</a>' +
      '<nav class="u-links" aria-label="Quick links">' +
        '<a href="press.html">Press Releases</a><a href="services.html">Visas &amp; Passports</a><a href="atrium.html">The Atrium</a><a href="travel-advisory.html">Travel Advisories</a>' +
      '</nav>' +
      '<a class="u-portal"' + EXT + ' href="https://portal.foreignaffairs.gov.ng"><svg viewBox="0 0 24 24"><path d="M3 3h7v7H3V3m11 0h7v7h-7V3M3 14h7v7H3v-7m11 0h7v7h-7v-7z"/></svg> Paperless Service Portal</a>' +
    '</div></div>' +

    '<header class="topbar"><div class="wrap"><div class="nav">' +
      '<a class="brand" href="index.html" aria-label="Ministry of Foreign Affairs home"><img class="brand-logo" src="assets/Logo_OnWhite.png" alt="Ministry of Foreign Affairs, Federal Republic of Nigeria" /></a>' +
      '<ul class="menu" id="menu">' +
        '<li class="' + cur('home') + '"><a href="index.html">Home</a></li>' +
        '<li class="has-mega' + cur('about') + '"><a href="about.html" aria-haspopup="true">About Us <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5"/></svg></div>' +
              '<h3 class="mega-title">About Us</h3>' +
              '<p class="mega-desc">The Ministry mandated to conduct Nigeria\'s foreign policy and diplomatic relations.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>Who We Are</span><a href="about.html#mandate">Mandate</a><a href="about.html#mission">Mission</a><a href="about.html#vision">Vision</a><a href="about.html#values">Core Values</a><span class="col-title" style="margin-top:22px"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Our History</span><a href="our-history.html#ministry-history">History of the Ministry</a><a href="our-history.html#foreign-ministers">List of Foreign Ministers</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Organization Chart</span><a href="departments.html">Departments</a><a href="about.html#org">Divisions &amp; Units</a><a href="agencies.html">Agencies &amp; Parastatals</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>Leadership</span><a href="minister.html">Honourable Minister of Foreign Affairs</a><a href="minister-state.html">Minister of State</a><a href="perm-sec.html">Permanent Secretary</a><a href="dept-directors.html">Department Directors</a><a href="perm-missions-reps.html">Permanent Missions Representatives</a></div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('nigeria') + '"><a href="nigeria.html" aria-haspopup="true">Nigeria <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a9 9 0 00-9 9c0 6.5 9 14 9 14s9-7.5 9-14a9 9 0 00-9-9z"/><circle cx="12" cy="11" r="3"/></svg></div>' +
              '<h3 class="mega-title">Nigeria</h3>' +
              '<p class="mega-desc">Discover Nigeria\'s rich history, culture, natural resources and investment opportunities.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>History &amp; Resources</span><a href="nigeria.html#history">History of Nigeria</a><a href="nigeria.html#resources">Natural Resources</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Economy</span><a href="nigeria.html#investment">Investment</a><a href="nigeria.html#people">The People</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>Culture &amp; Tourism</span><a href="nigeria.html#culture">Culture</a><a href="nigeria.html#tourism">Tourism</a><a href="nigeria.html#symbols">National Symbols</a></div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('policy') + '"><a href="policy.html" aria-haspopup="true">Policy <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--2">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="21"/><path d="M5 8h14"/><path d="M5 8l-2 7h4l-2-7z"/><path d="M19 8l-2 7h4l-2-7z"/><line x1="8" y1="21" x2="16" y2="21"/></svg></div>' +
              '<h3 class="mega-title">Policy</h3>' +
              '<p class="mega-desc">Nigeria\'s 4D Foreign Policy Agenda — Diaspora, Democracy, Development and Diplomacy.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>4D Foreign Policy</span><a href="policy.html#intro">Introduction</a><a href="policy.html#fourd">The 4Ds</a><a href="policy.html#activities">Activities</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>More</span><a href="policy.html#objectives">Policy Objectives</a><a href="policy.html#activities">Download 4D Brochure</a></div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('services') + '"><a href="services.html" aria-haspopup="true">Services <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--2">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="12" cy="6" r="2"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="17" x2="15" y2="17"/></svg></div>' +
              '<h3 class="mega-title">Services</h3>' +
              '<p class="mega-desc">Consular, authentication and passport services for Nigerians at home and abroad.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l-2 2-1-1"/></svg>Document Authentication</span><a href="services.html#auth">Birth Certificate</a><a href="services.html#auth">Child Adoption Documents</a><a href="services.html#auth">End User Certificates</a><a href="services.html#auth">Marriage Certificates</a></div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>Visa &amp; Consular</span><a href="services.html#consular">Visas</a><a href="services.html#consular">Consular Services</a></div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('press') + '"><a href="press.html" aria-haspopup="true">Press Center <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--1">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10c0 4.4 3.1 8 7 8s7-3.6 7-8"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg></div>' +
              '<h3 class="mega-title">Press Center</h3>' +
              '<p class="mega-desc">Official news, press releases and public documents from the Ministry.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>Press Releases</span><a href="press.html">Latest News</a><a href="public-documents.html">Public Documents</a><a href="press-releases.html">Press Releases</a></div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="' + cur('missions') + '"><a href="missions.html">Diplomatic Missions</a></li>' +
      '</ul>' +
      '<button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></div></header>' +
    '<div class="nav-backdrop" id="backdrop"></div>';
  }

  /* ---------- Footer (real links) ---------- */
  function footerHTML() {
    function ext(href, label) { return '<a' + EXT + ' href="' + href + '">' + label + '</a>'; }
    return '' +
    '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
      '<div class="foot-col foot-contact"><h4>Contact Us</h4>' +
        '<p>Find our office at the location below; contact us through our official phone number or send us an email.</p>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><a' + EXT + ' href="https://maps.google.com/?q=Tafawa+Balewa+House+Central+Business+District+Abuja">Tafawa Balewa House, Central Business District, Abuja, Nigeria</a></div>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.2 2.3z"/></svg><a href="tel:+2349026655330">+234 902 665 5330</a></div>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M2 5h20v14H2V5m2 2v.4l8 5 8-5V7H4z"/></svg><a href="mailto:info@foreignaffairs.gov.ng">info@foreignaffairs.gov.ng</a></div>' +
      '</div>' +
      '<div class="foot-col"><h4>Parastatals</h4>' +
        ext('https://dtca.gov.ng', 'Directorate of Technical Co-Operation in Africa') +
        ext('https://ipcr.gov.ng', 'Institute for Peace and Conflict Resolution') +
        ext('https://nfsa.gov.ng', 'Nigerian Foreign Service Academy') +
        ext('https://nidcom.gov.ng', 'Nigerians in Diaspora Commission') +
        ext('https://niia.gov.ng', 'Nigerian Institute of International Affairs') +
        ext('https://otac.gov.ng', 'Technical Aid Corps') +
      '</div>' +
      '<div class="foot-col"><h4>External Links</h4>' +
        ext('https://interior.gov.ng', 'Ministry of Interior') +
        ext('https://immigration.gov.ng', 'Nigerian Immigration Service') +
        ext('https://customs.gov.ng', 'Nigerian Customs Service') +
        ext('https://nipc.gov.ng', 'Nigerian Investment Promotion Commission') +
        ext('https://bpe.gov.ng', 'Bureau of Public Enterprise') +
        ext('https://www.minesandsteel.gov.ng', 'Ministry of Mines and Steel Development') +
      '</div>' +
      '<div class="foot-col"><h4>More External Links</h4>' +
        ext('https://www.cbn.gov.ng', 'Central Bank of Nigeria') +
        ext('https://www.cac.gov.ng', 'Corporate Affairs Commission (CAC)') +
        ext('https://www.nuprc.gov.ng', 'Department of Petroleum Resources') +
        ext('https://www.finance.gov.ng', 'Federal Ministry of Finance') +
        ext('https://nepc.gov.ng', 'Nigerian Creative Economy Initiative') +
        '<a href="index.html#missions">Others</a>' +
      '</div>' +
    '</div></div>' +
    '<div class="foot-bottom"><div class="wrap">' +
      '<span>© 2026 Ministry of Foreign Affairs, Federal Republic of Nigeria. All rights reserved.</span>' +
      '<div class="foot-social">' +
        '<a' + EXT + ' href="https://www.facebook.com/NigeriaMFA" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9C15.4 4.8 14.4 4.7 13.5 4.7 11 4.7 9.3 6.2 9.3 9V11H7v3h2.3v8H13z"/></svg></a>' +
        '<a' + EXT + ' href="https://www.instagram.com/nigeriamofa" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4m0 7.6A3 3 0 1 1 12 9a3 3 0 0 1 0 6m5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"/></svg></a>' +
        '<a' + EXT + ' href="https://x.com/NigeriaMFA" aria-label="Twitter / X"><svg viewBox="0 0 24 24"><path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.3 5.6-6.3z"/></svg></a>' +
        '<a' + EXT + ' href="https://www.youtube.com/@nigeriamofa" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.5 4 12 4 12 4s-4.5 0-7.8.2c-.5.1-1.5.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.2c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8M9.8 15.1V8.9l5.9 3.1z"/></svg></a>' +
      '</div>' +
    '</div></div></footer>';
  }

  /* ---------- Inject partials ---------- */
  var page = document.body.getAttribute('data-page') || '';
  var hEl = document.getElementById('site-header');
  var fEl = document.getElementById('site-footer');
  if (hEl) hEl.outerHTML = headerHTML(page);
  if (fEl) fEl.outerHTML = footerHTML();

  /* ---------- Behaviours ---------- */
  var mq = window.matchMedia('(max-width: 880px)');

  var burger = document.getElementById('burger');
  var backdrop = document.getElementById('backdrop');
  function closeNav() { document.body.classList.remove('nav-open'); if (burger) burger.setAttribute('aria-expanded', 'false'); }
  if (burger) burger.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  if (backdrop) backdrop.addEventListener('click', closeNav);

  function openMega(mega) {
    mega.style.display = 'flex';
    mega.style.opacity = '0';
    mega.style.transform = 'translateY(6px)';
    mega.style.transition = 'opacity .22s, transform .22s';
    void mega.offsetHeight;
    mega.style.opacity = '1';
    mega.style.transform = 'translateY(0)';
  }
  function closeMegaEl(mega) {
    mega.style.opacity = '0';
    mega.style.transform = 'translateY(6px)';
    setTimeout(function () { if (mega.style.opacity === '0') mega.style.display = 'none'; }, 230);
  }
  function closeMegas() {
    document.querySelectorAll('.menu .has-mega.mega-open').forEach(function (n) {
      n.classList.remove('mega-open');
      var m = n.querySelector(':scope > .mega');
      if (m) closeMegaEl(m);
    });
  }
  document.querySelectorAll('.menu .has-mega > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var li = link.parentElement, wasOpen = li.classList.contains('mega-open');
      closeMegas();
      if (!wasOpen) {
        li.classList.add('mega-open');
        var m = li.querySelector(':scope > .mega');
        if (m) openMega(m);
      }
    });
  });
  /* Close mega when a link inside it is clicked */
  document.querySelectorAll('.mega a').forEach(function (a) {
    a.addEventListener('click', function () { closeMegas(); });
  });
  /* Close mega on outside click */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu > li.has-mega')) closeMegas();
  });
  document.querySelectorAll('.menu a').forEach(function (a) {
    a.addEventListener('click', function () { if (mq.matches && !a.parentElement.classList.contains('has-mega')) closeNav(); });
  });
  window.addEventListener('resize', function () { if (!mq.matches) closeNav(); });

  /* News tab filter (home + press) */
  var tabs = document.getElementById('tabs');
  if (tabs) {
    var cards = document.querySelectorAll('#newsGrid .card');
    function applyFilter(f) {
      cards.forEach(function (c) { c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none'; });
    }
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab'); if (!btn) return;
      tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('is-active'); });
      btn.classList.add('is-active');
      applyFilter(btn.getAttribute('data-filter'));
    });
    var active = tabs.querySelector('.tab.is-active');
    if (active) applyFilter(active.getAttribute('data-filter'));
  }

  /* Consular slider (home) */
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
      slides[idx].classList.remove('is-active'); dots[idx].classList.remove('is-active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('is-active'); dots[idx].classList.add('is-active');
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }
    document.getElementById('next').addEventListener('click', function () { next(); restart(); });
    document.getElementById('prev').addEventListener('click', function () { go(idx - 1); restart(); });
    restart();
  }

  /* Diplomatic missions directory (search + region filter) */
  var grid = document.getElementById('missions-grid');
  if (grid && window.MISSIONS) {
    var all = window.MISSIONS;
    var search = document.getElementById('mission-search');
    var chips = document.getElementById('mission-filters');
    var typeChips = document.getElementById('mission-type-filters');
    var count = document.getElementById('mission-count');
    var region = 'All', type = 'All', q = '';

    // map a mission type to its CSS modifier suffix (e.g. "High Commission" -> "HighCommission")
    function typeKey(t) { return t.replace(/\s/g, ''); }

    // populate region chip counts + overview stats
    var regions = ['Africa', 'America', 'Asia', 'Europe'];
    function inRegion(r) { return all.filter(function (m) { return m.region === r; }).length; }
    function inType(t) { return all.filter(function (m) { return m.type === t; }).length; }
    document.querySelectorAll('#mission-filters .chip').forEach(function (c) {
      var r = c.getAttribute('data-cat');
      var n = r === 'All' ? all.length : inRegion(r);
      c.innerHTML = '<span class="chip-dot chip-dot--region' + r + '"></span>' +
        r + ' <span class="chip-n">' + n + '</span>';
    });
    document.querySelectorAll('#mission-type-filters .chip').forEach(function (c) {
      var t = c.getAttribute('data-type');
      var n = t === 'All' ? all.length : inType(t);
      c.innerHTML = t + ' <span class="chip-n">' + n + '</span>';
    });

    function render() {
      var items = all.filter(function (m) {
        var okR = region === 'All' || m.region === region;
        var okT = type === 'All' || m.type === type;
        var okQ = !q || (m.name + ' ' + m.address).toLowerCase().indexOf(q) > -1;
        return okR && okT && okQ;
      });
      grid.innerHTML = items.map(function (m) {
        var key = typeKey(m.type);
        return '<article class="mission-card mission-card--region' + m.region + '">' +
          '<img class="mission-flag" src="' + m.flag + '" alt="' + m.name + '" loading="lazy" />' +
          '<div class="mission-body"><h3>' + m.name + '</h3>' +
          '<p class="mission-addr">' + m.address + '</p>' +
          '<p class="mission-hours">' + (m.hours || '') + '</p>' +
          '<span class="mission-cat mission-cat--' + key + '">' + m.type + '</span></div></article>';
      }).join('') || '<p class="mission-empty">No missions match your search.</p>';
      if (count) {
        count.textContent = 'Showing ' + items.length + ' of ' + all.length + ' missions' +
          (region !== 'All' ? ' in ' + region : '') +
          (type !== 'All' ? ' · ' + type : '') +
          (q ? ' matching "' + q + '"' : '');
      }
    }
    if (search) search.addEventListener('input', function () { q = search.value.trim().toLowerCase(); render(); });
    if (chips) chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      chips.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      b.classList.add('is-active'); region = b.getAttribute('data-cat'); render();
    });
    if (typeChips) typeChips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      typeChips.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      b.classList.add('is-active'); type = b.getAttribute('data-type'); render();
    });
    render();
  }

  /* Header shadow on scroll + back-to-top + scrollspy */
  var topbar = document.querySelector('.topbar');
  var toTop = document.createElement('button');
  toTop.className = 'to-top'; toTop.setAttribute('aria-label', 'Back to top'); toTop.innerHTML = '↑';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(toTop);

  var current = document.querySelector('.menu > li.is-current > a');
  if (current) current.setAttribute('aria-current', 'page');

  var main = document.querySelector('section');
  if (main) {
    if (!main.id) main.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link'; skip.href = '#' + main.id; skip.textContent = 'Skip to main content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* Tabbed side-nav: show only the selected panel */
  var tabNav = document.querySelector('.side-nav[data-tabs]');
  if (tabNav) {
    var tabLinks = tabNav.querySelectorAll('a[href^="#"]');
    var panels = document.querySelectorAll('.prose .panel');
    var subpageTop = function () { var s = document.querySelector('.subpage'); return s ? s.offsetTop - 80 : 0; };
    function activate(id, scroll) {
      var found = false;
      panels.forEach(function (p) { var on = p.id === id; p.classList.toggle('is-active', on); if (on) found = true; });
      if (!found) return;
      tabLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
      if (scroll && window.scrollY > subpageTop() + 40) window.scrollTo({ top: subpageTop(), behavior: 'smooth' });
    }
    tabLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var id = a.getAttribute('href').slice(1);
        activate(id, true);
        history.replaceState(null, '', '#' + id);
      });
    });
    // honor a hash arriving from the mega-menu (e.g. about.html#vision)
    var hash = (location.hash || '').slice(1);
    if (hash && document.getElementById(hash) && document.getElementById(hash).classList.contains('panel')) activate(hash, false);
  }

  /* Accordion — JS-measured height so overflow can be released after open */
  document.querySelectorAll('.accordion .acc-head').forEach(function (h) {
    h.addEventListener('click', function () {
      var item  = h.closest('.acc-item');
      var body  = item.querySelector('.acc-body');
      var inner = item.querySelector('.acc-body-inner');
      var open  = item.classList.toggle('is-open');
      h.setAttribute('aria-expanded', String(open));
      if (!body) return;

      if (open) {
        /* Animate to exact content height, then release overflow for scroll */
        var target = inner ? inner.scrollHeight : 400;
        body.style.overflow  = 'hidden';
        body.style.maxHeight = target + 'px';
        setTimeout(function () {
          if (item.classList.contains('is-open')) {
            body.style.overflow  = 'visible';
            body.style.maxHeight = 'none';
          }
        }, 420);
      } else {
        /* Snapshot rendered height → reflow → animate to 0 */
        body.style.overflow  = 'hidden';
        body.style.maxHeight = body.scrollHeight + 'px';
        void body.offsetHeight; /* force reflow to lock in the value */
        body.style.maxHeight  = '0';
      }
    });
  });

  /* 4D pillar tabs (policy) */
  var fourdTabs = document.querySelectorAll('.fourd-tab');
  if (fourdTabs.length) {
    var fourdPanels = document.querySelectorAll('.fourd-panel');
    fourdTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-pillar');
        fourdTabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', String(on));
        });
        fourdPanels.forEach(function (p) {
          p.classList.toggle('is-active', p.getAttribute('data-panel') === key);
        });
      });
    });
  }

  function onScroll() {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 8);
    toTop.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
