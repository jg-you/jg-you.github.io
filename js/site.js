// Small progressive enhancements. The page is complete without this file.
(function () {
  "use strict";

  // ---- 1. Publication filter -------------------------------------------
  var box = document.getElementById("filter");
  var input = document.getElementById("pub-filter");
  var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub"));

  function fold(s) {
    // lower-case and strip accents, so "hebert" finds "Hébert"
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  if (box && input && pubs.length) {
    var status = document.getElementById("filter-status");
    var noMatch = document.getElementById("no-match");
    var haystack = pubs.map(function (li) { return fold(li.textContent); });
    box.hidden = false;

    input.addEventListener("input", function () {
      var terms = fold(input.value).split(/\s+/).filter(Boolean);
      var shown = 0;
      pubs.forEach(function (li, i) {
        var ok = terms.every(function (t) { return haystack[i].indexOf(t) !== -1; });
        li.hidden = !ok;
        if (ok) shown += 1;
      });
      // hide year groups and whole sections that have nothing left in them
      document.querySelectorAll(".year-group, .pub-section").forEach(function (el) {
        el.hidden = !el.querySelector(".pub:not([hidden])");
      });
      noMatch.hidden = shown !== 0;
      status.textContent = terms.length ? shown + " of " + pubs.length + " shown" : "";
    });
  }

  // ---- 2. Highlight the current section in the nav ----------------------
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var spy = { index: -1, onChange: null };   // which nav entry is in view; -1 above them all
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
  var targets = links
    .map(function (a) { return document.getElementById(a.hash.slice(1)); })
    .filter(Boolean);

  if (targets.length) {
    var ticking = false;
    var pinned = null, restY = null, restTimer = 0;   // a section chosen from the nav

    var update = function () {
      ticking = false;
      var vh = window.innerHeight, y = window.scrollY;
      var max = Math.max(document.documentElement.scrollHeight - vh, 0);
      // The reading line sits 30% down the window. Over the last stretch of the
      // page it slides to the bottom edge, so that short closing sections each
      // get their turn however tall the window is.
      var run = Math.min(vh, max);
      var p = run ? Math.min(Math.max((y - (max - run)) / run, 0), 1) : 1;
      var line = vh * (0.3 + 0.7 * p);
      var current = null;
      targets.forEach(function (t) {
        if (!t.hidden && t.getBoundingClientRect().top <= line) current = t;
      });
      if (pinned && !pinned.hidden) current = pinned;
      var index = -1;
      links.forEach(function (a, i) {
        var on = !!current && a.hash === "#" + current.id;
        a.classList.toggle("active", on);
        if (on) index = i;
      });
      if (index !== spy.index) {
        spy.index = index;
        if (spy.onChange) spy.onChange(index);
      }
    };
    var request = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };

    // A section picked from the nav stays the current one, even when the page
    // cannot scroll far enough to bring it to the top, until the reader scrolls.
    var arm = function () {
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(function () { restY = window.scrollY; }, 200);
    };
    var pin = function (hash) {
      var t = hash.length > 1 && document.getElementById(hash.slice(1));
      if (!t || targets.indexOf(t) === -1) return;
      pinned = t;
      restY = null;
      arm();
      request();
    };
    spy.unpin = function () {
      if (!pinned) return;
      pinned = null;
      window.clearTimeout(restTimer);
      request();
    };

    window.addEventListener("scroll", function () {
      if (pinned) {
        if (restY === null) arm();                               // still gliding to the section
        else if (Math.abs(window.scrollY - restY) > 8) pinned = null;
      }
      request();
    }, { passive: true });
    ["wheel", "touchmove", "keydown"].forEach(function (type) {
      window.addEventListener(type, spy.unpin, { passive: true });
    });
    window.addEventListener("resize", request);
    links.forEach(function (a) {
      a.addEventListener("click", function () { pin(a.hash); });
    });
    window.addEventListener("hashchange", function () { pin(location.hash); });
    window.addEventListener("load", function () {
      // arriving on /#contact: keep it only if the browser really landed there
      var t = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
      var top = t ? t.getBoundingClientRect().top : -1;
      if (top >= 0 && top < window.innerHeight) pin(location.hash);
    });
    update();
  }

  // ---- 3. On the home page, the name and portrait scroll back to the top --
  if (document.querySelector(".intro")) {
    document.querySelectorAll(".site-name a, a.portrait").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
        e.preventDefault();
        if (spy.unpin) spy.unpin();
        window.scrollTo({ top: 0, behavior: still.matches ? "auto" : "smooth" });
        if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      });
    });
  }

  // ---- 4. The sidebar city ----------------------------------------------
  // A random stochastic block model drawn as a city: one block of towers per
  // nav entry. The block for the section being read stands taller, and
  // clicking a block goes to its section. Every page load builds a different
  // city.
  var fig = document.getElementById("network");
  var box = document.getElementById("city");
  if (!fig || !box) return;

  var T = 14, HW = 9.5;                       // tile half-width, tower half-width
  // resting heights at the very back and the very front (the city stands
  // higher towards the back, so every block shows), and the lift when in focus
  var BACK = [22, 42], FRONT = [7, 18], LIFT = [16, 26], SPIRE = 9;
  var city = null, frame = 0, clock = 0;

  function f1(v) { return v.toFixed(1); }
  function pts(a) { return a.map(f1).join(" "); }
  function rand(r) { return r[0] + Math.random() * (r[1] - r[0]); }
  function iso(x, y) { return [(x - y) * T, (x + y) * T / 2]; }

  function build() {
    var n = links.length || 5, cols = Math.ceil(n / 2), spots = [];
    // Where the blocks stand, in nav order. Five make a cross, read like the
    // five on a die; any other number makes two rows, walked in a loop, with a
    // shorter front row centred on the back one.
    if (n === 5) spots = [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]];
    else for (var k = 0; k < n; k++) spots.push(k < cols ? [k, 0] : [n - 1 - k + (2 * cols - n) / 2, 1]);
    var depths = spots.map(function (q) { return q[0] + q[1]; });
    var near = Math.max.apply(null, depths), far = Math.min.apply(null, depths);

    var towers = [], plates = "";
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (var b = 0; b < n; b++) {
      var col = spots[b][0], row = spots[b][1];
      var gx = col * 3, gy = row * 3, e = 0.66, tint = (Math.floor(col) + 2 * row) % 3;
      var back = near > far ? (near - col - row) / (near - far) : 1;       // 1 at the back, 0 in front
      var rest = [FRONT[0] + (BACK[0] - FRONT[0]) * back, FRONT[1] + (BACK[1] - FRONT[1]) * back];
      x0 = Math.min(x0, iso(gx - e, gy + 1 + e)[0]);
      x1 = Math.max(x1, iso(gx + 1 + e, gy - e)[0]);
      y0 = Math.min(y0, iso(gx, gy)[1] - rest[1]);
      y1 = Math.max(y1, iso(gx + 1 + e, gy + 1 + e)[1]);
      plates += '<polygon class="plate c' + tint + '" data-b="' + b + '" points="' + pts([].concat(
        iso(gx - e, gy - e), iso(gx + 1 + e, gy - e), iso(gx + 1 + e, gy + 1 + e), iso(gx - e, gy + 1 + e))) + '"/>';
      var cells = [[0, 0], [1, 0], [0, 1], [1, 1]];
      for (var i = cells.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), tmp = cells[i];
        cells[i] = cells[j]; cells[j] = tmp;
      }
      cells.slice(0, Math.random() < 0.55 ? 4 : 3).forEach(function (c) {
        var p = iso(gx + c[0], gy + c[1]);
        towers.push({ b: b, c: tint, sx: p[0], sy: p[1], depth: gx + c[0] + gy + c[1],
                      rest: rand(rest), lift: rand(LIFT), spire: Math.random() < 0.3, h: 0, v: 0, wait: 0 });
      });
    }
    towers.sort(function (p, q) { return p.depth - q.depth; });          // back to front

    // frame the plates, with headroom for the tallest possible tower
    y0 -= LIFT[1] + SPIRE + HW / 2 + 2;
    x0 -= 2; x1 += 2; y1 += 2;
    var out = '<svg viewBox="' + pts([x0, y0, x1 - x0, y1 - y0]) + '" preserveAspectRatio="xMidYMax meet" ' +
              'aria-hidden="true" focusable="false"><defs><pattern id="net-hatch" width="3.5" height="3.5" ' +
              'patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3.5"/>' +
              "</pattern></defs>" + plates;
    towers.forEach(function (t) {
      out += '<g class="tower c' + t.c + '" data-b="' + t.b + '"><polygon class="face"/><polygon class="face shade"/>' +
             '<polygon class="face"/><polygon class="face roof"/>' + (t.spire ? '<path class="ink"/>' : "") + "</g>";
    });
    box.innerHTML = out + "</svg>";

    var svg = box.firstChild;
    var groups = svg.querySelectorAll(".tower");
    towers.forEach(function (t, k) {
      t.g = groups[k];
      t.parts = t.g.children;
      t.wait = k * 0.045;                                               // the city goes up back to front
    });
    return { svg: svg, towers: towers, plates: svg.querySelectorAll(".plate"), focus: -1, hover: -1 };
  }

  function paint() {
    city.towers.forEach(function (t) {
      var x = t.sx, y = t.sy, h = t.h, d = HW / 2;
      var left = pts([x - HW, y, x, y + d, x, y + d - h, x - HW, y - h]);
      t.parts[0].setAttribute("points", left);
      t.parts[1].setAttribute("points", left);
      t.parts[2].setAttribute("points", pts([x + HW, y, x, y + d, x, y + d - h, x + HW, y - h]));
      t.parts[3].setAttribute("points", pts([x - HW, y - h, x, y - h - d, x + HW, y - h, x, y - h + d]));
      if (t.spire) t.parts[4].setAttribute("d", "M" + f1(x) + "," + f1(y - h) + "v-" + SPIRE);
    });
  }

  // full height for the section being read, a small lift under the pointer
  function goal(t) {
    return t.rest + (t.b === city.focus ? t.lift : t.b === city.hover ? t.lift * 0.35 : 0);
  }

  // each tower is a slightly springy mass pulled towards its height
  function tick(now) {
    var dt = Math.min((now - clock) / 1000, 0.032), moving = false;
    clock = now;
    city.towers.forEach(function (t) {
      if (t.wait > 0) { t.wait -= dt; moving = true; return; }
      var gap = goal(t) - t.h;
      t.v += (95 * gap - 13 * t.v) * dt;
      t.h = Math.max(0, t.h + t.v * dt);
      if (Math.abs(gap) > 0.05 || Math.abs(t.v) > 0.5) moving = true;
      else { t.h = goal(t); t.v = 0; }
    });
    paint();
    frame = moving ? window.requestAnimationFrame(tick) : 0;
  }

  function settle() {
    if (still.matches) {
      city.towers.forEach(function (t) { t.h = goal(t); t.v = 0; t.wait = 0; });
      paint();
    } else if (!frame) {
      clock = performance.now();
      frame = window.requestAnimationFrame(tick);
    }
  }

  function focus(index) {
    city.focus = index;
    city.svg.classList.toggle("has-focus", index >= 0);
    city.towers.forEach(function (t) {
      var on = t.b === index;
      if (on !== t.g.classList.contains("on")) t.wait = Math.max(t.wait, Math.random() * 0.12);
      t.g.classList.toggle("on", on);
    });
    Array.prototype.forEach.call(city.plates, function (p, b) { p.classList.toggle("on", b === index); });
    settle();
  }

  function blockAt(e) {
    var el = e.target.closest ? e.target.closest("[data-b]") : null;
    return el ? +el.getAttribute("data-b") : -1;
  }

  city = build();
  paint();
  focus(spy.index);
  fig.hidden = false;
  spy.onChange = focus;

  // a block is a way into its section: it does what its nav entry does
  box.addEventListener("click", function (e) {
    var b = blockAt(e);
    if (b >= 0 && links[b]) links[b].click();
  });
  box.addEventListener("mouseover", function (e) {
    var b = blockAt(e);
    if (b !== city.hover) { city.hover = b; settle(); }
  });
  box.addEventListener("mouseleave", function () {
    if (city.hover !== -1) { city.hover = -1; settle(); }
  });
})();
