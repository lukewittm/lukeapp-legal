// Save the Date — Lukas & Celine
// Gate/PIN keypad + door animation, language toggle, RSVP dialog.
// Recreated from the Claude Design handoff (design_handoff_save_the_date).

const CORRECT_PIN = "0708";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meeyegwj";
const YOUTUBE_VIDEO_ID = "Sw1Jog7TY4o";
const MAX_GUESTS = 6;

let currentLang = "de";
let pin = "";
let guestCount = 1;
let attendingChoice = null;

function applyTranslations() {
  const strings = copy[currentLang];
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) el.textContent = strings[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (strings[key] !== undefined) el.setAttribute("aria-label", strings[key]);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.dataset.i18nTitle;
    if (strings[key] !== undefined) el.title = strings[key];
  });

  document.getElementById("guest-1").placeholder = strings.guestNamePrimary;
  document.querySelectorAll(".guest-input:not(#guest-1)").forEach((input) => {
    input.placeholder = strings.guestNameExtra;
  });

  const langToggle = document.getElementById("lang-toggle");
  langToggle.textContent = currentLang === "de" ? "EN" : "DE";
  langToggle.setAttribute(
    "aria-label",
    currentLang === "de" ? "Switch to English" : "Auf Deutsch wechseln"
  );
}

function setLanguage(lang) {
  currentLang = lang;
  applyTranslations();
}

/* ---------- Gate / PIN keypad ---------- */

function renderPinDots() {
  document.querySelectorAll(".pin-dot").forEach((dot, i) => {
    dot.classList.toggle("filled", i < pin.length);
  });
}

function openGate() {
  const shell = document.getElementById("gate-shell");
  shell.classList.add("open");
  document.getElementById("reset-gate").hidden = false;
  sessionStorage.setItem("std-pin-verified", "true");
}

function closeGate() {
  const shell = document.getElementById("gate-shell");
  shell.classList.remove("open");
  document.getElementById("reset-gate").hidden = true;
  pin = "";
  renderPinDots();
  sessionStorage.removeItem("std-pin-verified");
}

function pressDigit(digit) {
  const shell = document.getElementById("gate-shell");
  if (shell.classList.contains("open")) return;

  pin = (pin + digit).slice(0, 4);
  renderPinDots();

  if (pin.length === 4) {
    if (pin === CORRECT_PIN) {
      setTimeout(openGate, 160);
    } else {
      shell.classList.add("shake");
      setTimeout(() => {
        shell.classList.remove("shake");
        pin = "";
        renderPinDots();
      }, 480);
    }
  }
}

function pressBackspace() {
  pin = pin.slice(0, -1);
  renderPinDots();
}

function buildKeypad() {
  const keypad = document.getElementById("keypad");
  const layout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  layout.forEach((label) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = "keypad-key";

    if (label === "") {
      key.classList.add("keypad-key-blank");
      key.disabled = true;
      key.tabIndex = -1;
    } else if (label === "del") {
      key.textContent = "⌫";
      key.addEventListener("click", pressBackspace);
    } else {
      key.textContent = label;
      key.addEventListener("click", () => pressDigit(label));
    }

    keypad.appendChild(key);
  });
}

/* ---------- Video ---------- */

function initVideo() {
  const thumb = document.getElementById("video-thumb");
  const embed = document.getElementById("video-embed");

  thumb.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;
    iframe.title = "Save the date video";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    embed.appendChild(iframe);
    embed.hidden = false;
    thumb.hidden = true;
  });
}

/* ---------- RSVP modal ---------- */

function initRsvpModal() {
  const modal = document.getElementById("rsvp-modal");
  const openBtn = document.getElementById("rsvp-open");
  const closeBtn = document.getElementById("rsvp-close");
  const backdrop = document.getElementById("rsvp-backdrop");
  const addGuestBtn = document.getElementById("add-guest");
  const guestFields = document.getElementById("guest-fields");
  const form = document.getElementById("rsvp-form");
  const errorMsg = document.getElementById("rsvp-error");
  const successPanel = document.getElementById("rsvp-success");
  const yesBtn = document.getElementById("attend-yes");
  const noBtn = document.getElementById("attend-no");
  const attendingValue = document.getElementById("attending-value");

  function openModal() {
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  addGuestBtn.addEventListener("click", () => {
    if (guestCount >= MAX_GUESTS) return;
    guestCount += 1;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `guest-${guestCount}`;
    input.name = `guest${guestCount}`;
    input.className = "guest-input";
    input.placeholder = copy[currentLang].guestNameExtra;

    guestFields.appendChild(input);

    if (guestCount >= MAX_GUESTS) addGuestBtn.hidden = true;
  });

  function selectAttending(choice) {
    attendingChoice = choice;
    attendingValue.value = choice;
    yesBtn.classList.toggle("selected-yes", choice === "yes");
    noBtn.classList.toggle("selected-no", choice === "no");
  }

  yesBtn.addEventListener("click", () => selectAttending("yes"));
  noBtn.addEventListener("click", () => selectAttending("no"));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMsg.hidden = true;

    if (!attendingChoice) {
      errorMsg.hidden = false;
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });

      if (response.ok) {
        form.hidden = true;
        successPanel.hidden = false;
      } else {
        errorMsg.hidden = false;
      }
    } catch (err) {
      errorMsg.hidden = false;
    }
  });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  buildKeypad();

  document.getElementById("lang-toggle").addEventListener("click", () => {
    setLanguage(currentLang === "de" ? "en" : "de");
  });

  document.getElementById("reset-gate").addEventListener("click", closeGate);

  initVideo();
  initRsvpModal();

  if (sessionStorage.getItem("std-pin-verified") === "true") {
    const shell = document.getElementById("gate-shell");
    shell.style.transition = "none";
    shell.querySelectorAll(".gate-leaf, .gate-backdrop, .keypad-group").forEach((el) => {
      el.style.transition = "none";
    });
    openGate();
    // Force a reflow before restoring transitions so the initial
    // "already unlocked" state doesn't animate in.
    void shell.offsetWidth;
    requestAnimationFrame(() => {
      shell.style.transition = "";
      shell.querySelectorAll(".gate-leaf, .gate-backdrop, .keypad-group").forEach((el) => {
        el.style.transition = "";
      });
    });
  }
});
