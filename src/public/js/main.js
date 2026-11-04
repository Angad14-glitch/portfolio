const API_BASE = '/api';

class PortfolioApp {
  constructor() {
    this.profile = null;
    this.projects = [];
    this.skills = {};
    this.typingIndex = 0;
    this.typingTexts = [
      'Full Stack Developer',
      'React & Node.js Expert',
      'MongoDB & Express Specialist',
      'Problem Solver',
      'Code Enthusiast'
    ];
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.render();
      this.bindEvents();
      this.startTypingAnimation();
      this.initScrollReveal();
    } catch (error) {
      console.error('Failed to initialize portfolio:', error);
      this.showToast('Failed to load portfolio data', 'error');
    }
  }

  async loadData() {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        fetch(`${API_BASE}/profile`),
        fetch(`${API_BASE}/projects?limit=100`),
        fetch(`${API_BASE}/skills`)
      ]);

      console.log('API responses:', profileRes.status, projectsRes.status, skillsRes.status);

      const profileData = await profileRes.json();
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();

      console.log('Profile data:', profileData);
      console.log('Projects data:', projectsData);
      console.log('Skills data:', skillsData);

      if (profileData.success) this.profile = profileData.data;
      if (projectsData.success) this.projects = projectsData.data;
      if (skillsData.success) this.skills = skillsData.data;
    } catch (error) {
      console.error('loadData error:', error);
      throw error;
    }
  }

  render() {
    this.renderProfile();
    this.renderSkills();
    this.renderProjects();
    this.updateFooter();
  }

  renderProfile() {
    if (!this.profile) return;

    const nameEl = document.querySelector('.hero__name');
    const subtitleEl = document.getElementById('hero-subtitle');
    const descriptionEl = document.getElementById('hero-description');
    const aboutTextEl = document.getElementById('about-text');
    const aboutDetailsEl = document.getElementById('about-details');
    const heroSocialEl = document.getElementById('hero-social');
    const footerSocialEl = document.getElementById('footer-social');
    const footerCopyrightEl = document.getElementById('footer-copyright');
    const navLogoEl = document.getElementById('nav-logo');
    const heroAvatarEl = document.getElementById('hero-avatar');
    const heroAvatarImgEl = document.getElementById('hero-avatar-img');
    const aboutAvatarEl = document.getElementById('about-avatar');
    const aboutAvatarImgEl = document.getElementById('about-avatar-img');

    if (nameEl) nameEl.textContent = this.profile.name;
    if (subtitleEl) {
      subtitleEl.innerHTML = '<span class="typing-text"></span>';
    }
    if (descriptionEl) descriptionEl.textContent = this.profile.bio;
    if (aboutTextEl) aboutTextEl.innerHTML = this.formatBio(this.profile.bio);
    
    if (aboutDetailsEl) {
      aboutDetailsEl.innerHTML = this.renderAboutDetails();
    }

    if (heroSocialEl) {
      heroSocialEl.innerHTML = this.renderSocialLinks(this.profile.socialLinks);
    }

    if (footerSocialEl) {
      footerSocialEl.innerHTML = this.renderSocialLinks(this.profile.socialLinks);
    }

    if (footerCopyrightEl) {
      footerCopyrightEl.textContent = `© ${new Date().getFullYear()} ${this.profile.name}. All rights reserved.`;
    }

    if (navLogoEl) {
      navLogoEl.textContent = this.profile.name.split(' ')[0];
    }

    this.renderAvatar(heroAvatarEl, heroAvatarImgEl);
    this.renderAvatar(aboutAvatarEl, aboutAvatarImgEl);

    document.title = `${this.profile.name} | ${this.profile.title}`;
  }

  formatBio(bio) {
    return bio.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }

  renderAboutDetails() {
    const details = [];
    
    if (this.profile.email) {
      details.push({
        icon: '✉️',
        title: 'Email',
        value: this.profile.email
      });
    }
    
    if (this.profile.location) {
      details.push({
        icon: '📍',
        title: 'Location',
        value: this.profile.location
      });
    }
    
    if (this.profile.phone) {
      details.push({
        icon: '📞',
        title: 'Phone',
        value: this.profile.phone
      });
    }

    return details.map(detail => `
      <div class="detail-card">
        <div class="detail-card__icon">${detail.icon}</div>
        <div class="detail-card__content">
          <div class="detail-card__title">${detail.title}</div>
          <div class="detail-card__value">${detail.value}</div>
        </div>
      </div>
    `).join('');
  }

  renderSocialLinks(socialLinks) {
    if (!socialLinks) return '';
    
    const links = [];
    const linkConfig = {
      github: { icon: '💻', label: 'GitHub' },
      linkedin: { icon: '💼', label: 'LinkedIn' },
      twitter: { icon: '🐦', label: 'Twitter' },
      website: { icon: '🌐', label: 'Website' }
    };

    Object.entries(linkConfig).forEach(([key, config]) => {
      if (socialLinks[key]) {
        links.push(`
          <a href="${socialLinks[key]}" 
             class="hero__social-link" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="${config.label}">
            ${config.icon}
          </a>
        `);
      }
    });

    return links.join('');
  }

  renderAvatar(avatarContainer, avatarImg) {
    if (!avatarContainer || !avatarImg) return;
    
    const avatarUrl = this.profile?.avatar;
    if (avatarUrl && this.isValidUrl(avatarUrl)) {
      avatarImg.src = avatarUrl;
      avatarImg.alt = this.profile.name;
      avatarImg.style.display = 'block';
      const fallback = avatarContainer.querySelector('.hero__avatar-fallback, .about__avatar-fallback');
      if (fallback) fallback.style.display = 'none';
    } else {
      avatarImg.style.display = 'none';
      const fallback = avatarContainer.querySelector('.hero__avatar-fallback, .about__avatar-fallback');
      if (fallback) fallback.style.display = 'flex';
    }
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  renderSkills() {
    const container = document.getElementById('skills-categories');
    if (!container) return;

    const categoryConfig = {
      frontend: { title: 'Frontend', icon: '🎨', color: '#0ea5e9', light: '#38bdf8' },
      backend: { title: 'Backend', icon: '⚙️', color: '#8b5cf6', light: '#a78bfa' },
      database: { title: 'Database', icon: '🗄️', color: '#10b981', light: '#34d399' },
      devops: { title: 'DevOps', icon: '☁️', color: '#f59e0b', light: '#fbbf24' },
      tools: { title: 'Tools', icon: '🔧', color: '#06b6d4', light: '#22d3ee' },
      'soft-skills': { title: 'Soft Skills', icon: '💡', color: '#f43f5e', light: '#fb7185' },
      other: { title: 'Other', icon: '📦', color: '#64748b', light: '#94a3b8' }
    };

    const categories = Object.entries(this.skills);
    
    if (categories.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--color-text-muted);">No skills available</p>';
      return;
    }

    container.innerHTML = categories.map(([category, skills]) => {
      const config = categoryConfig[category] || categoryConfig.other;
      return `
        <div class="skill-category" style="--cat-color: ${config.color};">
          <div class="skill-category__header">
            <div class="skill-category__icon" style="background-color: ${config.color}">
              ${config.icon}
            </div>
            <h3 class="skill-category__title">${config.title}</h3>
          </div>
          <div class="skill-category__list">
            ${skills.map(skill => this.renderSkillItem(skill, config)).join('')}
          </div>
        </div>
      `;
    }).join('');

    this.animateSkillBars();
  }

  renderSkillItem(skill, categoryConfig) {
    const icon = skill.icon || '⚡';
    const color = skill.color || categoryConfig.color;
    const lightColor = skill.color ? this.lightenColor(skill.color) : categoryConfig.light;
    return `
      <div class="skill-item" style="--skill-color: ${color}; --skill-color-light: ${lightColor};">
        <div class="skill-item__icon" style="background: linear-gradient(135deg, ${color}, ${lightColor})">${icon}</div>
        <div class="skill-item__name">${skill.name}</div>
        <div class="skill-item__bar">
          <div class="skill-item__progress" style="width: 0%; background: linear-gradient(90deg, ${color}, ${lightColor})" data-progress="${skill.proficiency}"></div>
        </div>
      </div>
    `;
  }

  lightenColor(hex) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.floor((num >> 16) * 1.3));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) * 1.3));
    const b = Math.min(255, Math.floor((num & 0x0000FF) * 1.3));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-item__progress');
          bars.forEach((bar, index) => {
            const progress = bar.dataset.progress;
            setTimeout(() => {
              bar.style.width = `${progress}%`;
            }, 200 + index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
  }

  renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    if (this.projects.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--color-text-muted);">No projects available</p>';
      return;
    }

    container.innerHTML = this.projects.map(project => this.renderProjectCard(project)).join('');
    this.bindFilterEvents();
  }

  renderProjectCard(project) {
    const imageHtml = project.images && project.images.length > 0 
      ? `<img src="${project.images[0].url}" alt="${project.images[0].alt || project.title}" loading="lazy">`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));display:flex;align-items:center;justify-content:center;color:white;font-size:3rem;">${this.getCategoryIcon(project.category)}</div>`;

    const techHtml = project.technologies && project.technologies.length > 0
      ? project.technologies.slice(0, 6).map(tech => `<span class="project-card__tech-tag">${tech}</span>`).join('')
      : '';

    const linksHtml = [];
    if (project.links?.live) linksHtml.push(`<a href="${project.links.live}" class="project-card__link project-card__link--primary" target="_blank" rel="noopener noreferrer">Live Demo</a>`);
    if (project.links?.github) linksHtml.push(`<a href="${project.links.github}" class="project-card__link" target="_blank" rel="noopener noreferrer">Code</a>`);
    if (project.links?.demo) linksHtml.push(`<a href="${project.links.demo}" class="project-card__link" target="_blank" rel="noopener noreferrer">Demo</a>`);

    return `
      <article class="project-card" data-category="${project.category}" role="listitem">
        <div class="project-card__image">
          ${imageHtml}
          <div class="project-card__overlay"></div>
          <div class="project-card__links">${linksHtml.join('')}</div>
        </div>
        <div class="project-card__content">
          <div class="project-card__meta">
            <span class="project-card__category project-card__category--${project.category}">${project.category}</span>
            ${project.featured ? '<span class="project-card__category" style="background:linear-gradient(135deg,#fef3c7,#fde68a);color:#b45309;border-color:#fcd34d;">Featured</span>' : ''}
          </div>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__description">${project.shortDescription || project.description.substring(0, 150)}...</p>
          <div class="project-card__tech">${techHtml}</div>
        </div>
      </article>
    `;
  }

  getCategoryIcon(category) {
    const icons = {
      web: '🌐',
      mobile: '📱',
      api: '🔌',
      desktop: '💻',
      other: '📦'
    };
    return icons[category] || '📦';
  }

  bindFilterEvents() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        projectCards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  updateFooter() {
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright && this.profile) {
      footerCopyright.textContent = `© ${new Date().getFullYear()} ${this.profile.name}. All rights reserved.`;
    }
  }

  bindEvents() {
    this.bindNavigation();
    this.bindContactForm();
    this.bindScrollEffects();
  }

  bindNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    navToggle?.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu?.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) {
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.submitContactForm(form);
    });

    const inputs = form.querySelectorAll('.form__input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const errorEl = field.parentElement.querySelector('.form__error');
    let isValid = true;
    let message = '';

    if (field.required && !field.value.trim()) {
      isValid = false;
      message = `${this.getFieldLabel(field)} is required`;
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    } else if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
      isValid = false;
      message = 'Message must be at least 10 characters';
    }

    field.setAttribute('aria-invalid', !isValid);
    if (errorEl) errorEl.textContent = message;

    return isValid;
  }

  clearFieldError(field) {
    field.setAttribute('aria-invalid', 'false');
    const errorEl = field.parentElement.querySelector('.form__error');
    if (errorEl) errorEl.textContent = '';
  }

  getFieldLabel(field) {
    const label = field.parentElement.querySelector('.form__label');
    return label ? label.textContent : field.name;
  }

  async submitContactForm(form) {
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const inputs = form.querySelectorAll('.form__input');

    let isValid = true;
    inputs.forEach(input => {
      if (!this.validateField(input)) isValid = false;
    });

    if (!isValid) {
      this.showToast('Please fix the errors in the form', 'error');
      return;
    }

    submitBtn.disabled = true;
    formMessage.textContent = '';
    formMessage.className = 'form__message';

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        form.reset();
        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formMessage.classList.add('form__message--success');
        this.showToast('Message sent successfully!', 'success');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      formMessage.textContent = 'Failed to send message. Please try again later.';
      formMessage.classList.add('form__message--error');
      this.showToast('Failed to send message', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  }

  bindScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  startTypingAnimation() {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentText = this.typingTexts[textIndex];
      
      if (isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % this.typingTexts.length;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    type();
  }

  initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast__icon">${icons[type]}</div>
      <div class="toast__message">${message}</div>
      <button class="toast__close" aria-label="Close notification">✕</button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast__close').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 5000);
  }
}

new PortfolioApp();