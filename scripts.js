"use strict";

document.documentElement.classList.add("js");

/* ========================================
   NAVIGATION — keyboard, touch, and anchor navigation
======================================== */
(() => {
  const toggle = document.querySelector(".navtoggle");
  const menu = document.querySelector("#primary-nav");
  if (!toggle || !menu) return;
  const desktop = window.matchMedia("(min-width: 1440px)");
  function closeMenu(returnFocus = false) {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    closeMenu();
    const heading = document.querySelector(`${link.hash} h1, ${link.hash} h2`);
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-nav")) closeMenu();
  });
  document.addEventListener("focusin", (event) => {
    if (!event.target.closest(".site-nav")) closeMenu();
  });
  desktop.addEventListener("change", () => closeMenu());
  if ("IntersectionObserver" in window) {
    const links = [...menu.querySelectorAll("a")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((link) => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section")
      .forEach((section) => observer.observe(section));
  }
})();

/* ========================================
   HERO CAROUSEL
   Edit SLIDE_DELAY to change automatic progression (milliseconds).
   Slides and pagination are read from HTML; no count to maintain here.
======================================== */
(() => {
  const hero = document.querySelector("#home");
  if (!hero) return;
  const slides = [...hero.querySelectorAll(".hero-slide")];
  const controls = hero.querySelector(".carousel-controls");
  if (slides.length < 2) return;
  const SLIDE_DELAY = 8000;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dots = hero.querySelector(".carousel-dots");
  const pause = hero.querySelector(".carousel-pause");
  const status = hero.querySelector(".carousel-status");
  let current = 0;
  let paused = motion.matches;
  let hovering = false;
  let visible = true;
  let timer;
  const buttons = slides.map((slide, index) => {
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute(
      "aria-label",
      `Show slide ${index + 1}: ${slide.dataset.caption || "Kendu photography"}`,
    );
    button.addEventListener("click", () => show(index, true));
    dots.append(button);
    return button;
  });
  function schedule() {
    clearTimeout(timer);
    pause.textContent = paused ? "Play" : "Pause";
    pause.setAttribute(
      "aria-label",
      paused ? "Play slideshow" : "Pause slideshow",
    );
    if (
      !paused &&
      !hovering &&
      visible &&
      !document.hidden &&
      (!hero.contains(document.activeElement) ||
        document.activeElement === pause)
    ) {
      timer = setTimeout(() => show(current + 1), SLIDE_DELAY);
    }
  }
  function show(index, manual = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle("is-active", i === current);
      buttons[i].setAttribute("aria-current", String(i === current));
    });
    hero.querySelector(".hero-caption").textContent =
      slides[current].dataset.caption || "";
    if (manual) {
      paused = true;
      status.textContent = `Slide ${current + 1} of ${slides.length}. ${slides[current].querySelector("img").alt}`;
    }
    // Prepare the next photograph before it becomes visible.
    const nextImage =
      slides[(current + 1) % slides.length].querySelector("img");
    if (nextImage) nextImage.loading = "eager";
    schedule();
  }
  hero
    .querySelector(".carousel-prev")
    .addEventListener("click", () => show(current - 1, true));
  hero
    .querySelector(".carousel-next")
    .addEventListener("click", () => show(current + 1, true));
  pause.addEventListener("click", () => {
    paused = !paused;
    // Explicit Play takes effect immediately, including for touch/keyboard users.
    if (!paused) hovering = false;
    schedule();
  });
  hero.addEventListener("mouseenter", () => {
    hovering = true;
    schedule();
  });
  hero.addEventListener("mouseleave", () => {
    hovering = false;
    schedule();
  });
  hero.addEventListener("focusin", (event) => {
    if (event.target !== pause) paused = true;
    schedule();
  });
  hero.addEventListener("focusout", () => setTimeout(schedule, 0));
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", () => {
    if (motion.matches) paused = true;
    schedule();
  });
  // Only horizontal gestures on the photograph change slides; scrolling is never blocked.
  let start;
  const photos = hero.querySelector(".hero-slides");
  photos.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        start = null;
        return;
      }
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    },
    { passive: true },
  );
  photos.addEventListener(
    "touchend",
    (event) => {
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start.x;
      const dy = event.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
        show(current + (dx < 0 ? 1 : -1), true);
      start = null;
    },
    { passive: true },
  );
  photos.addEventListener(
    "touchcancel",
    () => {
      start = null;
    },
    { passive: true },
  );
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      schedule();
    }).observe(hero);
  }
  controls.hidden = false;
  show(0);
})();

/* ========================================
   NETLIFY FORMS / THANK-YOU
   Native POST remains the fallback when JavaScript is unavailable.
   Only a successful HTTP response opens the dialog; failures keep input.
======================================== */
(() => {
  const dialog = document.querySelector("#thanks-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;
  let submittingForm;
  let previousHash = "";
  function openThanks() {
    previousHash = location.hash === "#thank-you" ? "" : location.hash;
    dialog.showModal();
    history.replaceState(null, "", "#thank-you");
  }
  dialog
    .querySelector("#thanks-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target.closest('a[href^="#"]')) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (location.hash === "#thank-you")
      history.replaceState(
        null,
        "",
        location.pathname + location.search + previousHash,
      );
    submittingForm
      ?.querySelector('button[type="submit"]')
      .focus({ preventScroll: true });
  });
  document.querySelectorAll(".netlify-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector(".form-status");
      if (button.disabled) return;
      button.disabled = true;
      form.setAttribute("aria-busy", "true");
      status.textContent = "Sending…";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(new FormData(form)).toString(),
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Submission failed (${response.status})`);
        form.reset();
        status.textContent = "";
        submittingForm = form;
        openThanks();
      } catch (error) {
        status.textContent =
          error.name === "AbortError"
            ? "The request timed out. Your entry is still here. Please check your connection before trying again."
            : "We couldn’t send your message. Your entry is still here. Please try again, or email info@kendu-unleashed.com.";
      } finally {
        clearTimeout(timeout);
        button.disabled = false;
        form.removeAttribute("aria-busy");
      }
    });
  });
  if (location.hash === "#thank-you") openThanks();
})();

const year = document.querySelector("#copyright-year");
if (year) year.textContent = new Date().getFullYear();
