(function () {
  const projectsData = window.projects || {};
  const modal = document.getElementById('project-modal');
  const dialog = document.getElementById('project-modal-dialog');
  const content = document.getElementById('project-modal-content');
  const closeButton = document.getElementById('project-modal-close');
  const titleElement = document.getElementById('project-modal-title');
  const categoryElement = document.getElementById('project-modal-category');
  const statusElement = document.getElementById('project-modal-status');
  const dateElement = document.getElementById('project-modal-date');
  const tabButtons = Array.from(document.querySelectorAll('.project-modal__tab'));

  if (!modal || !dialog || !content || !closeButton || !titleElement || !categoryElement || !statusElement || !dateElement || !tabButtons.length) {
    return;
  }

  const tabLabels = {
    overview: 'Visão Geral',
    technologies: 'Tecnologias',
    gallery: 'Galeria',
    learning: 'Aprendizados',
  };

  let activeProject = null;
  let activeTab = 'overview';
  let activeGalleryImage = null;
  let lastFocusedElement = null;
  let closeTimer = null;
  let renderTimer = null;
  let isOpen = false;

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function toList(value) {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
  }

  function createList(items) {
    if (!items.length) return '';

    return `
      <ul class="project-modal__list">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    `;
  }

  function createSummaryCard(label, value, wide = false) {
    return `
      <article class="project-modal__summary-card ${wide ? 'project-modal__summary-card--wide' : ''}">
        <span class="project-modal__card-label">${escapeHtml(label)}</span>
        <span class="project-modal__card-value">${escapeHtml(value)}</span>
      </article>
    `;
  }

  function createSection(label, title, body) {
    return `
      <section class="project-modal__section">
        <span class="project-modal__section-label">${escapeHtml(label)}</span>
        <h4 class="project-modal__section-title">${escapeHtml(title)}</h4>
        ${body}
      </section>
    `;
  }

  function createLinks(project) {
    const links = toList(project.links);

    if (!links.length || project.privado) {
      return '';
    }

    return `
      <section class="project-modal__section">
        <span class="project-modal__section-label">Links</span>
        <h4 class="project-modal__section-title">Acessos relacionados</h4>
        <div class="project-modal__links">
          ${links.map((link) => `
            <a class="project-modal__link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(link.label)}
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderOverview(project) {
    const funcionalidades = toList(project.funcionalidades);
    const creditos = toList(project.creditos);
    const arquitetura = project.arquitetura || 'Não informado.';
    const links = createLinks(project);

    return `
      <div class="project-modal__stack">
        <div class="project-modal__summary-grid">
          ${createSummaryCard('Título', project.titulo)}
          ${createSummaryCard('Categoria', project.categoria)}
          ${createSummaryCard('Status', project.status)}
          ${createSummaryCard('Data', project.data)}
          ${createSummaryCard('Descrição', project.descricao, true)}
          ${createSummaryCard('Objetivo', project.objetivo, true)}
          ${createSummaryCard('Meu papel', project.papel, true)}
        </div>

        ${createSection('Principais funcionalidades', 'O que o projeto entrega', createList(funcionalidades))}

        ${createSection('Arquitetura resumida', 'Visão compacta da solução', `<p>${escapeHtml(arquitetura)}</p>`)}

        ${creditos.length ? createSection('Créditos e direitos autorais', 'Quem participou da construção', createList(creditos)) : ''}

        ${links}
      </div>
    `;
  }

  function renderTechnologies(project) {
    const technologies = toList(project.tecnologias);

    return `
      <div class="project-modal__stack">
        <section class="project-modal__panel-card">
          <span class="project-modal__card-label">Tecnologias utilizadas</span>
          <h4 class="project-modal__section-title">Badges do projeto</h4>
          <div class="project-modal__tech-grid">
            ${technologies.map((technology) => `<span class="project-modal__badge">${escapeHtml(technology)}</span>`).join('')}
          </div>
        </section>
      </div>
    `;
  }

  function renderGallery(project) {
    if (project.privado) {
      return `
        <div class="project-modal__confidential">
          <div class="project-modal__confidential-icon" aria-hidden="true">🔒</div>
          <h4 class="project-modal__confidential-title">Projeto Institucional</h4>
          <p class="project-modal__confidential-text">As imagens, códigos e detalhes visuais deste projeto não são disponibilizados devido às políticas de confidencialidade e proteção de dados institucionais.</p>
        </div>
      `;
    }

    const galleryItems = toList(project.galeria);

    if (!galleryItems.length) {
      return `
        <div class="project-modal__empty">
          <div class="project-modal__empty-icon" aria-hidden="true">🖼️</div>
          <h4 class="project-modal__empty-title">Galeria sem imagens cadastradas</h4>
          <p class="project-modal__empty-text">Este projeto ainda não possui imagens anexadas. Quando houver materiais visuais, eles aparecerão aqui em uma galeria responsiva.</p>
        </div>
      `;
    }

    return `
      <div class="project-modal__gallery">
        <div class="project-modal__gallery-grid">
          ${galleryItems.map((item, index) => `
            <button
              type="button"
              class="project-modal__thumb ${activeGalleryImage && item.src === activeGalleryImage.src ? 'is-active' : ''}"
              data-gallery-index="${index}"
              aria-label="Abrir imagem ${index + 1}: ${escapeHtml(item.alt)}"
            >
              <div class="project-modal__thumb-frame">
                <img src="${item.src}" alt="${escapeHtml(item.alt)}" />
              </div>
              <span class="project-modal__thumb-label">${escapeHtml(item.caption || item.alt)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLearningContent(project) {
    const desafios = toList(project.desafios);
    const solucoes = toList(project.solucoes);
    const aprendizados = toList(project.aprendizados);
    const melhorias = toList(project.melhorias);

    return `
      <div class="project-modal__stack">
        <div class="project-modal__overview-grid">
          ${createSection('Desafios', 'Principais pontos de atenção', createList(desafios))}
          ${createSection('Soluções', 'Como os desafios foram enfrentados', createList(solucoes))}
          ${createSection('Aprendizados', 'O que ficou consolidado', createList(aprendizados))}
          ${createSection('Melhorias futuras', 'Evoluções planejadas', createList(melhorias))}
        </div>
      </div>
    `;
  }

  function renderContent(project, tab) {
    switch (tab) {
      case 'technologies':
        return renderTechnologies(project);
      case 'gallery':
        return renderGallery(project);
      case 'learning':
        return renderLearningContent(project);
      case 'overview':
      default:
        return renderOverview(project);
    }
  }

  function updateTabState() {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.tab === activeTab;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });
  }

  function focusFirstTab() {
    const activeButton = tabButtons.find((button) => button.dataset.tab === activeTab);
    if (activeButton) {
      activeButton.focus({ preventScroll: true });
      return;
    }

    closeButton.focus({ preventScroll: true });
  }

  function renderActiveTab(animate = true) {
    if (!activeProject) {
      return;
    }

    updateTabState();

    const nextMarkup = renderContent(activeProject, activeTab);
    window.clearTimeout(renderTimer);

    if (!animate) {
      content.classList.remove('is-transitioning');
      content.innerHTML = nextMarkup;
      return;
    }

    content.classList.add('is-transitioning');
    renderTimer = window.setTimeout(() => {
      content.innerHTML = nextMarkup;
      requestAnimationFrame(() => {
        content.classList.remove('is-transitioning');
      });
    }, 140);
  }

  function setScrollbarWidth() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  function lockBody() {
    setScrollbarWidth();
    document.body.classList.add('modal-open');
  }

  function unlockBody() {
    document.body.classList.remove('modal-open');
    document.documentElement.style.removeProperty('--scrollbar-width');
  }

  function openProject(projectId, triggerElement) {
    const project = projectsData[projectId];

    if (!project) {
      return;
    }

    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    activeProject = project;
    activeTab = 'overview';
    activeGalleryImage = null;
    lastFocusedElement = triggerElement || document.activeElement;

    titleElement.textContent = project.titulo;
    categoryElement.textContent = project.categoria;
    statusElement.textContent = project.status;
    dateElement.textContent = project.data;
    isOpen = true;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    lockBody();
    renderActiveTab(false);

    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      dialog.focus({ preventScroll: true });
      focusFirstTab();
    });
  }

  function closeProject(shouldRestoreFocus = true) {
    if (!isOpen) {
      return;
    }

    modal.classList.add('is-closing');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    closeTimer = window.setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('is-closing');
      content.innerHTML = '';
      activeProject = null;
      activeGalleryImage = null;
      unlockBody();
      isOpen = false;

      if (shouldRestoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus({ preventScroll: true });
      }
    }, 260);
  }

  function changeTab(tabName) {
    if (!activeProject || tabName === activeTab) {
      return;
    }

    activeTab = tabName;
    renderActiveTab(true);
  }

  function handleGallerySelection(target) {
    if (!activeProject || activeProject.privado) {
      return;
    }

    const galleryItems = toList(activeProject.galeria);

    if (!galleryItems.length) {
      return;
    }

    if (target.dataset.galleryPreview === 'true') {
      activeGalleryImage = activeGalleryImage || galleryItems[0];
      renderActiveTab(false);
      return;
    }

    const index = Number(target.dataset.galleryIndex);

    if (Number.isNaN(index) || !galleryItems[index]) {
      return;
    }

    const selectedImage = galleryItems[index];

    if (selectedImage) {
      activeGalleryImage = selectedImage;
      window.open(selectedImage.src, '_blank', 'noopener,noreferrer');
      renderActiveTab(false);
    }
  }

  document.addEventListener('click', (event) => {
    const openTrigger = event.target.closest('[data-open-project]');

    if (openTrigger) {
      event.preventDefault();
      openProject(openTrigger.dataset.openProject, openTrigger);
      return;
    }

    if (event.target.closest('[data-modal-close]')) {
      closeProject();
      return;
    }

    const galleryTarget = event.target.closest('[data-gallery-index], [data-gallery-preview]');

    if (galleryTarget && modal.contains(galleryTarget)) {
      handleGallerySelection(galleryTarget);
    }
  });

  closeButton.addEventListener('click', () => closeProject());

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => changeTab(button.dataset.tab));
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') {
        return;
      }

      event.preventDefault();

      const currentIndex = tabButtons.indexOf(button);
      let nextIndex = currentIndex;

      if (event.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabButtons.length;
      }

      if (event.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
      }

      if (event.key === 'Home') {
        nextIndex = 0;
      }

      if (event.key === 'End') {
        nextIndex = tabButtons.length - 1;
      }

      const nextButton = tabButtons[nextIndex];
      if (nextButton) {
        nextButton.focus({ preventScroll: true });
        changeTab(nextButton.dataset.tab);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      if (event.target && event.target.matches && event.target.matches('input, textarea')) {
        return;
      }

      event.preventDefault();
      closeProject();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = Array.from(
      modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((element) => !element.closest('[hidden]'));

    if (!focusableElements.length) {
      event.preventDefault();
      dialog.focus({ preventScroll: true });
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus({ preventScroll: true });
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeProject();
    }
  });

  window.addEventListener('resize', () => {
    if (modal.classList.contains('is-open')) {
      setScrollbarWidth();
    }
  });

})();
