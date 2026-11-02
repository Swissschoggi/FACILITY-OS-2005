/* FACILITY OS 2005 : interactions
   no essential text or data is animated; all content is born legible */
(function () {
  "use strict";

  /* pointer capability hook for CSS hover affordances */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add("has-pointer");
  }

  /* ---------- top chassis bar: retract on scroll down, return on scroll up ---------- */
  var topbar = document.getElementById("topbar");
  var lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      if (Math.abs(y - lastY) > 8) {
        if (y > 480 && y > lastY) topbar.classList.add("is-hidden");
        else topbar.classList.remove("is-hidden");
        lastY = y;
      }
    },
    { passive: true }
  );

  /* ---------- zone LCD: mirrors the band currently in view (per page) ---------- */
  var lcd = document.getElementById("navlcd");
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[data-band]")
  );

  function zoneLabel(section) {
    var band = section.getAttribute("data-band") || "";
    var name = section.querySelector(".rname");
    return ">> " + band + " " + (name ? name.textContent.trim().toUpperCase() : "");
  }

  if (sections.length && lcd) {
    lcd.textContent = zoneLabel(sections[0]);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) lcd.textContent = zoneLabel(e.target);
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- drawers (hypervisor slots, method plates, CV records) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".btn-slot"), function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".slotrow") || btn.closest(".mplate") || btn.closest(".recrow");
      if (!item) return;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- architecture diagram: hover or tap focus ---------- */
  var grid = document.querySelector(".sc-canvas");
  if (grid) {
    var sticky = null;
    var hover = null;

    function apply() {
      var key = hover || sticky || null;
      grid.classList.toggle("focus-mode", !!key);
      Array.prototype.forEach.call(grid.querySelectorAll("[data-device]"), function (n) {
        n.classList.toggle("is-hot", !!key && n.getAttribute("data-device") === key);
      });
      Array.prototype.forEach.call(grid.querySelectorAll("[data-nodes]"), function (l) {
        var nodes = (l.getAttribute("data-nodes") || "").split(",");
        l.classList.toggle("is-hot", !!key && nodes.indexOf(key) !== -1);
      });
    }

    function deviceOf(el) {
      var n = el.closest ? el.closest("[data-device]") : null;
      return n ? n.getAttribute("data-device") : null;
    }

    if (document.body.classList.contains("has-pointer")) {
      grid.addEventListener("mouseover", function (e) {
        hover = deviceOf(e.target);
        apply();
      });
      grid.addEventListener("mouseleave", function () {
        hover = null;
        apply();
      });
    }

    Array.prototype.forEach.call(grid.querySelectorAll("[data-device]"), function (n) {
      n.addEventListener("click", function () {
        var key = n.getAttribute("data-device");
        sticky = sticky === key ? null : key;
        apply();
      });
      n.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          var key = n.getAttribute("data-device");
          sticky = sticky === key ? null : key;
          apply();
        }
      });
      n.addEventListener("focus", function () {
        sticky = n.getAttribute("data-device");
        apply();
      });
      n.addEventListener("blur", function () {
        sticky = null;
        apply();
      });
    });

    apply();
  }
})();
