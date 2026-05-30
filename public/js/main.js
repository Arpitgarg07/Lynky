(() => {
  const data = window.LYNKY_DATA || {};

  const renderList = (container, items, template) => {
    if (!container) return;
    container.innerHTML = items.map(template).join('');
  };

  const initNav = () => {
    const toggle = document.querySelector('[data-nav-toggle]');
    const links = document.querySelectorAll('[data-nav] a');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
    links.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
      });
    });
  };

  const categoryTemplate = (category) => `
    <article class="card category-card">
      <div class="category-icon">${category.icon}</div>
      <div>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        ${category.tag ? `<span class="category-tag">${category.tag}</span>` : ''}
      </div>
    </article>
  `;

  const initCategories = () => {
    const categories = data.categories || [];
    document.querySelectorAll('[data-category-grid]')
      .forEach((grid) => {
        const type = grid.getAttribute('data-category-grid');
        const items = type === 'popular'
          ? categories.filter((cat) => cat.popular)
          : categories;
        renderList(grid, items, categoryTemplate);
      });

    const searchInputs = document.querySelectorAll('[data-category-search]');
    searchInputs.forEach((input) => {
      const targetSelector = input.getAttribute('data-category-target');
      const grid = document.querySelector(targetSelector);
      if (!grid) return;
      const original = categories;
      const renderFiltered = () => {
        const query = input.value.trim().toLowerCase();
        const filtered = original.filter((item) =>
          item.name.toLowerCase().includes(query)
        );
        renderList(grid, filtered, categoryTemplate);
      };
      input.addEventListener('input', renderFiltered);
    });
  };

  const initStats = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animateCount = (element) => {
      const target = Number(element.dataset.count || '0');
      const duration = 1200;
      const start = performance.now();
      const format = (value) => {
        const rounded = Math.round(value);
        const suffix = element.dataset.suffix || '+';
        if (suffix === '%') {
          return `${rounded}%`;
        }
        if (suffix === 's') {
          return `${rounded}s`;
        }
        if (rounded >= 1000) {
          return `${(rounded / 1000).toFixed(1)}k${suffix}`;
        }
        return `${rounded}${suffix}`;
      };

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * progress;
        element.textContent = format(value);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((counter) => observer.observe(counter));
  };

  const initTestimonials = () => {
    const container = document.querySelector('[data-testimonials]');
    if (!container) return;
    const items = data.testimonials || [];
    renderList(container, items, (testimonial) => `
      <article class="card testimonial-card">
        <p>“${testimonial.quote}”</p>
        <div>
          <strong>${testimonial.name}</strong><br />
          <span>${testimonial.role}</span>
        </div>
      </article>
    `);
  };

  const initFaqs = () => {
    const container = document.querySelector('[data-faq]');
    if (!container) return;
    const items = data.faqs || [];
    renderList(container, items, (item) => `
      <details>
        <summary>${item.question}</summary>
        <p>${item.answer}</p>
      </details>
    `);
  };

  const initCoverage = () => {
    const container = document.querySelector('[data-coverage]');
    if (!container) return;
    const items = data.areas || [];
    renderList(container, items, (area) => `
      <span class="coverage-item">${area}</span>
    `);
  };

  const initStatsList = () => {
    const container = document.querySelector('[data-stats]');
    if (!container) return;
    const items = data.stats || [];
    renderList(container, items, (stat) => `
      <div class="stat-card">
        <h3 data-count="${stat.value}" data-suffix="${stat.suffix || '+'}">${stat.value}${stat.suffix || '+'}</h3>
        <span>${stat.label}</span>
      </div>
    `);
  };

  const initServices = () => {
    const popularContainer = document.querySelector('[data-popular-services]');
    const recentContainer = document.querySelector('[data-recent-services]');
    const popular = data.popularServices || [];
    const recent = data.recentServices || [];

    renderList(popularContainer, popular, (service) => `
      <div class="service-item">
        <div>
          <strong>${service.name}</strong><br />
          <span class="highlight">${service.eta}</span>
        </div>
        <span>→</span>
      </div>
    `);

    renderList(recentContainer, recent, (service) => `
      <div class="service-item">
        <div>
          <strong>${service.name}</strong><br />
          <span class="highlight">${service.eta}</span>
        </div>
        <span>→</span>
      </div>
    `);
  };

  const initForm = () => {
    const forms = document.querySelectorAll('[data-lynky-form]');
    if (!forms.length) return;
    forms.forEach((form) => {
      const status = form.querySelector('[data-form-status]');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const whatsappNumber = form.dataset.whatsappNumber || '919999999999';
        const intent = form.dataset.whatsappIntent || 'New Lynky request';
        const formData = new FormData(form);
        const messageLines = [intent];
        formData.forEach((value, key) => {
          if (!value) return;
          const fieldLabel = key.replace(/[_-]/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
          messageLines.push(`${fieldLabel}: ${value}`);
        });
        const message = encodeURIComponent(messageLines.join('\n'));
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
        if (status) {
          status.textContent = 'Opening WhatsApp to complete your request...';
        }
        form.reset();
      });
    });
  };

  const initServiceSelect = () => {
    const selects = document.querySelectorAll('[data-service-select]');
    if (!selects.length) return;
    const categories = data.categories || [];
    selects.forEach((select) => {
      select.textContent = '';
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select a service';
      select.appendChild(placeholder);
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
      });
    });
  };

  const initLocations = () => {
    const stateSelects = document.querySelectorAll('[data-state-select]');
    if (!stateSelects.length) return;

    const locations = data.locations || [];
    stateSelects.forEach((stateSelect) => {
      stateSelect.textContent = '';
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select state';
      stateSelect.appendChild(placeholder);
      locations.forEach((location) => {
        const option = document.createElement('option');
        option.value = location.state;
        option.textContent = location.state;
        stateSelect.appendChild(option);
      });

      const cityTarget = stateSelect.getAttribute('data-city-target');
      const citySelect = cityTarget ? document.querySelector(cityTarget) : null;
      if (!citySelect) return;

      const updateCities = () => {
        const selected = locations.find((loc) => loc.state === stateSelect.value);
        const cities = selected ? selected.cities : [];
        citySelect.textContent = '';
        const cityPlaceholder = document.createElement('option');
        cityPlaceholder.value = '';
        cityPlaceholder.textContent = 'Select city';
        citySelect.appendChild(cityPlaceholder);
        cities.forEach((city) => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
        });
      };

      stateSelect.addEventListener('change', updateCities);
      updateCities();
    });
  };

  const initTeam = () => {
    const container = document.querySelector('[data-team]');
    if (!container) return;
    const team = data.team || [];
    renderList(container, team, (member) => `
      <article class=\"card\">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
      </article>
    `);
  };

  const initSearchHighlight = () => {
    const inputs = document.querySelectorAll('[data-search-forward]');
    inputs.forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });
    });
  };

  initNav();
  initCategories();
  initStatsList();
  initStats();
  initTestimonials();
  initFaqs();
  initCoverage();
  initServices();
  initForm();
  initServiceSelect();
  initLocations();
  initSearchHighlight();
  initTeam();
})();
