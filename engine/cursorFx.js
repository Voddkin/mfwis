/* ==========================================================================
   MY FAVORITE WOMAN IS SMALL — santni studio
   Sistema de Cursor Personalizado Editorial + Efeitos de Hover, Clique & Brilho
   ========================================================================== */

window.AuroraGame = window.AuroraGame || {};

(function (AG) {
  const CursorFX = {};

  let initialized = false;
  let dotEl = null;
  let ringEl = null;
  let badgeEl = null;
  let burstLayer = null;
  let targetX = -100;
  let targetY = -100;
  let ringX = -100;
  let ringY = -100;
  let rafId = null;
  let lastHoveredEl = null;

  function isEnabled() {
    const st = (AG.state && AG.state.settings) || {};
    return st.customCursor !== false;
  }

  function isClickFxEnabled() {
    const st = (AG.state && AG.state.settings) || {};
    return st.clickFx !== false && st.animatedBg !== false;
  }

  function isFinePointer() {
    if (typeof window === "undefined") return false;
    if (typeof window.matchMedia !== "function") return true;
    try {
      return !window.matchMedia("(pointer: coarse)").matches;
    } catch (e) {
      return true;
    }
  }

  function ensureDom() {
    if (typeof document === "undefined" || !document.body || !document.createElement) return false;
    if (!dotEl) {
      dotEl = document.createElement("div");
      dotEl.id = "aurora-cursor-dot";
      dotEl.setAttribute("aria-hidden", "true");
      document.body.appendChild(dotEl);
    }
    if (!ringEl) {
      ringEl = document.createElement("div");
      ringEl.id = "aurora-cursor-ring";
      ringEl.setAttribute("aria-hidden", "true");
      badgeEl = document.createElement("span");
      badgeEl.id = "aurora-cursor-badge";
      ringEl.appendChild(badgeEl);
      document.body.appendChild(ringEl);
    }
    if (!burstLayer) {
      burstLayer = document.createElement("div");
      burstLayer.id = "aurora-click-fx-layer";
      burstLayer.setAttribute("aria-hidden", "true");
      document.body.appendChild(burstLayer);
    }
    return true;
  }

  function detectCursorMode(el) {
    if (!el || !el.closest) return { mode: "default", clickable: false };
    const hotEl = el.closest(".tone-hot, .is-intimate-cta, .vn-aurora-figure, #menu-hero-png2");
    if (hotEl && !hotEl.disabled) return { mode: "hot", clickable: true, target: hotEl };

    const ctrlEl = el.closest(".tone-ctrl");
    if (ctrlEl && !ctrlEl.disabled) return { mode: "ctrl", clickable: true, target: ctrlEl };

    const riskyEl = el.closest(".tone-risky");
    if (riskyEl && !riskyEl.disabled) return { mode: "risky", clickable: true, target: riskyEl };

    const btnEl = el.closest("button, a, label, select, input[type='range'], [role='button']");
    if (btnEl) {
      if (btnEl.disabled) return { mode: "disabled", clickable: false, target: btnEl };
      return { mode: "hover", clickable: true, target: btnEl };
    }
    return { mode: "default", clickable: false, target: null };
  }

  function applyRingMode(mode) {
    if (!ringEl || !dotEl) return;
    ringEl.setAttribute("data-mode", mode);
    dotEl.setAttribute("data-mode", mode);
    if (badgeEl) {
      badgeEl.textContent = mode === "hot" ? "♥" : mode === "ctrl" ? "✦" : mode === "risky" ? "!" : "";
    }
  }

  CursorFX.spawnClickBurst = function (x, y, mode) {
    if (!isClickFxEnabled() || !ensureDom() || !burstLayer) return;

    const ripple = document.createElement("span");
    ripple.className = `cursor-ripple m-${mode || "default"}`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    burstLayer.appendChild(ripple);
    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 520);

    const symbols = mode === "hot"
      ? ["♥", "✦", "♥", "·", "♥"]
      : mode === "ctrl"
        ? ["✦", "◆", "✦", "·", "✦"]
        : ["✦", "♥", "·", "✦", "·"];

    symbols.forEach((sym, i) => {
      const sp = document.createElement("span");
      sp.className = `cursor-spark m-${mode || "default"}`;
      const angle = (Math.PI * 2 * i) / symbols.length + (Math.random() * 0.5 - 0.25);
      const dist = 20 + Math.random() * 18;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 8;
      sp.textContent = sym;
      sp.style.left = `${x}px`;
      sp.style.top = `${y}px`;
      sp.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      sp.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      burstLayer.appendChild(sp);
      setTimeout(() => {
        if (sp.parentNode) sp.parentNode.removeChild(sp);
      }, 560);
    });
  };

  function tick() {
    if (ringEl && dotEl && isEnabled()) {
      ringX += (targetX - ringX) * 0.24;
      ringY += (targetY - ringY) * 0.24;
      dotEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  CursorFX.sync = function () {
    if (typeof document === "undefined" || !document.body) return;
    const on = isEnabled() && isFinePointer();
    document.body.setAttribute("data-cursor", on ? "custom" : "native");
    if (on) ensureDom();
    if (dotEl) dotEl.style.display = on ? "" : "none";
    if (ringEl) ringEl.style.display = on ? "" : "none";
  };

  CursorFX.init = function () {
    if (initialized || typeof window === "undefined" || !window.addEventListener) return;
    initialized = true;
    CursorFX.sync();

    window.addEventListener("pointermove", (ev) => {
      if (!isEnabled() || !isFinePointer()) return;
      ensureDom();
      targetX = ev.clientX;
      targetY = ev.clientY;
      if (ringX < 0) { ringX = targetX; ringY = targetY; }
      if (dotEl) dotEl.style.opacity = "1";
      if (ringEl) ringEl.style.opacity = "1";

      const info = detectCursorMode(ev.target);
      applyRingMode(info.mode);

      if (info.clickable && info.target && info.target !== lastHoveredEl) {
        lastHoveredEl = info.target;
        if (AG.playSound) AG.playSound("hover");
      } else if (!info.clickable) {
        lastHoveredEl = null;
      }
    });

    window.addEventListener("pointerdown", (ev) => {
      const info = detectCursorMode(ev.target);
      if (ringEl && isEnabled()) ringEl.setAttribute("data-down", "1");
      if (dotEl && isEnabled()) dotEl.setAttribute("data-down", "1");
      CursorFX.spawnClickBurst(ev.clientX, ev.clientY, info.mode);
    });

    window.addEventListener("pointerup", () => {
      if (ringEl) ringEl.setAttribute("data-down", "0");
      if (dotEl) dotEl.setAttribute("data-down", "0");
    });

    window.addEventListener("pointerleave", () => {
      if (dotEl) dotEl.style.opacity = "0";
      if (ringEl) ringEl.style.opacity = "0";
    });

    if (typeof window.requestAnimationFrame === "function") {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  AG.CursorFX = CursorFX;
})(window.AuroraGame);
