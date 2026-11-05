// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Price per m², inkl. mva. Used by the price calculator and the form estimate.
const PRICE_PER_M2 = 100;
const PER_M2_SERVICES = ["Flyttevask", "Utflyttingsvask for leietakere"];
const SHORT_TERM_SERVICE = "Vask av korttidsutleie";

// Price calculator: slider + m² field + total
const CALC_MIN = 20;
const CALC_MAX = 250;

document.querySelectorAll("[data-calc]").forEach((calc) => {
  const range = calc.querySelector("[data-range]");
  const number = calc.querySelector("[data-number]");
  const total = calc.querySelector("[data-total]");
  const cta = calc.querySelector("[data-calc-cta]");

  const currentSize = () => {
    const size = Number(number.value);
    return number.value !== "" && size >= 1 && size <= 1000 ? size : null;
  };

  const update = () => {
    const size = currentSize();
    total.textContent = size ? `${Math.round(size * PRICE_PER_M2).toLocaleString("nb-NO")} kr` : "–";
    range.value = Math.min(CALC_MAX, Math.max(CALC_MIN, size || CALC_MIN));
    const pct = ((Number(range.value) - CALC_MIN) / (CALC_MAX - CALC_MIN)) * 100;
    range.style.setProperty("--pct", `${pct}%`);
  };

  range.addEventListener("input", () => {
    number.value = range.value;
    update();
  });
  number.addEventListener("input", update);

  // Carry the chosen size into the booking form.
  cta.addEventListener("click", () => {
    const size = currentSize();
    const sizeField = document.getElementById("storrelse");
    if (!size || !sizeField) return;
    sizeField.value = Math.round(size);
    sizeField.dispatchEvent(new Event("input", { bubbles: true }));
  });

  update();
});

// Multi-step lead form (only present on pages with the form)
const form = document.getElementById("lead-form");

if (form) {
  const serviceSelect = document.getElementById("tjeneste");
  const dateInput = document.getElementById("dato");
  const sizeInput = document.getElementById("storrelse");
  const estimate = document.getElementById("form-estimate");
  const estimateField = document.getElementById("estimat-felt");

  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const updateEstimate = () => {
    const size = Number(sizeInput.value);
    let text = "";
    let fieldValue = "";

    if (serviceSelect.value === SHORT_TERM_SERVICE) {
      text = "Pris for korttidsutleie avtales ut fra boligen.";
      fieldValue = "Avtales";
    } else if (PER_M2_SERVICES.includes(serviceSelect.value) && size > 0) {
      const formatted = Math.round(size * PRICE_PER_M2).toLocaleString("nb-NO").replace(/ /g, " ");
      text = `Estimert pris: ${formatted} kr inkl. mva. Bekreftes av meg før jeg starter.`;
      fieldValue = `${formatted} kr inkl. mva`;
    }

    estimate.textContent = text;
    estimate.hidden = !text;
    estimateField.value = fieldValue;
  };

  serviceSelect.addEventListener("change", updateEstimate);
  sizeInput.addEventListener("input", updateEstimate);

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      serviceSelect.value = link.dataset.service;
      updateEstimate();
    });
  });

  const steps = Array.from(form.querySelectorAll(".form-step"));
  const progress = document.getElementById("form-progress");
  const formIntro = document.getElementById("form-intro");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");

  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    progress.textContent = `Steg ${index + 1} av ${steps.length}`;
  };

  showStep(currentStep);

  const goToNextStep = () => {
    const currentFields = steps[currentStep].querySelectorAll("input, select, textarea");
    let valid = true;
    currentFields.forEach((field) => {
      if (!field.checkValidity()) {
        valid = false;
        field.reportValidity();
      }
    });
    if (!valid) return;
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    showStep(currentStep);
  };

  form.querySelectorAll('[data-action="next"]').forEach((btn) => {
    btn.addEventListener("click", goToNextStep);
  });

  // Pressing Enter on an earlier step should advance instead of
  // triggering the form's (hidden, later-step) submit button.
  form.addEventListener("keydown", (event) => {
    const isTextField = event.target.tagName === "INPUT" || event.target.tagName === "SELECT";
    if (event.key === "Enter" && isTextField && currentStep < steps.length - 1) {
      event.preventDefault();
      goToNextStep();
    }
  });

  form.querySelectorAll('[data-action="back"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formError.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sender...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formIntro.hidden = true;
        form.hidden = true;
        formSuccess.hidden = false;
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      formError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Send inn";
    }
  });
}
