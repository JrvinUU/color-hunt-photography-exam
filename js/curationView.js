/**
 * Photography Color Hunt - Minimalist Square Color Cards & Student Search View
 */

window.CurationView = (function() {
  let searchQuery = '';

  function render(container, state) {
    const isTeacher = !!state.isTeacherUnlocked;
    const groups = state.groups || [];

    // Filter by student search query
    let filtered = groups;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(g => {
        const memberMatch = (g.members || []).some(m => m.toLowerCase().includes(q));
        const colorMatch = (g.color || '').toLowerCase().includes(q);
        const catMatch = (g.category || '').toLowerCase().includes(q);
        return memberMatch || colorMatch || catMatch;
      });
    }

    container.innerHTML = `
      <div class="minimal-wrapper">
        <!-- Minimal Hero Header -->
        <div class="curation-hero">
          <span class="curation-subhead">PT + Practical Exam</span>
          <h1 class="curation-title">Photography Color Hunt</h1>
          <div class="curation-course-code">Digital Photography &bull; MA 3101 &nbsp; MA 3102</div>
        </div>

        <!-- Student Search Box -->
        <div class="search-container">
          <svg class="search-magnifier-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="student-search-box" class="student-search-input" placeholder="Type your name to search..." value="${searchQuery}" autofocus>
          ${searchQuery ? `<button id="clear-search-btn" class="search-clear-btn" title="Clear Search">&times;</button>` : ''}
        </div>

        <!-- Instructor Floating Toolbar (Visible only when unlocked via cog) -->
        ${isTeacher ? `
          <div class="admin-toolbar">
            <div class="admin-toolbar-status">
              <span class="admin-dot"></span>
              <strong>Instructor Mode</strong>
              <span style="color: var(--text-muted); font-size: 0.8rem;">(${groups.length} entries)</span>
            </div>
            <div class="admin-actions">
              <button id="btn-admin-add" class="btn btn-sm btn-primary">+ Add 3 Students</button>
              <button id="btn-admin-paste" class="btn btn-sm btn-secondary">Paste List</button>
              <button id="btn-admin-balance" class="btn btn-sm btn-accent" title="Equally distribute 7 Colors & 2 Categories">Auto-Balance</button>
              <button id="btn-admin-export" class="btn btn-sm btn-secondary">Export CSV</button>
              ${groups.length === 0 ? `
                <button id="btn-admin-sample" class="btn btn-sm btn-secondary">Load Sample</button>
              ` : `
                <button id="btn-admin-clear" class="btn btn-sm btn-danger">Clear</button>
              `}
            </div>
          </div>
        ` : ''}

        <!-- Square Cards Grid -->
        <div class="cards-grid">
          ${renderSquareCards(filtered, isTeacher)}
        </div>
      </div>
    `;

    bindEvents(container, state);
  }

  function renderSquareCards(groups, isTeacher) {
    if (!groups || groups.length === 0) {
      return `
        <div class="empty-state">
          <h3 style="font-size: 1.1rem; font-weight: 700;">No assignments found</h3>
          <p style="margin-top: 6px; color: var(--text-muted); font-size: 0.88rem;">
            ${isTeacher ? 'Click "+ Add 3 Students" or "Paste List" above to enter your class roster.' : 'Type your name above to look up your assigned color and category.'}
          </p>
        </div>
      `;
    }

    return groups.map(g => {
      const color = g.color || 'Red';
      const category = g.category || 'Natural';
      const section = g.section || 'MA 3101';
      const members = g.members || [];

      return `
        <div class="square-color-card" data-color="${color}" data-id="${g.id}">
          <!-- Card Top: Color & Category Title -->
          <div class="card-top-row">
            <div class="card-color-category-badge">
              <div class="card-color-title">
                <span class="card-color-dot"></span>
                <span>${color.toUpperCase()}</span>
              </div>
              <span class="card-category-sub">${category === 'Natural' ? '🌿 NATURAL' : '💡 ARTIFICIAL'}</span>
            </div>

            ${isTeacher ? `
              <div class="card-admin-actions">
                <button class="btn-card-ctrl btn-edit-entry" data-id="${g.id}" title="Edit Names / Color">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
                <button class="btn-card-ctrl btn-delete-entry" data-id="${g.id}" title="Delete">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF453A" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Card Center: The 3 Student Names -->
          <div class="card-members-container">
            ${members.map(m => `
              <div class="card-member-name">
                <span class="card-member-bullet"></span>
                <span>${m}</span>
              </div>
            `).join('')}
          </div>

          <!-- Card Bottom: Section Code -->
          <div class="card-bottom-row">
            <span>${section}</span>
            <span style="opacity: 0.6;">Digital Photography</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function bindEvents(container, state) {
    // Search input
    const searchInput = container.querySelector('#student-search-box');
    if (searchInput) {
      // Keep cursor position
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const grid = container.querySelector('.cards-grid');
        let filtered = state.groups;
        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(g => {
            const memberMatch = (g.members || []).some(m => m.toLowerCase().includes(q));
            const colorMatch = (g.color || '').toLowerCase().includes(q);
            const catMatch = (g.category || '').toLowerCase().includes(q);
            return memberMatch || colorMatch || catMatch;
          });
        }
        grid.innerHTML = renderSquareCards(filtered, state.isTeacherUnlocked);
        bindCardActions(container, state);
      });
    }

    // Clear search
    const clearBtn = container.querySelector('#clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchQuery = '';
        render(container, state);
      });
    }

    // Admin: Add
    const addBtn = container.querySelector('#btn-admin-add');
    if (addBtn) {
      addBtn.addEventListener('click', () => showAddEditModal(null, state));
    }

    // Admin: Paste
    const pasteBtn = container.querySelector('#btn-admin-paste');
    if (pasteBtn) {
      pasteBtn.addEventListener('click', () => showPasteModal(state));
    }

    // Admin: Balance Colors
    const balanceBtn = container.querySelector('#btn-admin-balance');
    if (balanceBtn) {
      balanceBtn.addEventListener('click', () => {
        if (state.groups.length === 0) {
          App.showToast('Add student entries first', 'error');
          return;
        }
        state.groups = ColorHuntDistribution.distributeColorsBalanced(state.groups, false);
        App.saveState();
        App.showToast('Equally balanced 7 Colors & 2 Categories across all entries!', 'success');
        render(container, state);
      });
    }

    // Admin: Export CSV
    const exportBtn = container.querySelector('#btn-admin-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => exportCSV(state));
    }

    // Admin: Load Sample
    const sampleBtn = container.querySelector('#btn-admin-sample');
    if (sampleBtn) {
      sampleBtn.addEventListener('click', () => {
        state.groups = JSON.parse(JSON.stringify(ColorHuntMockData.INITIAL_GROUPS));
        App.saveState();
        App.showToast('Loaded sample student roster', 'success');
        render(container, state);
      });
    }

    // Admin: Clear
    const clearAdminBtn = container.querySelector('#btn-admin-clear');
    if (clearAdminBtn) {
      clearAdminBtn.addEventListener('click', () => {
        if (confirm('Clear all entries from the roster?')) {
          state.groups = [];
          App.saveState();
          App.showToast('Cleared roster', 'info');
          render(container, state);
        }
      });
    }

    bindCardActions(container, state);
  }

  function bindCardActions(container, state) {
    // Edit
    container.querySelectorAll('.btn-edit-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const entry = state.groups.find(g => g.id === id);
        if (entry) showAddEditModal(entry, state);
      });
    });

    // Delete
    container.querySelectorAll('.btn-delete-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const entry = state.groups.find(g => g.id === id);
        if (entry && confirm(`Delete this card? (${(entry.members || []).join(', ')})`)) {
          state.groups = state.groups.filter(g => g.id !== id);
          App.saveState();
          App.showToast('Deleted entry', 'info');
          render(container, state);
        }
      });
    });
  }

  function showAddEditModal(entry, state) {
    const isNew = !entry;
    const curSec = entry?.section || 'MA 3101';
    const m1 = entry?.members?.[0] || '';
    const m2 = entry?.members?.[1] || '';
    const m3 = entry?.members?.[2] || '';
    const curColor = entry?.color || 'Red';
    const curCat = entry?.category || 'Natural';

    const modalHtml = `
      <div class="modal-backdrop active" id="modal-card-edit">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">${isNew ? 'Add 3 Students' : 'Edit Entry'}</h3>
            <button class="modal-close-btn" id="modal-close-x">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Section</label>
              <select id="modal-sec-select" class="form-input">
                <option value="MA 3101" ${curSec === 'MA 3101' ? 'selected' : ''}>MA 3101</option>
                <option value="MA 3102" ${curSec === 'MA 3102' ? 'selected' : ''}>MA 3102</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Student 1 Name</label>
              <input type="text" id="modal-m1" class="form-input" value="${m1}" placeholder="Full Name">
            </div>
            <div class="form-group">
              <label class="form-label">Student 2 Name</label>
              <input type="text" id="modal-m2" class="form-input" value="${m2}" placeholder="Full Name">
            </div>
            <div class="form-group">
              <label class="form-label">Student 3 Name</label>
              <input type="text" id="modal-m3" class="form-input" value="${m3}" placeholder="Full Name">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px;">
              <div class="form-group">
                <label class="form-label">Assigned Color</label>
                <select id="modal-color-select" class="form-input">
                  ${ColorHuntDistribution.COLORS.map(c => `<option value="${c}" ${curColor === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select id="modal-cat-select" class="form-input">
                  <option value="Natural" ${curCat === 'Natural' ? 'selected' : ''}>🌿 Natural</option>
                  <option value="Artificial" ${curCat === 'Artificial' ? 'selected' : ''}>💡 Artificial</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button id="modal-cancel-btn" class="btn btn-secondary">Cancel</button>
            <button id="modal-save-btn" class="btn btn-primary">Save Entry</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('modal-card-edit');
    const closeModal = () => modal.remove();

    modal.querySelector('#modal-close-x').addEventListener('click', closeModal);
    modal.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);

    modal.querySelector('#modal-save-btn').addEventListener('click', () => {
      const sec = modal.querySelector('#modal-sec-select').value;
      const mem1 = modal.querySelector('#modal-m1').value.trim();
      const mem2 = modal.querySelector('#modal-m2').value.trim();
      const mem3 = modal.querySelector('#modal-m3').value.trim();
      const color = modal.querySelector('#modal-color-select').value;
      const category = modal.querySelector('#modal-cat-select').value;

      const members = [mem1, mem2, mem3].filter(Boolean);
      if (members.length === 0) {
        App.showToast('Please enter at least one student name', 'error');
        return;
      }

      if (isNew) {
        state.groups.push({
          id: `entry-${Date.now()}`,
          section: sec,
          members,
          color,
          category,
          locked: true,
          status: 'pending'
        });
        App.showToast('Added new student entry', 'success');
      } else {
        entry.section = sec;
        entry.members = members;
        entry.color = color;
        entry.category = category;
        App.showToast('Updated entry', 'success');
      }

      App.saveState();
      closeModal();
      App.render();
    });
  }

  function showPasteModal(state) {
    const modalHtml = `
      <div class="modal-backdrop active" id="modal-paste-list">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Paste Student List</h3>
            <button class="modal-close-btn" id="modal-close-x">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Section</label>
              <select id="paste-sec-select" class="form-input">
                <option value="MA 3101">MA 3101</option>
                <option value="MA 3102">MA 3102</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Student Names (Paste one per line, or 3 per group)</label>
              <textarea id="paste-text" class="form-textarea" style="min-height: 180px;" placeholder="Marcus Vance&#10;Elena Rostova&#10;Chloe Tanaka&#10;Derek Zhang&#10;Amara Okafor..."></textarea>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
                Every 3 names will be created as a card with balanced Color and Category.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button id="modal-cancel-btn" class="btn btn-secondary">Cancel</button>
            <button id="modal-submit-paste" class="btn btn-primary">Process & Create</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('modal-paste-list');
    const closeModal = () => modal.remove();

    modal.querySelector('#modal-close-x').addEventListener('click', closeModal);
    modal.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);

    modal.querySelector('#modal-submit-paste').addEventListener('click', () => {
      const sec = modal.querySelector('#paste-sec-select').value;
      const text = modal.querySelector('#paste-text').value.trim();

      if (!text) {
        App.showToast('Please paste names', 'error');
        return;
      }

      const raw = text.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
      if (raw.length === 0) {
        App.showToast('No valid names found', 'error');
        return;
      }

      const newEntries = [];
      for (let i = 0; i < raw.length; i += 3) {
        newEntries.push({
          id: `entry-${Date.now()}-${i}`,
          section: sec,
          members: raw.slice(i, i + 3),
          color: null,
          category: null,
          locked: false,
          status: 'pending'
        });
      }

      const all = [...state.groups, ...newEntries];
      state.groups = ColorHuntDistribution.distributeColorsBalanced(all, true);

      App.saveState();
      App.showToast(`Added ${newEntries.length} new entries with balanced colors!`, 'success');
      closeModal();
      App.render();
    });
  }

  function exportCSV(state) {
    let csv = 'Section,Student 1,Student 2,Student 3,Assigned Color,Category\n';
    (state.groups || []).forEach(g => {
      const m1 = g.members?.[0] || '';
      const m2 = g.members?.[1] || '';
      const m3 = g.members?.[2] || '';
      csv += `"${g.section || ''}","${m1}","${m2}","${m3}","${g.color || ''}","${g.category || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Photography_Color_Hunt_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    App.showToast('Exported CSV', 'success');
  }

  return {
    render
  };
})();
