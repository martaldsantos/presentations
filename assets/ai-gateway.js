"use strict";

const steps = {
  call: {
    title: "One endpoint, one integration",
    description: "The application calls the gateway instead of a provider directly. Backend credentials remain with the platform, not in application code."
  },
  authenticate: {
    title: "Establish the consumer's identity",
    description: "Validate runtime access using the authentication method supported by your gateway. Associate the request with a trusted consumer so access decisions and usage counters have a reliable boundary."
  },
  policy: {
    title: "Apply guardrails before routing",
    description: "Evaluate the configured access, token and request policies. Requests that exceed a limit or lack permission should be rejected by the appropriate control rather than forwarded unchecked."
  },
  route: {
    title: "Choose an approved model or tool",
    description: "Resolve the model or tool to an approved backend. Pool and fallback strategies separate client integration from backend capacity, while provider credentials remain with the gateway."
  },
  observe: {
    title: "Turn traffic into operating evidence",
    description: "Record supported token metrics, latency and outcomes with application, environment and workload dimensions. Use this evidence to revise controls, and review payload logging for sensitive data."
  }
};

const stepButtons = document.querySelectorAll("[data-step]");
stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const step = steps[button.dataset.step];
    stepButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.getElementById("flow-heading").textContent = step.title;
    document.getElementById("flow-description").textContent = step.description;
  });
});

const completionInputs = document.querySelectorAll("[data-complete]");
function updateProgress() {
  const count = Array.from(completionInputs).filter((input) => input.checked).length;
  document.getElementById("lab-progress").value = count;
  document.getElementById("progress-label").textContent = `${count} of ${completionInputs.length} labs complete`;
}
completionInputs.forEach((input) => {
  input.checked = false;
  input.addEventListener("change", updateProgress);
});
updateProgress();

const usage = { "app-a": 0, "app-b": 0 };
const budget = 100;
const requestTokens = 40;
function updateBudgetState() {
  document.getElementById("budget-state").textContent =
    `app-a: ${usage["app-a"]} / ${budget} tokens | app-b: ${usage["app-b"]} / ${budget} tokens`;
}
document.querySelectorAll("[data-consumer]").forEach((button) => {
  button.addEventListener("click", () => {
    const consumer = button.dataset.consumer;
    if (usage[consumer] + requestTokens > budget) {
      document.getElementById("budget-result").textContent =
        `${consumer}: request blocked. Only ${budget - usage[consumer]} tokens remain; this request needs ${requestTokens}. The other application's counter is unchanged.`;
    } else {
      usage[consumer] += requestTokens;
      document.getElementById("budget-result").textContent =
        `${consumer}: request accepted. ${requestTokens} simulated tokens consumed.`;
    }
    updateBudgetState();
  });
});
document.getElementById("reset-budget").addEventListener("click", () => {
  usage["app-a"] = 0;
  usage["app-b"] = 0;
  updateBudgetState();
  document.getElementById("budget-result").textContent = "Both counters reset. Choose an application to send a simulated request.";
});

document.querySelectorAll(".canvas textarea").forEach((input) => { input.value = ""; });
