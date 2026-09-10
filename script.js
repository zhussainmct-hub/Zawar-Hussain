document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  // Persist light/dark preference.
  const savedTheme = localStorage.getItem("zawar-theme");
  if (savedTheme === "light") body.classList.add("light");
  updateThemeIcon();

  themeBtn?.addEventListener("click", () => {
    body.classList.toggle("light");
    localStorage.setItem("zawar-theme", body.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
  });

  function updateThemeIcon() {
    if (!themeBtn) return;
    themeBtn.innerHTML = body.classList.contains("light")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuBtn.innerHTML = nav?.classList.contains("open")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  // Animated KPI counters.
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const tick = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.35 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Portfolio filtering.
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-card");

  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      projects.forEach(card => {
        const categories = (card.dataset.category || "").split(" ");
        card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  // Formspree AJAX submission.
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "Sending…";
    feedback.style.color = "var(--cyan)";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      feedback.textContent = "Message sent successfully.";
      feedback.style.color = "var(--green)";
    } catch (error) {
      feedback.textContent = "Could not send. Please email zhussain.mct@gmail.com.";
      feedback.style.color = "#ff8f8f";
      console.error(error);
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
