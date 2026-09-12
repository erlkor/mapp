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

// Multi-step lead form (only present on pages with the form)
const form = document.getElementById("lead-form");

if (form) {
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
