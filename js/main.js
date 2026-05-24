/**
 * JapanSauna LP - main.js
 * - Intersection Observer: セクションフェードイン
 * - ヘッダースクロール / ハンバーガーメニュー
 * - FAQアコーディオン（SP）
 */

(function () {
  "use strict";

  /* ---------- Intersection Observer: セクション表示アニメーション ---------- */
  const fadeSections = document.querySelectorAll(".section-fade");

  if (fadeSections.length && "IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.1,
      }
    );

    fadeSections.forEach(function (section) {
      fadeObserver.observe(section);
    });
  } else {
    fadeSections.forEach(function (section) {
      section.classList.add("is-visible");
    });


  }
 
  /* ---------- ヘッダー: スクロール時の背景 ---------- */
  const header = document.getElementById("header");

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- ハンバーガーメニュー ---------- */
  const hamburger = document.getElementById("hamburger");
  const siteNav = document.getElementById("site-nav");

  if (hamburger && siteNav) {
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("is-active");
      siteNav.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", isOpen);
      hamburger.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
      );
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("is-active");
        siteNav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- FAQアコーディオン（SP向け・768px以下で有効） ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-item__q");
    const toggle = item.querySelector(".faq-item__toggle");

    if (!question) return;

    function handleToggle() {
      if (!isMobile()) return;

      const isOpen = item.classList.toggle("is-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", isOpen);
        toggle.textContent = isOpen ? "−" : "+";
      }
    }

    question.addEventListener("click", handleToggle);
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        handleToggle();
      });
    }
  });

  /* リサイズ時: PC幅ではアコーディオン状態をリセット */
  window.addEventListener("resize", function () {
    if (!isMobile()) {
      faqItems.forEach(function (item) {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".faq-item__toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "+";
        }
      });
    }
  });
})();


 /* パララックス */

const parallaxBg = document.querySelector('.point-intro__bg');

window.addEventListener('scroll', () => {
  const section = document.querySelector('.point-intro');
  const rect = section.getBoundingClientRect();

  const speed = 0.15;
  const y = rect.top * speed;

  parallaxBg.style.transform = `translateY(${y}px)`;
});

