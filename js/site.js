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
  var targets = links
    .map(function (a) { return document.getElementById(a.hash.slice(1)); })
    .filter(Boolean);

  if (targets.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var line = window.innerHeight * 0.3;
      var current = null;
      targets.forEach(function (t) {
        if (t.getBoundingClientRect().top <= line) current = t;
      });
      // at the very bottom, the last section is the current one even if short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = targets[targets.length - 1];
      }
      links.forEach(function (a) {
        a.classList.toggle("active", !!current && a.hash === "#" + current.id);
      });
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // ---- 3. Light / dark toggle -------------------------------------------
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    var root = document.documentElement;
    var system = window.matchMedia("(prefers-color-scheme: dark)");
    var isDark = function () {
      var t = root.getAttribute("data-theme");
      return t ? t === "dark" : system.matches;
    };
    var sync = function () {
      var dark = isDark();
      var label = dark ? "Switch to light theme" : "Switch to dark theme";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    };
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    if (system.addEventListener) system.addEventListener("change", sync);
    toggle.hidden = false;
    sync();
  }

  // ---- 4. A random stochastic block model, drawn in the sidebar ---------
  var fig = document.getElementById("network");
  var button = document.getElementById("network-button");
  if (!fig || !button) return;

  var W = 240, H = 132, PAD = 8;

  function draw() {
    // three groups; dense inside a group, sparse between groups
    var sizes = [9, 8, 7].map(function (n) { return n + Math.floor(Math.random() * 3); });
    var pIn = 0.42, pOut = 0.025;
    var nodes = [], edges = [];
    sizes.forEach(function (n, b) {
      var a = (2 * Math.PI * b) / 3 + Math.random();
      for (var i = 0; i < n; i++) {
        nodes.push({
          b: b,
          x: Math.cos(a) + (Math.random() - 0.5),
          y: Math.sin(a) + (Math.random() - 0.5)
        });
      }
    });
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        if (Math.random() < (nodes[i].b === nodes[j].b ? pIn : pOut)) edges.push([i, j]);
      }
    }
    // keep the picture tidy: attach any isolated node to its own group
    nodes.forEach(function (n, i) {
      var touched = edges.some(function (e) { return e[0] === i || e[1] === i; });
      if (touched) return;
      var mates = [];
      nodes.forEach(function (m, j) { if (j !== i && m.b === n.b) mates.push(j); });
      edges.push([i, mates[Math.floor(Math.random() * mates.length)]]);
    });

    // Fruchterman-Reingold layout
    var k = 0.55;
    for (var it = 0; it < 250; it++) {
      var temp = 0.25 * (1 - it / 250);
      var disp = nodes.map(function () { return { x: 0, y: 0 }; });
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          var f = (k * k) / d / d;
          disp[i].x += dx * f; disp[i].y += dy * f;
          disp[j].x -= dx * f; disp[j].y -= dy * f;
        }
      }
      edges.forEach(function (e) {
        var dx = nodes[e[0]].x - nodes[e[1]].x, dy = nodes[e[0]].y - nodes[e[1]].y;
        var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        var f = d / k;
        disp[e[0]].x -= dx * f; disp[e[0]].y -= dy * f;
        disp[e[1]].x += dx * f; disp[e[1]].y += dy * f;
      });
      nodes.forEach(function (n, i) {
        disp[i].x -= n.x * 0.35; disp[i].y -= n.y * 0.35;   // gentle pull to the centre
        var len = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y) || 0.01;
        var step = Math.min(len, temp);
        n.x += (disp[i].x / len) * step;
        n.y += (disp[i].y / len) * step;
      });
    }

    // scale to the box
    var xs = nodes.map(function (n) { return n.x; }), ys = nodes.map(function (n) { return n.y; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    nodes.forEach(function (n) {
      n.x = PAD + ((n.x - x0) / (x1 - x0 || 1)) * (W - 2 * PAD);
      n.y = PAD + ((n.y - y0) / (y1 - y0 || 1)) * (H - 2 * PAD);
    });

    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">';
    edges.forEach(function (e) {
      svg += '<line x1="' + nodes[e[0]].x.toFixed(1) + '" y1="' + nodes[e[0]].y.toFixed(1) +
             '" x2="' + nodes[e[1]].x.toFixed(1) + '" y2="' + nodes[e[1]].y.toFixed(1) + '"/>';
    });
    nodes.forEach(function (n) {
      svg += '<circle class="b' + n.b + '" cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="4"/>';
    });
    button.innerHTML = svg + "</svg>";
  }

  draw();
  fig.hidden = false;
  button.addEventListener("click", draw);
})();
