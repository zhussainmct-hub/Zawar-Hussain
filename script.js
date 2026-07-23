// script.js
document.addEventListener('DOMContentLoaded', function() {

  // --- Formspree feedback (client-side) ---
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      feedback.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      feedback.style.color = '#1f6390';
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          feedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message was sent.';
          feedback.style.color = '#1a7a4a';
          form.reset();
        } else {
          feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong.';
          feedback.style.color = '#b13e3e';
        }
      })
      .catch(error => {
        feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Network error. Please try again.';
        feedback.style.color = '#b13e3e';
        console.error('Formspree error:', error);
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('Zawar Hussain portfolio ready.');
});
