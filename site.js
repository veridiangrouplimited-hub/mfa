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

  /* ============================================================
     i18n helpers — requires translations.js loaded before site.js
     ============================================================ */
  function getLang() {
    return localStorage.getItem('mfa-lang') || 'en';
  }
  function setLang(lang) {
    localStorage.setItem('mfa-lang', lang);
    document.documentElement.lang = lang;
  }
  function t(key) {
    var lang = getLang();
    var dict = window.I18N && window.I18N[lang];
    if (dict && dict[key] !== undefined) return dict[key];
    /* fallback to English */
    var en = window.I18N && window.I18N['en'];
    return (en && en[key] !== undefined) ? en[key] : key;
  }
  function applyLang() {
    var lang = getLang();
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-html'));
      if (val) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-placeholder'));
      if (val) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-label'));
      if (val) el.setAttribute('aria-label', val);
    });
    /* sync active state on lang buttons */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });
    /* re-render missions count if visible */
    if (typeof window._mfaRenderMissions === 'function') window._mfaRenderMissions();
  }

  /* ---------- Utility bar + header ---------- */
  function headerHTML(page) {
    function cur(p) { return p === page ? ' is-current' : ''; }
    return '' +
    '<div class="utility"><div class="wrap">' +
      '<div class="u-left">' +
        '<span class="u-follow">Follow us</span>' +
        '<div class="u-social">' +
          '<a' + EXT + ' href="https://www.facebook.com/NigeriaMFA" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9C15.4 4.8 14.4 4.7 13.5 4.7 11 4.7 9.3 6.2 9.3 9V11H7v3h2.3v8H13z"/></svg></a>' +
          '<a' + EXT + ' href="https://www.instagram.com/nigeriamofa" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4m0 7.6A3 3 0 1 1 12 9a3 3 0 0 1 0 6m5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0M12 4c2.6 0 3 0 4 .1.9 0 1.4.2 1.7.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.8.3 1.7.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.4-.3 1.7-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.8.3-1.7.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.4-.2-1.7-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.1-.3-.3-.8-.3-1.7C4 15 4 14.6 4 12s0-3 .1-4c0-.9.2-1.4.3-1.7.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.8-.3 1.7-.3 1-.1 1.4-.1 4-.1z"/></svg></a>' +
          '<a' + EXT + ' href="https://x.com/NigeriaMFA" aria-label="Twitter / X"><svg viewBox="0 0 24 24"><path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.3 5.6-6.3m-1.2 17.8h1.8L7.1 4.3H5.1l11.9 16z"/></svg></a>' +
          '<a' + EXT + ' href="https://www.youtube.com/@nigeriamofa" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.5 4 12 4 12 4s-4.5 0-7.8.2c-.5.1-1.5.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.2c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8M9.8 15.1V8.9l5.9 3.1z"/></svg></a>' +
        '</div>' +
      '</div>' +
      '<nav class="u-links" aria-label="Quick links">' +
        '<a href="press.html"><span data-i18n="util.press">Press Releases</span></a>' +
        '<a href="services.html"><span data-i18n="util.visas">Visas &amp; Passports</span></a>' +
        '<a href="atrium.html"><span data-i18n="util.atrium">The Atrium</span></a>' +
        '<a href="travel-advisory.html"><span data-i18n="util.travel">Travel Advisories</span></a>' +
      '</nav>' +
      '<div class="u-right">' +
        '<div class="lang-toggle" aria-label="Language selection">' +
          '<button class="lang-btn" data-lang="en">EN</button>' +
          '<button class="lang-btn" data-lang="fr">FR</button>' +
        '</div>' +
        '<a class="u-portal"' + EXT + ' href="https://portal.foreignaffairs.gov.ng"><svg viewBox="0 0 24 24"><path d="M3 3h7v7H3V3m11 0h7v7h-7V3M3 14h7v7H3v-7m11 0h7v7h-7v-7z"/></svg> <span data-i18n="util.portal">Paperless Service Portal</span></a>' +
      '</div>' +
    '</div></div>' +

    '<header class="topbar"><div class="wrap"><div class="nav">' +
      '<a class="brand" href="index.html" aria-label="Ministry of Foreign Affairs home">' +
        '<img class="brand-logo" src="assets/mfa-logo.png" alt="" />' +
        '<span class="brand-name">' +
          '<span class="brand-line1" data-i18n="brand.line1">Ministry of Foreign Affairs</span>' +
          '<span class="brand-line2" data-i18n="brand.line2">Federal Republic of Nigeria</span>' +
        '</span>' +
      '</a>' +
      '<ul class="menu" id="menu">' +
        '<li class="' + cur('home') + '"><a href="index.html" data-i18n="nav.home">Home</a></li>' +
        '<li class="has-mega' + cur('about') + '"><a href="about.html" aria-haspopup="true"><span data-i18n="nav.about">About Us</span> <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker" data-i18n="mega.explore">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5"/></svg></div>' +
              '<h3 class="mega-title" data-i18n="mega.about.title">About Us</h3>' +
              '<p class="mega-desc" data-i18n="mega.about.desc">The Ministry mandated to conduct Nigeria\'s foreign policy and diplomatic relations.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg><span data-i18n="mega.about.col1">Who We Are</span></span>' +
                '<a href="about.html#mandate" data-i18n="mega.about.mandate">Mandate</a>' +
                '<a href="about.html#mission" data-i18n="mega.about.mission">Mission</a>' +
                '<a href="about.html#vision" data-i18n="mega.about.vision">Vision</a>' +
                '<a href="about.html#values" data-i18n="mega.about.values">Core Values</a>' +
                '<span class="col-title" style="margin-top:22px"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span data-i18n="mega.about.history">Our History</span></span>' +
                '<a href="our-history.html#ministry-history" data-i18n="mega.about.ministry_history">History of the Ministry</a>' +
                '<a href="our-history.html#foreign-ministers" data-i18n="mega.about.ministers_list">List of Foreign Ministers</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg><span data-i18n="mega.about.col2">Organization Chart</span></span>' +
                '<a href="departments.html" data-i18n="mega.about.departments">Departments</a>' +
                '<a href="about.html#org" data-i18n="mega.about.divisions">Divisions &amp; Units</a>' +
                '<a href="agencies.html" data-i18n="mega.about.agencies">Agencies &amp; Parastatals</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg><span data-i18n="mega.about.col3">Leadership</span></span>' +
                '<a href="minister.html" data-i18n="mega.about.minister">Honourable Minister of Foreign Affairs</a>' +
                '<a href="minister-state.html" data-i18n="mega.about.minister_state">Minister of State</a>' +
                '<a href="perm-sec.html" data-i18n="mega.about.perm_sec">Permanent Secretary</a>' +
                '<a href="dept-directors.html" data-i18n="mega.about.directors">Department Directors</a>' +
                '<a href="perm-missions-reps.html" data-i18n="mega.about.perm_reps">Permanent Missions Representatives</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('nigeria') + '"><a href="nigeria.html" aria-haspopup="true"><span data-i18n="nav.nigeria">Nigeria</span> <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker" data-i18n="mega.explore">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a9 9 0 00-9 9c0 6.5 9 14 9 14s9-7.5 9-14a9 9 0 00-9-9z"/><circle cx="12" cy="11" r="3"/></svg></div>' +
              '<h3 class="mega-title" data-i18n="mega.nigeria.title">Nigeria</h3>' +
              '<p class="mega-desc" data-i18n="mega.nigeria.desc">Discover Nigeria\'s rich history, culture, natural resources and investment opportunities.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg><span data-i18n="mega.nigeria.col1">History &amp; Resources</span></span>' +
                '<a href="nigeria.html" data-i18n="mega.nigeria.history">History of Nigeria</a>' +
                '<a href="nigeria-resources.html" data-i18n="mega.nigeria.resources">Natural Resources</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg><span data-i18n="mega.nigeria.col2">Economy</span></span>' +
                '<a href="nigeria-investment.html" data-i18n="mega.nigeria.investment">Investment</a>' +
                '<a href="nigeria-people.html" data-i18n="mega.nigeria.people">The People</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span data-i18n="mega.nigeria.col3">Culture &amp; Tourism</span></span>' +
                '<a href="nigeria-culture.html" data-i18n="mega.nigeria.culture">Culture</a>' +
                '<a href="nigeria-tourism.html" data-i18n="mega.nigeria.tourism">Tourism</a>' +
                '<a href="nigeria-symbols.html" data-i18n="mega.nigeria.symbols">National Symbols</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('policy') + '"><a href="policy.html" aria-haspopup="true"><span data-i18n="nav.policy">Policy</span> <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--2">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker" data-i18n="mega.explore">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="21"/><path d="M5 8h14"/><path d="M5 8l-2 7h4l-2-7z"/><path d="M19 8l-2 7h4l-2-7z"/><line x1="8" y1="21" x2="16" y2="21"/></svg></div>' +
              '<h3 class="mega-title" data-i18n="mega.policy.title">Policy</h3>' +
              '<p class="mega-desc" data-i18n="mega.policy.desc">Nigeria\'s 4D Foreign Policy Agenda — Diaspora, Democracy, Development and Diplomacy.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span data-i18n="mega.policy.col1">4D Foreign Policy</span></span>' +
                '<a href="policy.html#intro" data-i18n="mega.policy.intro">Introduction</a>' +
                '<a href="policy.html#fourd" data-i18n="mega.policy.4ds">The 4Ds</a>' +
                '<a href="policy.html#activities" data-i18n="mega.policy.activities">Activities</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span data-i18n="mega.policy.col2">More</span></span>' +
                '<a href="policy.html#objectives" data-i18n="mega.policy.objectives">Policy Objectives</a>' +
                '<a href="policy.html#activities" data-i18n="mega.policy.brochure">Download 4D Brochure</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('services') + '"><a href="services.html" aria-haspopup="true"><span data-i18n="nav.services">Services</span> <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--2">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker" data-i18n="mega.explore">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="12" cy="6" r="2"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="17" x2="15" y2="17"/></svg></div>' +
              '<h3 class="mega-title" data-i18n="mega.services.title">Services</h3>' +
              '<p class="mega-desc" data-i18n="mega.services.desc">Consular, authentication and passport services for Nigerians at home and abroad.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l-2 2-1-1"/></svg><span data-i18n="mega.services.col1">Document Authentication</span></span>' +
                '<a href="services.html#auth" data-i18n="mega.services.birth">Birth Certificate</a>' +
                '<a href="services.html#auth" data-i18n="mega.services.adoption">Child Adoption Documents</a>' +
                '<a href="services.html#auth" data-i18n="mega.services.euc">End User Certificates</a>' +
                '<a href="services.html#auth" data-i18n="mega.services.marriage">Marriage Certificates</a>' +
              '</div>' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg><span data-i18n="mega.services.col2">Visa &amp; Consular</span></span>' +
                '<a href="services.html#consular" data-i18n="mega.services.visas">Visas</a>' +
                '<a href="services.html#consular" data-i18n="mega.services.consular">Consular Services</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="has-mega' + cur('press') + '"><a href="press.html" aria-haspopup="true"><span data-i18n="nav.press">Press Center</span> <svg class="caret" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></a>' +
        '<div class="mega mega--1">' +
          '<div class="mega-inner">' +
            '<div class="mega-explore">' +
              '<span class="mega-kicker" data-i18n="mega.explore">Explore</span>' +
              '<div class="mega-wm" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10c0 4.4 3.1 8 7 8s7-3.6 7-8"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg></div>' +
              '<h3 class="mega-title" data-i18n="mega.press.title">Press Center</h3>' +
              '<p class="mega-desc" data-i18n="mega.press.desc">Official news, press releases and public documents from the Ministry.</p>' +
            '</div>' +
            '<div class="mega-cols">' +
              '<div class="col"><span class="col-title"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><span data-i18n="mega.press.col1">Press Releases</span></span>' +
                '<a href="press.html" data-i18n="mega.press.latest">Latest News</a>' +
                '<a href="public-documents.html" data-i18n="mega.press.documents">Public Documents</a>' +
                '<a href="press-releases.html" data-i18n="mega.press.releases">Press Releases</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div></li>' +
        '<li class="' + cur('missions') + '"><a href="missions.html" data-i18n="nav.missions">Diplomatic Missions</a></li>' +
      '</ul>' +
      '<button class="search-trigger" id="search-trigger" aria-label="Open search" title="Search (Ctrl+K)"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>' +
      '<button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></div></header>' +
    '<div class="nav-backdrop" id="backdrop"></div>';
  }

  /* ---------- Footer (real links) ---------- */
  function footerHTML() {
    function ext(href, label) { return '<a' + EXT + ' href="' + href + '">' + label + '</a>'; }
    return '' +
    '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
      '<div class="foot-col foot-contact"><h4 data-i18n="footer.contact.title">Contact Us</h4>' +
        '<p data-i18n="footer.contact.body">Find our office at the location below; contact us through our official phone number or send us an email.</p>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><a' + EXT + ' href="https://maps.google.com/?q=Tafawa+Balewa+House+Central+Business+District+Abuja" data-i18n="footer.contact.address">Tafawa Balewa House, Central Business District, Abuja, Nigeria</a></div>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.2 2.3z"/></svg><a href="tel:+2349026655330">+234 902 665 5330</a></div>' +
        '<div class="row"><svg viewBox="0 0 24 24"><path d="M2 5h20v14H2V5m2 2v.4l8 5 8-5V7H4z"/></svg><a href="mailto:info@foreignaffairs.gov.ng">info@foreignaffairs.gov.ng</a></div>' +
      '</div>' +
      '<div class="foot-col"><h4 data-i18n="footer.parastatals">Parastatals</h4>' +
        ext('https://dtca.gov.ng', 'Directorate of Technical Co-Operation in Africa') +
        ext('https://ipcr.gov.ng', 'Institute for Peace and Conflict Resolution') +
        ext('https://nfsa.gov.ng', 'Nigerian Foreign Service Academy') +
        ext('https://nidcom.gov.ng', 'Nigerians in Diaspora Commission') +
        ext('https://niia.gov.ng', 'Nigerian Institute of International Affairs') +
        ext('https://otac.gov.ng', 'Technical Aid Corps') +
      '</div>' +
      '<div class="foot-col"><h4 data-i18n="footer.external">External Links</h4>' +
        ext('https://interior.gov.ng', 'Ministry of Interior') +
        ext('https://immigration.gov.ng', 'Nigerian Immigration Service') +
        ext('https://customs.gov.ng', 'Nigerian Customs Service') +
        ext('https://nipc.gov.ng', 'Nigerian Investment Promotion Commission') +
        ext('https://bpe.gov.ng', 'Bureau of Public Enterprise') +
        ext('https://www.minesandsteel.gov.ng', 'Ministry of Mines and Steel Development') +
      '</div>' +
      '<div class="foot-col"><h4 data-i18n="footer.external2">More External Links</h4>' +
        ext('https://www.cbn.gov.ng', 'Central Bank of Nigeria') +
        ext('https://www.cac.gov.ng', 'Corporate Affairs Commission (CAC)') +
        ext('https://www.nuprc.gov.ng', 'Department of Petroleum Resources') +
        ext('https://www.finance.gov.ng', 'Federal Ministry of Finance') +
        ext('https://nepc.gov.ng', 'Nigerian Creative Economy Initiative') +
        '<a href="index.html#missions">Others</a>' +
      '</div>' +
    '</div></div>' +
    '<div class="foot-bottom"><div class="wrap">' +
      '<span data-i18n="footer.copyright">© 2026 Ministry of Foreign Affairs, Federal Republic of Nigeria. All rights reserved.</span>' +
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

  /* Apply saved language immediately after injection */
  applyLang();

  /* Wire up lang toggle buttons */
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
      applyLang();
    });
  });

  /* ---------- Global search modal ---------- */
  var SEARCH_PAGES = [
    { title: 'Home', url: 'index.html', desc: 'Official homepage — news, missions overview and services' },
    { title: 'About the Ministry', url: 'about.html', desc: 'Mandate, mission, vision and core values' },
    { title: 'Our History', url: 'our-history.html', desc: 'History of the Ministry and list of Foreign Ministers' },
    { title: 'Departments', url: 'departments.html', desc: 'Departments, divisions and organizational structure' },
    { title: 'Agencies & Parastatals', url: 'agencies.html', desc: 'NIIA, NIDCOM, IPCR, NFSA, TAC, DTCA' },
    { title: 'Honourable Minister', url: 'minister.html', desc: 'Minister of Foreign Affairs — biography and profile' },
    { title: 'Minister of State', url: 'minister-state.html', desc: 'Minister of State biography and official duties' },
    { title: 'Permanent Secretary', url: 'perm-sec.html', desc: 'Permanent Secretary profile and responsibilities' },
    { title: 'Department Directors', url: 'dept-directors.html', desc: 'Directors of all Ministry departments' },
    { title: 'Permanent Mission Representatives', url: 'perm-missions-reps.html', desc: 'Heads of permanent international missions' },
    { title: 'Nigeria — History', url: 'nigeria.html', desc: 'History, geography and background of Nigeria' },
    { title: 'Nigeria — Culture', url: 'nigeria-culture.html', desc: 'Cultural diversity, arts, music, Nollywood, cuisine' },
    { title: 'Nigeria — The People', url: 'nigeria-people.html', desc: 'Demographics, ethnic groups, languages and population' },
    { title: 'Nigeria — Investment', url: 'nigeria-investment.html', desc: 'NIPC, CAC, BOI, tax and investment opportunities' },
    { title: 'Nigeria — Natural Resources', url: 'nigeria-resources.html', desc: 'Oil, gas, solid minerals, agriculture' },
    { title: 'Nigeria — Tourism', url: 'nigeria-tourism.html', desc: 'Tourist attractions, national parks, museums, festivals' },
    { title: 'Nigeria — National Symbols', url: 'nigeria-symbols.html', desc: 'National flag, coat of arms, anthem and pledge' },
    { title: 'Foreign Policy (4D Agenda)', url: 'policy.html', desc: 'Diaspora, Democracy, Development, Diplomacy' },
    { title: 'Services — Visas & Passports', url: 'services.html', desc: 'Consular, authentication, passport and visa services' },
    { title: 'Press Center', url: 'press.html', desc: 'Official news, press releases and public documents' },
    { title: 'Diplomatic Missions', url: 'missions.html', desc: 'Embassies, high commissions, consulates worldwide' },
    { title: 'The Atrium', url: 'atrium.html', desc: 'Gallery, exhibitions and ministerial communications' },
    { title: 'Travel Advisories', url: 'travel-advisory.html', desc: 'Travel safety advisories for Nigerian citizens' }
  ];

  document.body.insertAdjacentHTML('beforeend',
    '<div class="search-modal" id="search-modal" role="dialog" aria-modal="true" aria-label="Site search">' +
      '<div class="search-modal__backdrop" id="search-backdrop"></div>' +
      '<div class="search-modal__inner">' +
        '<div class="search-modal__bar">' +
          '<svg class="search-modal__ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<input id="search-q" class="search-modal__input" type="search" data-i18n-placeholder="search.placeholder" placeholder="Search missions, pages, services…" autocomplete="off" />' +
          '<button id="search-close" class="search-modal__close" data-i18n-label="search.close" aria-label="Close search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '</div>' +
        '<p class="search-modal__hint" data-i18n="search.hint">Start typing to search all pages and missions</p>' +
        '<div id="search-results" class="search-modal__results"></div>' +
      '</div>' +
    '</div>'
  );

  /* apply lang again to catch the search modal elements */
  applyLang();

  var searchModal = document.getElementById('search-modal');
  var searchQ     = document.getElementById('search-q');
  var searchRes   = document.getElementById('search-results');
  var sTrigger    = document.getElementById('search-trigger');
  var sClose      = document.getElementById('search-close');
  var sBdrop      = document.getElementById('search-backdrop');

  function openSearch() {
    searchModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    searchQ.value = '';
    searchRes.innerHTML = '';
    setTimeout(function () { searchQ.focus(); }, 50);
  }
  function closeSearch() {
    searchModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (sTrigger) sTrigger.addEventListener('click', openSearch);
  if (sClose)   sClose.addEventListener('click', closeSearch);
  if (sBdrop)   sBdrop.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchModal.classList.contains('is-open')) { closeSearch(); return; }
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
  });

  function doSearch(q) {
    if (!q) { searchRes.innerHTML = ''; return; }
    var out = [];
    SEARCH_PAGES.forEach(function (p) {
      if ((p.title + ' ' + p.desc).toLowerCase().indexOf(q) !== -1) {
        out.push('<a href="' + p.url + '" class="sr-item">' +
          '<span class="sr-type sr-type--page">Page</span>' +
          '<span class="sr-main"><strong class="sr-title">' + p.title + '</strong>' +
          '<span class="sr-desc">' + p.desc + '</span></span>' +
          '</a>');
      }
    });
    if (window.MISSIONS) {
      window.MISSIONS.forEach(function (m) {
        if ((m.name + ' ' + m.region + ' ' + m.type).toLowerCase().indexOf(q) !== -1) {
          out.push('<a href="missions.html" class="sr-item">' +
            '<span class="sr-type sr-type--mission">' + m.type + '</span>' +
            '<span class="sr-main"><strong class="sr-title">' + m.name + '</strong>' +
            '<span class="sr-desc">' + m.region + ' · ' + m.hours + '</span></span>' +
            '</a>');
        }
      });
    }
    searchRes.innerHTML = out.length
      ? out.slice(0, 10).join('')
      : '<p class="sr-empty">' + t('search.empty') + ' "<strong>' + q + '</strong>"</p>';
    searchRes.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeSearch); });
  }

  if (searchQ) searchQ.addEventListener('input', function () { doSearch(searchQ.value.trim().toLowerCase()); });

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
      var shown = 0;
      cards.forEach(function (c) {
        var match = f === 'all' || c.getAttribute('data-cat') === f;
        c.style.display = (match && shown < 3) ? '' : 'none';
        if (match && shown < 3) shown++;
      });
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

    function typeKey(tp) { return tp.replace(/\s/g, ''); }
    function typeI18nKey(tp) {
      var map = { 'All': 'all', 'Embassy': 'embassy', 'High Commission': 'hc', 'Consulate': 'consulate', 'Permanent Mission': 'perm' };
      return 'missions.type.' + (map[tp] || tp.toLowerCase());
    }
    function regionI18nKey(r) {
      var map = { 'All': 'all', 'Africa': 'africa', 'America': 'america', 'Asia': 'asia', 'Europe': 'europe' };
      return 'missions.region.' + (map[r] || r.toLowerCase());
    }

    var regions = ['Africa', 'America', 'Asia', 'Europe'];
    function inRegion(r) { return all.filter(function (m) { return m.region === r; }).length; }
    function inType(tp) { return all.filter(function (m) { return m.type === tp; }).length; }

    function rebuildChips() {
      document.querySelectorAll('#mission-filters .chip').forEach(function (c) {
        var r = c.getAttribute('data-cat');
        var n = r === 'All' ? all.length : inRegion(r);
        c.innerHTML = '<span class="chip-dot chip-dot--region' + r + '"></span>' +
          '<span data-i18n="' + regionI18nKey(r) + '">' + r + '</span>' +
          ' <span class="chip-n">' + n + '</span>';
      });
      document.querySelectorAll('#mission-type-filters .chip').forEach(function (c) {
        var tp = c.getAttribute('data-type');
        var n = tp === 'All' ? all.length : inType(tp);
        c.innerHTML = '<span data-i18n="' + typeI18nKey(tp) + '">' + tp + '</span>' +
          ' <span class="chip-n">' + n + '</span>';
      });
      applyLang();
    }
    rebuildChips();

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
      }).join('') || '<p class="mission-empty">' + t('missions.empty') + '</p>';
      if (count) {
        count.textContent = t('missions.count.showing') + ' ' + items.length + ' ' + t('missions.count.of') + ' ' + all.length + ' ' + t('missions.count.missions') +
          (region !== 'All' ? ' ' + t('missions.count.in') + ' ' + region : '') +
          (type !== 'All' ? ' · ' + type : '') +
          (q ? ' ' + t('missions.count.matching') + ' "' + q + '"' : '');
      }
    }
    /* expose so applyLang() can refresh the count string */
    window._mfaRenderMissions = render;

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

    /* Map view toggle */
    var mapDiv = document.getElementById('missions-map');
    var vList  = document.getElementById('view-list');
    var vMap   = document.getElementById('view-map');
    var lMap = null, lLayers = null;
    var RCOLS  = { Africa: '#b8923f', America: '#c0392b', Asia: '#117a8b', Europe: '#34495e' };

    if (mapDiv && vList && vMap) {
      function buildMap() {
        if (lMap || !window.L) return;
        lMap = window.L.map('missions-map', { scrollWheelZoom: false }).setView([15, 20], 2);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18
        }).addTo(lMap);
        lLayers = window.L.layerGroup().addTo(lMap);
        all.forEach(function (m) {
          var c = window.getMissionCoords && window.getMissionCoords(m.name);
          if (!c) return;
          window.L.circleMarker(c, {
            radius: 7, fillColor: RCOLS[m.region] || '#007a4f',
            color: '#fff', weight: 1.5, opacity: 1, fillOpacity: 0.85
          }).bindPopup(
            '<strong style="font-size:.9rem">' + m.name + '</strong><br>' +
            '<em style="color:#666;font-size:.78rem">' + m.type + ' · ' + m.region + '</em><br>' +
            '<small style="color:#999">' + m.address + '</small>',
            { maxWidth: 260 }
          ).addTo(lLayers);
        });
      }

      vList.addEventListener('click', function () {
        grid.style.display = '';
        mapDiv.style.display = 'none';
        vList.classList.add('is-active');
        vList.setAttribute('aria-pressed', 'true');
        vMap.classList.remove('is-active');
        vMap.setAttribute('aria-pressed', 'false');
      });
      vMap.addEventListener('click', function () {
        grid.style.display = 'none';
        mapDiv.style.display = '';
        vList.classList.remove('is-active');
        vList.setAttribute('aria-pressed', 'false');
        vMap.classList.add('is-active');
        vMap.setAttribute('aria-pressed', 'true');
        buildMap();
        setTimeout(function () { if (lMap) lMap.invalidateSize(); }, 80);
      });
    }
  }

  /* Header shadow on scroll + back-to-top + scrollspy */
  var topbar = document.querySelector('.topbar');
  var toTop = document.createElement('button');
  toTop.className = 'to-top'; toTop.setAttribute('aria-label', 'Back to top'); toTop.innerHTML = '&#8593;';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(toTop);

  var current = document.querySelector('.menu > li.is-current > a');
  if (current) current.setAttribute('aria-current', 'page');

  var main = document.querySelector('section');
  if (main) {
    if (!main.id) main.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link'; skip.href = '#' + main.id;
    skip.setAttribute('data-i18n', 'skip.link');
    skip.textContent = 'Skip to main content';
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
        body.style.overflow  = 'hidden';
        body.style.maxHeight = body.scrollHeight + 'px';
        void body.offsetHeight;
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
        fourdTabs.forEach(function (tt) {
          var on = tt === tab;
          tt.classList.toggle('is-active', on);
          tt.setAttribute('aria-selected', String(on));
        });
        fourdPanels.forEach(function (p) {
          p.classList.toggle('is-active', p.getAttribute('data-panel') === key);
        });
      });
    });
  }

  /* PDF preview modal — injected on pages with [data-pdf] links */
  var pdfLinks = document.querySelectorAll('[data-pdf]');
  if (pdfLinks.length) {
    var pdfModal = document.createElement('div');
    pdfModal.className = 'pdf-modal';
    pdfModal.setAttribute('role', 'dialog');
    pdfModal.setAttribute('aria-modal', 'true');
    pdfModal.setAttribute('aria-labelledby', 'pdfModalTitle');
    pdfModal.innerHTML =
      '<div class="pdf-modal__backdrop"></div>' +
      '<div class="pdf-modal__panel">' +
        '<div class="pdf-modal__header">' +
          '<h3 class="pdf-modal__title" id="pdfModalTitle"></h3>' +
          '<div class="pdf-modal__actions">' +
            '<a class="btn btn--sm" id="pdfDownloadBtn" href="#" download>' +
              'Download <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>' +
            '</a>' +
            '<button class="pdf-modal__close" id="pdfModalClose" aria-label="Close">' +
              '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="pdf-modal__body"><iframe id="pdfFrame" title="Document preview"></iframe></div>' +
      '</div>';
    document.body.appendChild(pdfModal);

    var pdfFrame   = document.getElementById('pdfFrame');
    var pdfTitleEl = document.getElementById('pdfModalTitle');
    var pdfDlBtn   = document.getElementById('pdfDownloadBtn');

    function openPdf(src, title) {
      pdfFrame.src = src;
      pdfTitleEl.textContent = title;
      pdfDlBtn.href = src;
      pdfModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closePdf() {
      pdfModal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () { pdfFrame.src = ''; }, 250);
    }

    pdfModal.querySelector('.pdf-modal__backdrop').addEventListener('click', closePdf);
    document.getElementById('pdfModalClose').addEventListener('click', closePdf);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pdfModal.classList.contains('is-open')) closePdf();
    });

    pdfLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var card  = link.closest('.card, .doc-row');
        var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Document Preview';
        openPdf(link.dataset.pdf, title);
      });
    });
  }

  /* YouTube façade — swap thumbnail for iframe on click */
  document.querySelectorAll('.yt-facade').forEach(function (el) {
    el.addEventListener('click', function () {
      var id = el.dataset.vid;
      el.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }, { once: true });
  });

  function onScroll() {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 8);
    toTop.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* PWA — register service worker */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
