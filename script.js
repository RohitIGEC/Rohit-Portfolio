
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');

  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'light');   // remember user's choice
  } else {
    html.setAttribute('data-theme', 'dark');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
}

// Apply saved theme on page load
(function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  const icon  = document.getElementById('themeIcon');

  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.textContent = '☀️';
  }
})();


// ----- SCROLL REVEAL -----
// Watches .reveal elements and adds .visible when they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


// ----- CONTACT FORM → MAILTO -----
function sendMail() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim() || 'Portfolio Contact';
  const message = document.getElementById('fmessage').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    alert('Please fill in all required fields before sending.');
    return;
  }

  // Simple email format check
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address.');
    return;
  }

  // Build mailto link and open mail client
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:rohitchakravarti2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}


// ----- ACTIVE NAV HIGHLIGHT (optional nice touch) -----
// Highlights the current section's nav link as you scroll
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';   // reset all
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--purple-glow)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((sec) => navObserver.observe(sec));
