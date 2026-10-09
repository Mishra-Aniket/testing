// Web Audio API Synthesizer - Ultra lightweight, zero external audio assets
// Generates silky-smooth acoustic micro-clicks, resonant docks, and harmonic chords

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.hasUnlocked = false;
    this.initializedListeners = false;
    this.lastClickTime = 0;

    if (typeof window !== "undefined") {
      this.isEnabled();
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.setupGlobalListeners());
      } else {
        this.setupGlobalListeners();
      }
    }
  }

  unlockAudio() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().then(() => {
          this.hasUnlocked = true;
        }).catch(() => {});
      } else if (this.ctx) {
        this.hasUnlocked = true;
      }
    } catch (e) {}
  }

  init() {
    this.unlockAudio();
  }

  setupGlobalListeners() {
    if (typeof window === "undefined" || this.initializedListeners) return;
    this.initializedListeners = true;

    // First user gesture anywhere unlocks Web Audio context cleanly
    const unlockHandler = () => {
      this.unlockAudio();
      window.removeEventListener("pointerdown", unlockHandler);
      window.removeEventListener("touchstart", unlockHandler);
      window.removeEventListener("keydown", unlockHandler);
      window.removeEventListener("click", unlockHandler);
    };

    window.addEventListener("pointerdown", unlockHandler, { passive: true, capture: true });
    window.addEventListener("touchstart", unlockHandler, { passive: true, capture: true });
    window.addEventListener("keydown", unlockHandler, { passive: true, capture: true });
    window.addEventListener("click", unlockHandler, { passive: true, capture: true });

    // Global click listener for every interactive element across the entire site
    document.addEventListener("click", (e) => {
      if (!this.enabled) return;

      const target = e.target.closest(
        "button, a, [role='button'], input[type='submit'], input[type='button'], summary, [data-sound], [data-clickable]"
      );

      if (!target) return;

      // Skip elements that explicitly opted out or handle their own custom sound
      if (target.hasAttribute("data-no-sound") || target.hasAttribute("data-custom-sound")) {
        return;
      }

      this.playClick();
    }, { capture: true, passive: true });
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("aniket_sound_enabled", this.enabled ? "true" : "false");
        window.dispatchEvent(new CustomEvent("aniket_sound_change", { detail: this.enabled }));
      } catch (e) {}
    }
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  isEnabled() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("aniket_sound_enabled");
        if (saved !== null) {
          this.enabled = saved === "true";
        }
      } catch (e) {}
    }
    return this.enabled;
  }

  // 1. Crisp tactile micro-click (buttons, tabs, modal triggers, links)
  playClick() {
    if (!this.enabled) return;
    const nowMs = performance.now();
    if (nowMs - this.lastClickTime < 35) return; // Prevent double sounds
    this.lastClickTime = nowMs;

    try {
      this.unlockAudio();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Snap component (crisp transient click)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1600, now);
      osc1.frequency.exponentialRampToValueAtTime(380, now + 0.016);

      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.022);

      // Body component (tactile warm pop)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(280, now);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.028);

      gain2.gain.setValueAtTime(0.15, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.032);
    } catch (e) {}
  }

  // 2. Resonant warm dock sound (Model hot-swap, L01/L02 docking)
  playDock() {
    if (!this.enabled) return;
    try {
      this.unlockAudio();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Note 1 (Warm body)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.07); // E5
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.095);

      // Note 2 (High sparkle chime)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1046.5, now + 0.025); // C6
      gain2.gain.setValueAtTime(0.14, now + 0.025);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.025);
      osc2.stop(now + 0.15);
    } catch (e) {}
  }

  // 3. Success harmonic chord (Query run, Assessment score calculated)
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.unlockAudio();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [659.25, 830.61, 987.77, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);
        gain.gain.setValueAtTime(0.14, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.24);
      });
    } catch (e) {}
  }
}

export const sound = new SoundEngine();
