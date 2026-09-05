/**
 * Photography Color Hunt - Document Sorter Gallery View Controller
 * Tactile Colored Filing Folders with Dynamic Spreading Animations
 * Works sorted cleanly by Group Name.
 */

window.GalleryView = (function () {
  const COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'];

  const COLOR_ICONS = {
    Red: '🔴',
    Orange: '🟠',
    Yellow: '🟡',
    Green: '🟢',
    Blue: '🔵',
    Purple: '🟣',
    Pink: '🌸'
  };

  let openFolders = new Set(['Purple', 'Red']); // Default spread first folders
  let activeSection = 'ALL';
  let searchQuery = '';
  let currentLightboxList = [];
  let currentLightboxIndex = 0;

  function render(container, state) {
    const allGroups = state.groups || [];

    // Filter by Section & Search Query
    let filteredGroups = allGroups;
    if (activeSection !== 'ALL') {
      filteredGroups = filteredGroups.filter(g => g.section === activeSection);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filteredGroups = filteredGroups.filter(g => {
        const memberMatch = (g.members || []).some(m => m.toLowerCase().includes(q));
        const groupMatch = (g.groupName || `group ${g.groupNumber}`).toLowerCase().includes(q);
        const sectionMatch = (g.section || '').toLowerCase().includes(q);
        const colorMatch = (g.color || '').toLowerCase().includes(q);
        const catMatch = (g.category || '').toLowerCase().includes(q);
        const sub = window.ColorHuntSubmissions ? ColorHuntSubmissions.getSubmission(g) : null;
        const titleMatch = (sub?.title || '').toLowerCase().includes(q);
        const metaMatch = (sub?.cameraMetadata || '').toLowerCase().includes(q);
        return memberMatch || groupMatch || sectionMatch || colorMatch || catMatch || titleMatch || metaMatch;
      });

      // If searching, auto-spread any folder that has matches
      COLORS.forEach(c => {
        const count = filteredGroups.filter(g => g.color === c).length;
        if (count > 0) openFolders.add(c);
      });
    }

    container.innerHTML = `
      <div class="gallery-wrapper">
        <!-- Unified Hero Header matching Curation View -->
        <div class="curation-hero">
          <div class="header-badges-row">
            <span class="curation-subhead">Exhibition: PT + Practical Exam</span>
          </div>
          <h1 class="curation-title">Super Color Hunt</h1>
          <div class="curation-course-code">STI College Caloocan &bull; 1st Semester 2026-2027</div>
        </div>

        <!-- View Switcher Tabs (Color Roster vs Gallery Exhibition) -->
        <div class="view-navigation-bar">
          <div class="view-tabs-pill-container">
            <button id="btn-tab-curation" class="view-nav-tab-btn" title="View Group Assignments & Roster">
              <span class="view-tab-icon">📋</span>
              <span>Color Roster</span>
              <span class="view-tab-count">${allGroups.length}</span>
            </button>
            <button id="btn-tab-gallery" class="view-nav-tab-btn active" title="View Document Sorter Exhibition">
              <span class="view-tab-icon">📁</span>
              <span>Gallery Sorter</span>
              <span class="view-tab-count">${filteredGroups.length}</span>
            </button>
          </div>
        </div>

        <!-- Sorter Controls Panel: Search & Section Filters -->
        <div class="sorter-controls-panel">
          <div class="search-container" style="max-width: 100%;">
            <svg class="search-magnifier-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="gallery-search-box" class="student-search-input" placeholder="Search student name, group (e.g. Group 1), or camera gear..." value="${searchQuery}">
            ${searchQuery ? `<button id="gallery-clear-search" class="search-clear-btn" title="Clear Search">&times;</button>` : ''}
          </div>

          <div class="sorter-filter-row">
            <!-- Section Tabs -->
            <div class="sorter-section-filters">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Section:</span>
              <button class="sorter-filter-pill ${activeSection === 'ALL' ? 'active' : ''}" data-section="ALL">All Sections (${allGroups.length})</button>
              <button class="sorter-filter-pill ${activeSection === 'MA 3101' ? 'active' : ''}" data-section="MA 3101">MA 3101</button>
              <button class="sorter-filter-pill ${activeSection === 'MA 3102' ? 'active' : ''}" data-section="MA 3102">MA 3102</button>
            </div>

            <!-- Quick Sorter Actions -->
            <div class="sorter-actions-row">
              <button id="btn-spread-all" class="btn-sorter-action" title="Spread Open All 7 Color Folders">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
                Spread All
              </button>
              <button id="btn-fold-all" class="btn-sorter-action" title="Fold All Folders">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
                Fold All
              </button>
            </div>
          </div>
        </div>

        <!-- Document Sorter Rack: 7 Distinct Colored Folders -->
        <div class="document-sorter-rack">
          ${renderColorFolders(filteredGroups)}
        </div>
      </div>

      <!-- Lightbox & Fullscreen Presentation Modal -->
      <div id="gallery-lightbox" class="lightbox-modal"></div>
    `;

    bindEvents(container, state);
  }

  function renderColorFolders(filteredGroups) {
    return COLORS.map(color => {
      // Get all groups for this color
      let colorGroups = filteredGroups.filter(g => g.color === color);

      // Sort works strictly by Group Name so elements appear in correct order
      colorGroups.sort((a, b) => {
        const secCompare = (a.section || '').localeCompare(b.section || '');
        if (secCompare !== 0) return secCompare;
        const nameA = a.groupName || `Group ${a.groupNumber || 0}`;
        const nameB = b.groupName || `Group ${b.groupNumber || 0}`;
        return nameA.localeCompare(nameB, undefined, { numeric: true });
      });

      const isOpen = openFolders.has(color);
      const naturalCount = colorGroups.filter(g => g.category === 'Natural').length;
      const artificialCount = colorGroups.filter(g => g.category === 'Artificial').length;
      const icon = COLOR_ICONS[color] || '📁';

      return `
        <div class="color-folder ${isOpen ? 'open' : ''}" data-color="${color}" id="folder-${color.toLowerCase()}">
          <!-- Folder Header Jacket / Filing Tab (Click to Spread/Fold) -->
          <div class="folder-header-jacket" data-color="${color}">
            <div class="folder-tab-badge">
              <div class="folder-icon-box">
                ${icon}
              </div>
              <div class="folder-title-info">
                <div class="folder-name-row">
                  <span class="folder-name">${color.toUpperCase()} FOLDER</span>
                  <span class="folder-count-pill">${colorGroups.length} Works</span>
                </div>
                <div class="folder-subtext">
                  <span>🌿 ${naturalCount} Natural</span>
                  <span>&bull;</span>
                  <span>💡 ${artificialCount} Artificial</span>
                </div>
              </div>
            </div>

            <div class="folder-toggle-control">
              <span class="folder-spread-hint">${isOpen ? 'Click to fold' : 'Click to spread folder'}</span>
              <div class="folder-chevron-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <!-- Folder Spread Stage (Student Works Documents) -->
          <div class="folder-spread-content">
            ${colorGroups.length === 0 ? `
              <div class="folder-empty-state">
                <p>No student submissions in ${color} matching the current filters.</p>
              </div>
            ` : `
              <div class="folder-works-grid">
                ${colorGroups.map((g, idx) => renderStudentDocument(g, idx)).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderStudentDocument(group, idx) {
    const sub = window.ColorHuntSubmissions
      ? ColorHuntSubmissions.getSubmission(group)
      : {
        title: `${group.groupName || 'Group'} Submission`,
        slideUrl: `submissions/${group.id}.jpg`,
        fallbackUrl: '',
        artistStatement: 'Student photography assignment.',
        cameraMetadata: 'Digital Camera',
        palette: ['#BF5AF2']
      };

    const groupName = group.groupName || `Group ${group.groupNumber || 1}`;
    const members = group.members || [];
    const section = group.section || 'MA 3101';
    const category = group.category || 'Natural';

    return `
      <div class="student-work-document" data-group-id="${group.id}" style="animation-delay: ${idx * 40}ms;">
        <!-- Card Top Bar: Group Name & Category -->
        <div class="document-card-header">
          <div class="document-group-badge">
            <span class="document-group-dot"></span>
            <span>${groupName} &bull; ${section}</span>
          </div>
          <span class="document-category-badge">
            ${category === 'Natural' ? '🌿 Natural' : '💡 Artificial'}
          </span>
        </div>

        <!-- Document Photo Preview Stage -->
        <div class="document-photo-stage">
          <img 
            src="${sub.slideUrl}" 
            alt="${sub.title}" 
            class="document-photo-img" 
            loading="lazy" 
            onerror="if(this.src !== '${sub.fallbackUrl}') { this.src = '${sub.fallbackUrl}'; }"
          >
          <div class="document-photo-overlay">
            <div class="document-submission-title">${sub.title}</div>
          </div>
        </div>

        <!-- Document Body: Student Members -->
        <div class="document-card-body">
          <div class="document-members-list">
            ${members.map(m => `
              <div class="document-member-row">
                <span class="document-member-bullet"></span>
                <span>${m}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Document Card Footer -->
        <div class="document-card-footer">
          <span title="${sub.cameraMetadata}">${sub.cameraMetadata ? sub.cameraMetadata.split('•')[0] : 'Digital Camera'}</span>
          <span class="document-inspect-link">Inspect Slide &rarr;</span>
        </div>
      </div>
    `;
  }

  function bindEvents(container, state) {
    // Switch to Curation View
    const curationTabBtn = container.querySelector('#btn-tab-curation');
    if (curationTabBtn) {
      curationTabBtn.addEventListener('click', () => {
        App.switchView('curation');
      });
    }

    // Toggle Folders Open / Spread
    container.querySelectorAll('.folder-header-jacket').forEach(header => {
      header.addEventListener('click', (e) => {
        const color = e.currentTarget.dataset.color;
        if (openFolders.has(color)) {
          openFolders.delete(color);
        } else {
          openFolders.add(color);
        }
        render(container, state);
      });
    });

    // Spread All Folders
    const spreadAllBtn = container.querySelector('#btn-spread-all');
    if (spreadAllBtn) {
      spreadAllBtn.addEventListener('click', () => {
        COLORS.forEach(c => openFolders.add(c));
        render(container, state);
      });
    }

    // Fold All Folders
    const foldAllBtn = container.querySelector('#btn-fold-all');
    if (foldAllBtn) {
      foldAllBtn.addEventListener('click', () => {
        openFolders.clear();
        render(container, state);
      });
    }

    // Section Filters
    container.querySelectorAll('.sorter-filter-pill[data-section]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeSection = e.currentTarget.dataset.section;
        render(container, state);
      });
    });

    // Search Input
    const searchInput = container.querySelector('#gallery-search-box');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render(container, state);
        // Retain focus and cursor at end of input
        const updatedInput = container.querySelector('#gallery-search-box');
        if (updatedInput) {
          updatedInput.focus();
          const val = updatedInput.value;
          updatedInput.setSelectionRange(val.length, val.length);
        }
      });
    }

    // Clear Search Button
    const clearSearchBtn = container.querySelector('#gallery-clear-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchQuery = '';
        render(container, state);
      });
    }

    // Click Document to Open Lightbox
    container.querySelectorAll('.student-work-document').forEach(card => {
      card.addEventListener('click', (e) => {
        const groupId = e.currentTarget.dataset.groupId;
        openDocumentLightbox(groupId, state);
      });
    });
  }

  function openDocumentLightbox(groupId, state) {
    // Build active list of all available groups sorted by section & group name
    let list = [...(state.groups || [])];
    if (activeSection !== 'ALL') {
      list = list.filter(g => g.section === activeSection);
    }
    list.sort((a, b) => {
      const secCompare = (a.section || '').localeCompare(b.section || '');
      if (secCompare !== 0) return secCompare;
      const nameA = a.groupName || `Group ${a.groupNumber || 0}`;
      const nameB = b.groupName || `Group ${b.groupNumber || 0}`;
      return nameA.localeCompare(nameB, undefined, { numeric: true });
    });

    currentLightboxList = list;
    const index = list.findIndex(g => g.id === groupId);
    currentLightboxIndex = index >= 0 ? index : 0;
    renderLightboxModal();
  }

  function renderLightboxModal() {
    if (!currentLightboxList || currentLightboxList.length === 0) return;
    const group = currentLightboxList[currentLightboxIndex];
    const sub = window.ColorHuntSubmissions ? ColorHuntSubmissions.getSubmission(group) : {};
    const color = group.color || 'Red';
    const groupName = group.groupName || `Group ${group.groupNumber || 1}`;

    const modal = document.getElementById('gallery-lightbox');
    if (!modal) return;

    modal.innerHTML = `
      <!-- Top Bar -->
      <div class="lightbox-topbar">
        <div class="lightbox-title-group">
          <span class="folder-count-pill" style="font-size: 0.85rem; padding: 4px 12px; background: rgba(0,0,0,0.5); border: 1.5px solid ${getColorHex(color)}; color: #FFFFFF;">
            ${color.toUpperCase()} &bull; ${group.category}
          </span>
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #FFFFFF; line-height: 1.2;">
              ${sub.title || `${groupName} Exhibition`}
            </h2>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 3px;">
              ${group.section} &bull; ${groupName} &bull; ${(group.members || []).join(' &bull; ')}
            </div>
          </div>
        </div>

        <div class="lightbox-controls">
          <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-muted);">
            ${currentLightboxIndex + 1} / ${currentLightboxList.length}
          </span>
          <button id="lightbox-fullscreen-btn" class="btn btn-sm btn-secondary" title="Toggle Fullscreen">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            Fullscreen
          </button>
          <button id="lightbox-close-btn" class="modal-close-btn" style="padding: 6px;" title="Close (Escape)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Main Stage -->
      <div class="lightbox-main-stage">
        <button id="lightbox-prev-btn" class="lightbox-nav-btn lightbox-nav-prev" title="Previous Work (Left Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div class="lightbox-slide-wrapper" style="border-color: ${getColorHex(color)}60;">
          <img 
            src="${sub.slideUrl}" 
            alt="${sub.title}"
            onerror="if(this.src !== '${sub.fallbackUrl}') { this.src = '${sub.fallbackUrl}'; }"
          >
        </div>

        <button id="lightbox-next-btn" class="lightbox-nav-btn lightbox-nav-next" title="Next Work (Right Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Bottom Details Drawer -->
      <div class="lightbox-bottom-drawer">
        <div class="drawer-grid">
          <div>
            <div class="drawer-statement-title">Student Artist Statement & Technique</div>
            <p class="drawer-statement-text">${sub.artistStatement || 'No artist statement provided.'}</p>
          </div>

          <div>
            <div class="drawer-statement-title">Camera & Exposure Metadata</div>
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: #FFFFFF; background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); line-height: 1.5;">
              ${sub.cameraMetadata || 'Digital Camera Settings: N/A'}
            </div>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-muted);">
              Assigned: ${color} (${group.category}) &bull; Local File: <code>${sub.fileName || 'N/A'}</code>
            </div>
          </div>

          <div>
            <div class="drawer-statement-title">Color Palette</div>
            <div class="palette-chips-row">
              ${(sub.palette || [getColorHex(color)]).map(hex => `
                <div class="color-swatch-chip" style="background: ${hex};" title="Click to copy ${hex}" onclick="navigator.clipboard.writeText('${hex}'); App.showToast('Copied ${hex}', 'info');"></div>
              `).join('')}
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; color: var(--text-muted);">Click swatch to copy HEX</div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Bind navigation buttons
    modal.querySelector('#lightbox-close-btn').addEventListener('click', closeLightbox);
    modal.querySelector('#lightbox-prev-btn').addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length;
      renderLightboxModal();
    });
    modal.querySelector('#lightbox-next-btn').addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxList.length;
      renderLightboxModal();
    });

    // Fullscreen toggle
    modal.querySelector('#lightbox-fullscreen-btn').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });

    window.addEventListener('keydown', handleKeyNav);
  }

  function handleKeyNav(e) {
    const modal = document.getElementById('gallery-lightbox');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length;
      renderLightboxModal();
    } else if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxList.length;
      renderLightboxModal();
    }
  }

  function closeLightbox() {
    const modal = document.getElementById('gallery-lightbox');
    if (modal) modal.classList.remove('active');
    window.removeEventListener('keydown', handleKeyNav);
  }

  function getColorHex(color) {
    const map = {
      Red: '#FF3B30',
      Orange: '#FF9F0A',
      Yellow: '#FFD60A',
      Green: '#30D158',
      Blue: '#0A84FF',
      Purple: '#BF5AF2',
      Pink: '#FF375F'
    };
    return map[color] || '#BF5AF2';
  }

  return {
    render
  };
})();
