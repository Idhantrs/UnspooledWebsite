// Mobile navigation toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Contact form: opens the visitor's email app with the message pre-filled.
// (No server needed. To change the destination, edit data-to on the <form>.)
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const to = form.dataset.to;
    const subject = `[Unspooled] ${data.get("topic")} — ${data.get("name")}`;
    const body =
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n` +
      `Organization: ${data.get("org") || "N/A"}\n\n` +
      `${data.get("message")}`;
    window.location.href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
