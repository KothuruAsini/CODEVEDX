const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.reveal');
const header = document.querySelector('.site-header');
const scrollProgress = document.querySelector('.scroll-progress span');
const cursorGlow = document.querySelector('.cursor-glow');
const backToTop = document.querySelector('.back-to-top');
const ambientLayer = document.querySelector('.ambient-layer');
const heroVisual = document.querySelector('.hero-visual');
const typingRole = document.querySelector('.typing-role');
const skillCards = document.querySelectorAll('.skill-card');
const tiltCards = document.querySelectorAll('[data-tilt]');
const contactForm = document.querySelector('#contact-form');
const contactFormStatus = document.querySelector('#contact-form-status');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (ambientLayer) {
  const particleCount = window.matchMedia('(max-width: 700px)').matches ? 10 : 18;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement('span');
    const size = 4 + Math.random() * 8;

    particle.className = 'ambient-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${20 + Math.random() * 80}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${10 + Math.random() * 14}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.opacity = String(0.18 + Math.random() * 0.45);
    particle.style.setProperty('--x', '0px');

    ambientLayer.appendChild(particle);
  }
}

const closeNavigation = () => {
  if (!navPanel || !navToggle) {
    return;
  }

  navPanel.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', closeNavigation);
});

document.addEventListener('click', (event) => {
  if (!navPanel || !navToggle || !navPanel.classList.contains('open')) {
    return;
  }

  const target = event.target;
  if (target instanceof Node && navPanel.contains(target) || target instanceof Node && navToggle.contains(target)) {
    return;
  }

  closeNavigation();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('visible');

      if (entry.target.id === 'skills') {
        skillCards.forEach((card) => {
          const fill = card.querySelector('.skill-meter span');
          const level = card.getAttribute('data-level') || '0';

          if (fill) {
            fill.style.setProperty('--fill', `${level}%`);
          }
        });
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -100px 0px',
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  {
    threshold: 0.4,
    rootMargin: '-18% 0px -48% 0px',
  }
);

sections.forEach((section) => activeObserver.observe(section));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const fill = entry.target.querySelector('.skill-meter span');
      const level = entry.target.getAttribute('data-level') || '0';

      if (fill) {
        fill.style.setProperty('--fill', `${level}%`);
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.4,
  }
);

skillCards.forEach((card) => skillObserver.observe(card));

const syncScrollState = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (header) {
    header.classList.toggle('is-scrolled', scrollTop > 18);
  }

  if (backToTop) {
    backToTop.classList.toggle('is-visible', scrollTop > 560);
  }
};

window.addEventListener('scroll', syncScrollState, { passive: true });
syncScrollState();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (typingRole && !prefersReducedMotion) {
  const roles = (typingRole.getAttribute('data-roles') || '').split('|').filter(Boolean);
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    if (!roles.length) {
      return;
    }

    const current = roles[roleIndex];
    const visibleText = current.slice(0, charIndex);
    typingRole.textContent = visibleText;

    if (!isDeleting && charIndex < current.length) {
      charIndex += 1;
    } else if (isDeleting && charIndex > 0) {
      charIndex -= 1;
    } else if (!isDeleting) {
      isDeleting = true;
      window.setTimeout(type, 900);
      return;
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    window.setTimeout(type, isDeleting ? 48 : 82);
  };

  window.setTimeout(type, 600);
}

if (cursorGlow && !prefersReducedMotion) {
  const updateCursor = (clientX, clientY) => {
    cursorGlow.style.transform = `translate(${clientX}px, ${clientY}px)`;
    cursorGlow.classList.add('is-visible');
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    updateCursor(event.clientX, event.clientY);
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    cursorGlow.classList.remove('is-visible');
  });
}

tiltCards.forEach((card) => {
  if (prefersReducedMotion) {
    return;
  }

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const rotateY = (relativeX - 0.5) * 14;
    const rotateX = (0.5 - relativeY) * 12;

    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
    card.style.setProperty('--lift', '-6px');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--lift', '0px');
  });
});

if (heroVisual && !prefersReducedMotion) {
  window.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const percentX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const percentY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    heroVisual.style.setProperty('--parallax-x', `${percentX * 16}px`);
    heroVisual.style.setProperty('--parallax-y', `${percentY * 12}px`);
  }, { passive: true });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      if (contactFormStatus) {
        contactFormStatus.textContent = 'Please fill in all fields before submitting.';
        contactFormStatus.classList.add('is-error');
      }

      return;
    }

    if (contactFormStatus) {
      contactFormStatus.textContent = 'Successfully submitted. I will get back to you soon.';
      contactFormStatus.classList.remove('is-error');
      contactFormStatus.classList.add('is-success');
    }

    contactForm.reset();

    window.setTimeout(() => {
      if (!contactFormStatus) {
        return;
      }

      contactFormStatus.textContent = '';
      contactFormStatus.classList.remove('is-success', 'is-error');
    }, 3500);
  });
}

window.addEventListener('load', () => {
  body.classList.add('is-loaded');
  syncScrollState();
});
