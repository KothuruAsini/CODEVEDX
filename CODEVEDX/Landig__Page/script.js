document.addEventListener('DOMContentLoaded', () => {
  const skillsData = [
    {
      title: 'Frontend',
      icon: 'FE',
      items: [
        { label: 'HTML', level: 96 },
        { label: 'CSS', level: 94 },
        { label: 'JavaScript', level: 90 },
        { label: 'React', level: 84 },
      ],
    },
    {
      title: 'Backend',
      icon: 'BE',
      items: [
        { label: 'PHP', level: 86 },
        { label: 'Node.js', level: 82 },
      ],
    },
    {
      title: 'Database',
      icon: 'DB',
      items: [
        { label: 'MySQL', level: 88 },
      ],
    },
    {
      title: 'Programming Languages',
      icon: 'PL',
      items: [
        { label: 'Python', level: 91 },
        { label: 'Java', level: 80 },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: 'TP',
      items: [
        { label: 'GitHub', level: 92 },
        { label: 'Netlify', level: 84 },
        { label: 'VS Code', level: 98 },
      ],
    },
  ];

  const projectsData = [
    {
      id: 'edu-job',
      title: 'EDU2JOB',
      category: 'web',
      description: 'Predicting Job Roles from Education Background Live: a role prediction system that analyzes user education and skills with machine learning recommendations.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Django', 'GitHub'],
      github: 'https://github.com/KothuruAsini/EDU-JOB',
      live: 'https://edu-job-2.onrender.com/',
      accent: 'Role prediction system',
    },
    {
      id: 'skill4shine',
      title: 'SKILL4SHINE',
      category: 'product',
      description: 'A full-stack skill development platform built with React (Vite) and Django for learning, interview preparation, and placement readiness.',
      technologies: ['React', 'Vite', 'Django', 'REST APIs'],
      github: 'https://github.com/KothuruAsini/SKILL4SHINE',
      live: 'https://skill4shine.onrender.com/login/',
      accent: 'Skill development platform',
    },
    {
      id: 'reviewsense',
      title: 'REVIEWSENCE',
      category: 'ai',
      description: 'A customer feedback analysis system that preprocesses review data, cleans unstructured text, and prepares analysis-ready datasets.',
      technologies: ['Python', 'Pandas', 'Regular Expressions', 'Text Processing'],
      github: 'https://github.com/KothuruAsini/REVIEWSENCE',
      live: 'https://chubby-placement-scored-median.trycloudflare.com/',
      accent: 'Feedback analysis system',
    },
    {
      id: 'landing-page',
      title: 'Portfolio Website',
      category: 'web',
      description: 'A futuristic personal developer landing page showcasing projects, skills, achievements, and contact information.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/KothuruAsini',
      live: 'https://my-developer-spot.lovable.app',
      accent: 'Portfolio product',
    },
  ];

  const blogsData = [
    {
      title: 'Future of AI',
      description: 'A short exploration of where generative AI, automation, and human-centered design are heading next.',
      tag: 'AI',
    },
    {
      title: 'Full Stack Development Journey',
      description: 'Lessons learned while building from static pages to modern interactive product experiences.',
      tag: 'Journey',
    },
    {
      title: 'Building Modern Web Apps',
      description: 'A practical look at structure, accessibility, performance, and maintaining visual polish.',
      tag: 'Web Dev',
    },
    {
      title: 'Machine Learning Basics',
      description: 'A beginner-friendly summary of data, models, training, and how ML turns patterns into predictions.',
      tag: 'ML',
    },
  ];

  const typingPhrases = [
    'Full Stack Developer',
    'AIML Student',
    'Web Developer',
    'Tech Enthusiast',
    'AI & Software Developer',
  ];

  const typingText = document.getElementById('typing-text');
  const skillsGrid = document.getElementById('skills-grid');
  const projectsGrid = document.getElementById('projects-grid');
  const blogGrid = document.getElementById('blog-grid');
  const nav = document.getElementById('primary-navigation');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const scrollProgress = document.querySelector('.scroll-progress span');
  const cursorGlow = document.querySelector('.cursor-glow');
  const loadingScreen = document.querySelector('.loading-screen');
  const pageTransition = document.querySelector('.page-transition');
  const modal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalTechs = document.getElementById('modal-techs');
  const modalLive = document.getElementById('modal-live');
  const modalKicker = document.getElementById('modal-kicker');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.getElementById('year');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  year.textContent = new Date().getFullYear();

  renderSkills();
  renderProjects('all');
  renderBlogs();
  createParticles();
  startTyping();
  setupScrollEffects();
  setupRevealObserver();
  setupNavigation();
  setupModal();
  setupProjectFilters();
  setupContactForm();
  setupBackToTop();
  setupSectionTransitions();

  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('is-hidden'), 650);
  });

  function renderSkills() {
    skillsGrid.innerHTML = skillsData.map((group) => `
      <article class="skill-card glass-card reveal">
        <div class="skill-head">
          <div>
            <span class="eyebrow">${group.title}</span>
            <h3>${group.title}</h3>
          </div>
          <div class="skill-icon"><span>${group.icon}</span></div>
        </div>
        <div class="skill-list">
          ${group.items.map((item) => `
            <div class="skill-item">
              <div class="skill-label">
                <span>${item.label}</span>
                <span>${item.level}%</span>
              </div>
              <div class="skill-bar"><span data-progress="${item.level}"></span></div>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderProjects(filter) {
    projectsGrid.innerHTML = projectsData
      .filter((project) => filter === 'all' || project.category === filter)
      .map((project) => `
        <article class="project-card glass-card reveal" data-category="${project.category}" data-project-id="${project.id}">
          <div class="project-preview">
            <span class="project-tag">${project.accent}</span>
            <strong>${project.title}</strong>
            <div class="preview-lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <button class="btn btn-secondary btn-small" type="button" data-open-project="${project.id}">Quick View</button>
            <a class="btn btn-ghost btn-small" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
            <a class="btn btn-primary btn-small" href="${project.live}" target="_blank" rel="noreferrer">Live Demo</a>
          </div>
        </article>
      `).join('');

    syncProjectModalTriggers();
    observeNewReveals();
  }

  function renderBlogs() {
    blogGrid.innerHTML = blogsData.map((blog) => `
      <article class="blog-card glass-card reveal">
        <span class="blog-tag">${blog.tag}</span>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <div class="blog-actions">
          <button class="btn btn-secondary btn-small" type="button" data-open-blog="${blog.title}">Read More</button>
        </div>
      </article>
    `).join('');

    syncBlogTriggers();
    observeNewReveals();
  }

  function setupProjectFilters() {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        renderProjects(button.dataset.filter || 'all');
      });
    });
  }

  function setupNavigation() {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupScrollEffects() {
    const sections = [...document.querySelectorAll('section[id]')];

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
        });
      });
    }, { threshold: 0.6 });

    sections.forEach((section) => sectionObserver.observe(section));

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;

      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    window.dispatchEvent(new Event('scroll'));
  }

  function setupRevealObserver() {
    const reveals = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.closest('#about')) {
          animateCounters();
        }
        if (entry.target.closest('#skills')) {
          animateSkillBars();
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    reveals.forEach((element) => observer.observe(element));
  }

  function observeNewReveals() {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.observe(element));
  }

  function animateCounters() {
    document.querySelectorAll('[data-counter]').forEach((element) => {
      if (element.dataset.animated === 'true') return;
      element.dataset.animated = 'true';
      const target = Number(element.dataset.counter || 0);
      const duration = 1100;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        element.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else element.textContent = String(target);
      };

      requestAnimationFrame(step);
    });
  }

  function animateSkillBars() {
    document.querySelectorAll('[data-progress]').forEach((bar) => {
      if (bar.dataset.animated === 'true') return;
      bar.dataset.animated = 'true';
      requestAnimationFrame(() => {
        bar.style.width = `${bar.dataset.progress}%`;
      });
    });
  }

  function createParticles() {
    const particleField = document.querySelector('.particle-field');
    const count = 22;

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${100 + Math.random() * 20}%`;
      particle.style.animationDuration = `${12 + Math.random() * 14}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.opacity = `${0.18 + Math.random() * 0.6}`;
      particleField.appendChild(particle);
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', (event) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
      });

      window.addEventListener('pointerleave', () => {
        cursorGlow.style.opacity = '0';
      });
    }
  }

  function startTyping() {
    if (!typingText) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = typingPhrases[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        typingText.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        charIndex -= 1;
        typingText.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        }
      }

      setTimeout(tick, deleting ? 48 : 90);
    };

    tick();
  }

  function syncProjectModalTriggers() {
    document.querySelectorAll('[data-open-project]').forEach((button) => {
      button.addEventListener('click', () => {
        const project = projectsData.find((item) => item.id === button.dataset.openProject);
        if (project) openModal('project', project);
      });
    });
  }

  function syncBlogTriggers() {
    document.querySelectorAll('[data-open-blog]').forEach((button) => {
      button.addEventListener('click', () => {
        const blog = blogsData.find((item) => item.title === button.dataset.openBlog);
        if (blog) openModal('blog', blog);
      });
    });
  }

  function setupModal() {
    modal.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-close-modal')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  function openModal(type, data) {
    if (type === 'project') {
      modalKicker.textContent = 'Project showcase';
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalTechs.innerHTML = data.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join('');
      modalLive.href = data.live;
      modalLive.style.display = 'inline-flex';
    } else {
      modalKicker.textContent = 'Blog preview';
      modalTitle.textContent = data.title;
      modalDescription.textContent = `${data.description} This placeholder article can later be replaced with a full post, published on the portfolio site or connected to a CMS.`;
      modalTechs.innerHTML = `<span class="tech-tag">${data.tag}</span><span class="tech-tag">Future article</span>`;
      modalLive.href = '#contact';
      modalLive.textContent = 'Contact Me';
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalLive.textContent = 'Live Demo';
  }

  function setupContactForm() {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      formFeedback.textContent = 'Thanks for reaching out. Your message is ready for the next step in the workflow.';
      contactForm.reset();
    });
  }

  function setupBackToTop() {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setupSectionTransitions() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        pageTransition.classList.add('is-active');
        setTimeout(() => pageTransition.classList.remove('is-active'), 320);
      });
    });
  }
});
