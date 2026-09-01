const emiForm = document.getElementById("emiForm");
const emiResult = document.getElementById("emiResult");
const loanForm = document.getElementById("loanForm");
const formMessage = document.getElementById("formMessage");
const FORM_SUBMIT_ENDPOINT = "/api/submit";
const testimonialsTrack = document.getElementById("testimonialsTrack");
const testimonialNext = document.getElementById("testimonialNext");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function calculateEmi(principal, annualRate, months) {
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

// Sync range input with number input - wrapped in DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
});

emiForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(document.getElementById("loanAmount").value);
  const rate = Number(document.getElementById("interestRate").value);
  const tenure = Number(document.getElementById("loanTenure").value);

  if (amount <= 0 || rate < 0 || tenure <= 0) {
    emiResult.innerHTML = `<div class="emi-result-placeholder"><p>Please enter valid loan values.</p></div>`;
    return;
  }

  const emi = calculateEmi(amount, rate, tenure);
  const totalPayable = emi * tenure;
  const interestPayable = totalPayable - amount;

  const resultContainer = document.getElementById("emiResult");
  resultContainer.innerHTML = `
    <div class="emi-results-grid">
      <div class="emi-result-item">
        <span class="result-label">Monthly EMI</span>
        <span class="result-value">${formatCurrency(emi)}</span>
      </div>
      <div class="emi-result-item">
        <span class="result-label">Total Amount</span>
        <span class="result-value">${formatCurrency(totalPayable)}</span>
      </div>
      <div class="emi-result-item">
        <span class="result-label">Interest Amount</span>
        <span class="result-value">${formatCurrency(interestPayable)}</span>
      </div>
    </div>
  `;
});

loanForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const data = new FormData(loanForm);
  const name = data.get("name");
  const phone = String(data.get("phone") || "").trim();
  const amount = Number(data.get("desiredAmount"));
  const submitButton = loanForm.querySelector('button[type="submit"]');

  // Validate phone number format
  const phoneRegex = /^[6-9][0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    formMessage.classList.add("error");
    formMessage.classList.remove("success");
    formMessage.textContent = "Please enter a valid 10-digit Indian mobile number (starting with 6-9).";
    return;
  }

  if (!name || !amount || amount <= 0) {
    formMessage.classList.add("error");
    formMessage.classList.remove("success");
    formMessage.textContent = "Please enter valid request details.";
    return;
  }

  data.append("submittedAt", new Date().toLocaleString("en-IN"));

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  formMessage.textContent = "Sending your request...";

  try {
    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    let result = null;
    try {
      result = await response.json();
    } catch (parseError) {
      result = null;
    }

    const isSuccess =
      response.ok &&
      result &&
      (result.success === true || result.success === "true");

    if (!isSuccess) {
      const message =
        (result && result.message) ||
        "Submission could not be confirmed by the email gateway.";
      throw new Error(message);
    }

    formMessage.classList.add("success");
    formMessage.classList.remove("error");
    formMessage.textContent = `Thank you, ${name}. Your request for ${formatCurrency(
      amount
    )} has been submitted successfully. We will contact you shortly.`;
    loanForm.reset();
  } catch (error) {
    console.error("Loan form submission failed:", error);
    formMessage.classList.add("error");
    formMessage.classList.remove("success");
    formMessage.textContent =
      "We could not submit your request right now. Please verify the FormSubmit activation email for the receiver address and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Request";
  }
});

if (testimonialsTrack && testimonialNext) {
  const testimonialCards = Array.from(
    testimonialsTrack.querySelectorAll(".testimonial-card")
  );
  let currentPage = 0;
  let cardsPerPage = 3;
  let totalPages = 1;

  function computeCardsPerPage() {
    if (window.innerWidth < 680) {
      return 1;
    }
    if (window.innerWidth < 1100) {
      return 2;
    }
    return 3;
  }

  function updateTestimonials(resetPage) {
    cardsPerPage = computeCardsPerPage();
    totalPages = Math.max(1, Math.ceil(testimonialCards.length / cardsPerPage));

    if (resetPage) {
      currentPage = 0;
    } else if (currentPage > totalPages - 1) {
      currentPage = totalPages - 1;
    }

    const widthPercent = 100 / cardsPerPage;
    testimonialCards.forEach(function (card) {
      card.style.flex = `0 0 ${widthPercent}%`;
      card.style.maxWidth = `${widthPercent}%`;
    });

    testimonialsTrack.style.transform = `translateX(-${currentPage * 100}%)`;
    testimonialNext.disabled = totalPages <= 1;
  }

  testimonialNext.addEventListener("click", function () {
    currentPage = (currentPage + 1) % totalPages;
    updateTestimonials(false);
  });

  window.addEventListener("resize", function () {
    updateTestimonials(false);
  });

  updateTestimonials(true);
}
