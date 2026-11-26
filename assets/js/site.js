/* Small, dependency-free behaviours. Written in plain ES5 so it runs in every Safari. */
(function () {
  var doc = document.documentElement;
  doc.className += ' js';

  function each(list, fn) { for (var i = 0; i < list.length; i++) { fn(list[i], i); } }

  /* 1. Figure tabs: several figures share one slot. */
  each(document.querySelectorAll('.figtabs'), function (box) {
    var tabs = box.querySelectorAll('.figtab');
    var panels = box.querySelectorAll('.figpanel');
    each(tabs, function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-tab');
        each(tabs, function (t) {
          var on = t === tab;
          t.className = 'figtab' + (on ? ' is-on' : '');
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        each(panels, function (p) {
          p.className = 'figpanel' + (p.getAttribute('data-panel') === key ? ' is-on' : '');
        });
      });
    });
  });

  /* 2. Open the right tab when a link points to a figure (#fig-f1-1a). */
  function openFromHash() {
    var id = window.location.hash.slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var panel = target.parentNode;
    if (panel && panel.className.indexOf('figpanel') > -1) {
      var key = panel.getAttribute('data-panel');
      var box = panel.parentNode;
      var tab = box.querySelector('.figtab[data-tab="' + key + '"]');
      if (tab) tab.click();
    }
    var fold = target;
    while (fold && fold.tagName !== 'DETAILS' && fold !== document.body) { fold = fold.parentNode; }
    if (fold && fold.tagName === 'DETAILS') fold.open = true;
    target.scrollIntoView();
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* 3. Highlight the current sub-section in the sticky bar. */
  var links = document.querySelectorAll('.toc a[data-spy]');
  if (links.length) {
    var sections = [];
    each(links, function (a) {
      var s = document.getElementById(a.getAttribute('data-spy'));
      if (s) sections.push({ el: s, link: a });
    });
    var ticking = false;
    function spy() {
      ticking = false;
      var y = window.pageYOffset + 140;
      var current = null;
      each(sections, function (s) {
        var top = s.el.getBoundingClientRect().top + window.pageYOffset;
        if (top <= y) current = s;
      });
      each(sections, function (s) {
        var on = s === current;
        var base = s.link.className.replace(/\s*is-on/g, '');
        s.link.className = on ? base + ' is-on' : base;
      });
    }
    /* on the home page, open the current part in the table of contents */
    var spyChapters = function () {
      var on = document.querySelector('.toc a.is-on');
      each(document.querySelectorAll('.toc-chap'), function (li) {
        var open = on && li.contains(on);
        li.className = 'toc-chap' + (open ? ' is-open' : '');
        var head = li.querySelector('.toc-chap-link');
        if (head && open && head.className.indexOf('is-on') < 0) head.className += ' is-on';
      });
    };
    var spyAll = function () { spy(); spyChapters(); };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(spyAll); }
    });
    spyAll();
  }

  /* 4b. Market strip arrow. */
  each(document.querySelectorAll('.mk-arrow'), function (btn) {
    btn.addEventListener('click', function () {
      var strip = btn.parentNode.querySelector('.markets-scroll');
      var end = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
      strip.scrollLeft = end ? 0 : strip.scrollLeft + strip.clientWidth * 0.8;
    });
  });

  /* 5. Rotating fictional ads. */
  var start = Math.floor(Math.random() * 1000);
  each(document.querySelectorAll('.ad-rotor'), function (box, k) {
    var ads = box.querySelectorAll('.ad');
    if (!ads.length) return;
    var i = (start + k * 5) % ads.length; /* two rotors on one page never show the same ad */
    function show() { each(ads, function (a, k) { a.className = a.className.replace(' on', '') + (k === i ? ' on' : ''); }); }
    show();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) setInterval(function () { i = (i + 1) % ads.length; show(); }, 8000);
  });

  /* 6. Gallery filter. */
  var filters = document.querySelectorAll('.board-filter button');
  each(filters, function (b) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-filter');
      each(filters, function (o) { o.className = o === b ? 'is-on' : ''; });
      each(document.querySelectorAll('.cards .card'), function (c) {
        var show = key === 'all' || (' ' + c.getAttribute('data-tags') + ' ').indexOf(' ' + key + ' ') > -1;
        c.style.display = show ? '' : 'none';
      });
    });
  });

  /* 7. Formulas (methods page only loads KaTeX). */
  window.addEventListener('load', function () {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false
      });
    }
  });
})();
