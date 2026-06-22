/* ============================================
   AchieveResumeCraft — App Logic
   ============================================ */

// ── STATE ──
const state = {
  identity: {
    realName: '', gamerTag: '', platform: '', location: '',
    startYear: '', role: '', bio: '', discord: '', stream: '',
    avatarDataUrl: null
  },
  games: [],
  stats: [],
  achievements: [],
  tournaments: [],
  screenshots: [],   // [{dataUrl, caption}]
  template: 'classic'
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStepNav();
  initIdentityListeners();
  initAvatarUpload();
  initAddButtons();
  initDropZone();
  initScreenshotInput();
  initTemplateButtons();
  initPreviewBtn();
  initPrintBtn();
  loadFromStorage();
});

// ── THEME ──
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('arc-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  btn.textContent = saved === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const curr = html.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('arc-theme', next);
  });
}

// ── STEP NAV ──
function initStepNav() {
  document.querySelectorAll('.step-item').forEach(btn => {
    btn.addEventListener('click', () => goStep(btn.dataset.step));
  });
}

function goStep(step) {
  // Deactivate all
  document.querySelectorAll('.step-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));

  // Activate target
  const btn = document.querySelector(`.step-item[data-step="${step}"]`);
  const section = document.getElementById(`section-${step}`);
  if (btn) btn.classList.add('active');
  if (section) section.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── IDENTITY LISTENERS ──
function initIdentityListeners() {
  const fields = ['realName','gamerTag','platform','location','startYear','role','bio','discord','stream'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      state.identity[id] = el.value;
      autosave();
      updateStepDots();
    });
  });
}

// ── AVATAR ──
function initAvatarUpload() {
  const input = document.getElementById('avatarInput');
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.identity.avatarDataUrl = ev.target.result;
      renderAvatarPreview(ev.target.result);
      autosave();
    };
    reader.readAsDataURL(file);
  });
}

function renderAvatarPreview(src) {
  const prev = document.getElementById('avatarPreview');
  prev.innerHTML = `<img src="${src}" alt="Avatar" />`;
}

// ── ADD BUTTONS ──
function initAddButtons() {
  document.getElementById('addGameBtn').addEventListener('click', addGame);
  document.getElementById('addStatBtn').addEventListener('click', addStat);
  document.getElementById('addAchBtn').addEventListener('click', addAchievement);
  document.getElementById('addTourBtn').addEventListener('click', addTournament);
}

// ── GAMES ──
function addGame() {
  const name = val('gameNameInput');
  if (!name) return showToast('⚠️ Nama game wajib diisi');
  const game = {
    id: Date.now(),
    name,
    genre: val('gameGenreInput'),
    platform: val('gamePlatInput'),
    hours: val('gameHoursInput'),
    status: val('gameStatusInput'),
    year: val('gameYearInput'),
  };
  state.games.push(game);
  clearInputs(['gameNameInput','gameGenreInput','gamePlatInput','gameHoursInput','gameYearInput']);
  document.getElementById('gameStatusInput').value = 'Aktif';
  renderGames();
  autosave();
  showToast('🕹 Game ditambahkan!');
}

function renderGames() {
  const list = document.getElementById('gamesList');
  if (!state.games.length) {
    list.innerHTML = `<div class="empty-state"><span>🕹</span><p>Belum ada game ditambahkan</p></div>`;
    return;
  }
  list.innerHTML = state.games.map((g,i) => `
    <div class="item-card" draggable="true" data-type="games" data-index="${i}">
      <span class="item-drag">⠿</span>
      <div class="item-body">
        <div class="item-title">${g.name}</div>
        <div class="item-sub">
          ${g.genre ? `<span class="item-tag">${g.genre}</span>` : ''}
          ${g.platform ? `<span class="item-tag teal">${g.platform}</span>` : ''}
          ${g.hours ? `<span class="item-tag">${g.hours}</span>` : ''}
          ${g.year ? `<span class="item-tag">${g.year}</span>` : ''}
          <span class="item-tag ${g.status==='Aktif'?'teal':g.status==='Semi-Aktif'?'gold':''}">${g.status}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="item-btn" onclick="removeItem('games',${i})">✕</button>
      </div>
    </div>
  `).join('');
  initDragDrop('games');
  updateStepDots();
}

// ── STATS ──
function addStat() {
  const game = val('statGameInput');
  if (!game) return showToast('⚠️ Nama game wajib diisi');
  const stat = {
    id: Date.now(),
    game,
    rank: val('statRankInput'),
    season: val('statSeasonInput'),
    wr: val('statWRInput'),
    kd: val('statKDInput'),
    other: val('statOtherInput'),
  };
  state.stats.push(stat);
  clearInputs(['statGameInput','statRankInput','statSeasonInput','statWRInput','statKDInput','statOtherInput']);
  renderStats();
  autosave();
  showToast('📊 Statistik ditambahkan!');
}

function renderStats() {
  const list = document.getElementById('statsList');
  if (!state.stats.length) {
    list.innerHTML = `<div class="empty-state"><span>📊</span><p>Belum ada statistik ditambahkan</p></div>`;
    return;
  }
  list.innerHTML = state.stats.map((s,i) => `
    <div class="item-card" draggable="true" data-type="stats" data-index="${i}">
      <span class="item-drag">⠿</span>
      <div class="item-body">
        <div class="item-title">${s.game} ${s.season ? `<span style="font-size:0.8rem;color:var(--text-dim);">— ${s.season}</span>` : ''}</div>
        <div class="item-sub">
          ${s.rank ? `<span class="item-tag gold">🏅 ${s.rank}</span>` : ''}
          ${s.wr ? `<span class="item-tag teal">WR ${s.wr}</span>` : ''}
          ${s.kd ? `<span class="item-tag">K/D ${s.kd}</span>` : ''}
          ${s.other ? `<span class="item-tag">${s.other}</span>` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button class="item-btn" onclick="removeItem('stats',${i})">✕</button>
      </div>
    </div>
  `).join('');
  initDragDrop('stats');
  updateStepDots();
}

// ── ACHIEVEMENTS ──
function addAchievement() {
  const title = val('achTitleInput');
  if (!title) return showToast('⚠️ Judul achievement wajib diisi');
  const ach = {
    id: Date.now(),
    title,
    game: val('achGameInput'),
    date: val('achDateInput'),
    level: val('achLevelInput'),
    desc: val('achDescInput'),
  };
  state.achievements.push(ach);
  clearInputs(['achTitleInput','achGameInput','achDateInput','achDescInput']);
  document.getElementById('achLevelInput').value = 'Personal';
  renderAchievements();
  autosave();
  showToast('🏆 Achievement ditambahkan!');
}

function renderAchievements() {
  const list = document.getElementById('achievementsList');
  if (!state.achievements.length) {
    list.innerHTML = `<div class="empty-state"><span>🏆</span><p>Belum ada achievement ditambahkan</p></div>`;
    return;
  }
  list.innerHTML = state.achievements.map((a,i) => `
    <div class="item-card" draggable="true" data-type="achievements" data-index="${i}">
      <span class="item-drag">⠿</span>
      <div class="item-body">
        <div class="item-title">${a.title} <span class="item-tag ${a.level==='Internasional'?'red':a.level==='Nasional'?'gold':a.level==='Lokal'?'teal':''}">${a.level}</span></div>
        <div class="item-sub">
          ${a.game ? `<span class="item-tag">${a.game}</span>` : ''}
          ${a.date ? `<span class="item-tag">${a.date}</span>` : ''}
        </div>
        ${a.desc ? `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:4px;">${a.desc}</div>` : ''}
      </div>
      <div class="item-actions">
        <button class="item-btn" onclick="removeItem('achievements',${i})">✕</button>
      </div>
    </div>
  `).join('');
  initDragDrop('achievements');
  updateStepDots();
}

// ── TOURNAMENTS ──
function addTournament() {
  const name = val('tourNameInput');
  if (!name) return showToast('⚠️ Nama turnamen wajib diisi');
  const tour = {
    id: Date.now(),
    name,
    game: val('tourGameInput'),
    result: val('tourResultInput'),
    scale: val('tourScaleInput'),
    date: val('tourDateInput'),
    team: val('tourTeamInput'),
    prize: val('tourPrizeInput'),
    role: val('tourRoleInput'),
  };
  state.tournaments.push(tour);
  clearInputs(['tourNameInput','tourGameInput','tourResultInput','tourDateInput','tourTeamInput','tourPrizeInput','tourRoleInput']);
  renderTournaments();
  autosave();
  showToast('⚔️ Turnamen ditambahkan!');
}

function renderTournaments() {
  const list = document.getElementById('tournamentsList');
  if (!state.tournaments.length) {
    list.innerHTML = `<div class="empty-state"><span>⚔️</span><p>Belum ada turnamen ditambahkan</p></div>`;
    return;
  }
  list.innerHTML = state.tournaments.map((t,i) => `
    <div class="item-card" draggable="true" data-type="tournaments" data-index="${i}">
      <span class="item-drag">⠿</span>
      <div class="item-body">
        <div class="item-title">${t.name}</div>
        <div class="item-sub">
          ${t.game ? `<span class="item-tag">${t.game}</span>` : ''}
          ${t.result ? `<span class="item-tag gold">🥇 ${t.result}</span>` : ''}
          ${t.scale ? `<span class="item-tag">${t.scale}</span>` : ''}
          ${t.date ? `<span class="item-tag">${t.date}</span>` : ''}
          ${t.prize ? `<span class="item-tag teal">${t.prize}</span>` : ''}
        </div>
        ${t.team ? `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:4px;">Tim: ${t.team} ${t.role ? `· ${t.role}` : ''}</div>` : ''}
      </div>
      <div class="item-actions">
        <button class="item-btn" onclick="removeItem('tournaments',${i})">✕</button>
      </div>
    </div>
  `).join('');
  initDragDrop('tournaments');
  updateStepDots();
}

// ── REMOVE ITEM ──
function removeItem(type, index) {
  state[type].splice(index, 1);
  const renders = { games: renderGames, stats: renderStats, achievements: renderAchievements, tournaments: renderTournaments };
  renders[type]();
  autosave();
}

// ── DRAG & DROP (reorder cards) ──
let dragSrc = null;
let dragType = null;

function initDragDrop(type) {
  document.querySelectorAll(`.item-card[data-type="${type}"]`).forEach(card => {
    card.addEventListener('dragstart', e => {
      dragSrc = card;
      dragType = type;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.addEventListener('dragover', e => { e.preventDefault(); card.classList.add('drag-over'); });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', e => {
      e.preventDefault();
      card.classList.remove('drag-over');
      if (dragSrc === card || dragType !== type) return;
      const fromIdx = parseInt(dragSrc.dataset.index);
      const toIdx   = parseInt(card.dataset.index);
      const arr = state[type];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      const renders = { games: renderGames, stats: renderStats, achievements: renderAchievements, tournaments: renderTournaments };
      renders[type]();
      autosave();
    });
  });
}

// ── DROP ZONE (Screenshots) ──
function initDropZone() {
  const zone = document.getElementById('dropZone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    handleScreenshotFiles(e.dataTransfer.files);
  });
  zone.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      document.getElementById('ssInput').click();
    }
  });
}

function initScreenshotInput() {
  document.getElementById('ssInput').addEventListener('change', e => {
    handleScreenshotFiles(e.target.files);
    e.target.value = '';
  });
}

function handleScreenshotFiles(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.screenshots.push({ dataUrl: ev.target.result, caption: '' });
      renderScreenshots();
      autosave();
    };
    reader.readAsDataURL(file);
  });
  showToast(`📸 ${files.length} screenshot ditambahkan!`);
}

function renderScreenshots() {
  const grid = document.getElementById('ssGrid');
  if (!state.screenshots.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = state.screenshots.map((ss, i) => `
    <div class="ss-item">
      <img src="${ss.dataUrl}" alt="Screenshot ${i+1}" />
      <input class="ss-caption-input" type="text" placeholder="Caption (opsional)..."
        value="${ss.caption}"
        oninput="state.screenshots[${i}].caption=this.value; autosave();" />
      <button class="ss-remove" onclick="removeScreenshot(${i})">✕</button>
    </div>
  `).join('');
  updateStepDots();
}

function removeScreenshot(i) {
  state.screenshots.splice(i, 1);
  renderScreenshots();
  autosave();
}

// ── TEMPLATE ──
function initTemplateButtons() {
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.template = btn.dataset.template;
      autosave();
    });
  });
}

// ── PREVIEW ──
function initPreviewBtn() {
  document.getElementById('previewBtn').addEventListener('click', showPreview);
}

function showPreview() {
  const panel = document.getElementById('previewPanel');
  const body  = document.getElementById('previewBody');
  body.innerHTML = buildCVHtml();
  panel.classList.add('open');
}

function closePreview() {
  document.getElementById('previewPanel').classList.remove('open');
}

// ── PRINT ──
function initPrintBtn() {
  document.getElementById('printBtn').addEventListener('click', () => {
    const area = document.getElementById('cvPrintArea');
    area.innerHTML = buildCVHtml();
    window.print();
  });
}

// ── CV HTML BUILDER ──
function buildCVHtml() {
  const id = state.identity;
  const t  = state.template;

  const avatarHtml = id.avatarDataUrl
    ? `<img class="cv-avatar" src="${id.avatarDataUrl}" alt="Avatar" />`
    : `<div class="cv-avatar-placeholder">🎮</div>`;

  const headerMeta = [
    id.platform, id.location,
    id.startYear ? `Gamer sejak ${id.startYear}` : '',
    id.role
  ].filter(Boolean).join(' · ');

  const contactLine = [
    id.discord ? `Discord: ${id.discord}` : '',
    id.stream  ? `Stream: ${id.stream}` : ''
  ].filter(Boolean).join('   |   ');

  // Games section
  const gamesHtml = state.games.length ? `
    <div class="cv-section">
      <div class="cv-section-title">Game yang Dimainkan</div>
      <div class="cv-game-grid">
        ${state.games.map(g => `
          <div class="cv-game-item">
            <div class="cv-game-name">${g.name}
              <span class="cv-game-status ${g.status==='Aktif'?'active':g.status==='Semi-Aktif'?'semi':'inactive'}">${g.status}</span>
            </div>
            <div class="cv-game-meta">
              ${[g.genre, g.platform, g.hours, g.year].filter(Boolean).join(' · ')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : '';

  // Stats section
  const statsHtml = state.stats.length ? `
    <div class="cv-section">
      <div class="cv-section-title">Statistik & Rank</div>
      ${state.stats.map(s => `
        <div class="cv-stat-row">
          <span class="cv-stat-game">${s.game}</span>
          ${s.season ? `<span class="cv-stat-badge">${s.season}</span>` : ''}
          ${s.rank ? `<span class="cv-stat-badge highlight">🏅 ${s.rank}</span>` : ''}
          ${s.wr ? `<span class="cv-stat-badge">WR ${s.wr}</span>` : ''}
          ${s.kd ? `<span class="cv-stat-badge">K/D ${s.kd}</span>` : ''}
          ${s.other ? `<span class="cv-stat-badge">${s.other}</span>` : ''}
        </div>
      `).join('')}
    </div>` : '';

  // Achievements section
  const achHtml = state.achievements.length ? `
    <div class="cv-section">
      <div class="cv-section-title">Achievement & Prestasi</div>
      ${state.achievements.map(a => `
        <div class="cv-ach-item">
          <span class="cv-ach-icon">🏆</span>
          <div>
            <div class="cv-ach-title">${a.title}
              <span class="cv-level-badge level-${a.level}">${a.level}</span>
            </div>
            <div class="cv-ach-meta">${[a.game, a.date].filter(Boolean).join(' · ')}</div>
            ${a.desc ? `<div class="cv-ach-desc">${a.desc}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>` : '';

  // Tournaments section
  const tourHtml = state.tournaments.length ? `
    <div class="cv-section">
      <div class="cv-section-title">Riwayat Turnamen</div>
      ${state.tournaments.map(t2 => `
        <div class="cv-tour-item">
          <span class="cv-ach-icon">⚔️</span>
          <div>
            <div class="cv-ach-title">${t2.name}
              ${t2.result ? `<span class="cv-level-badge level-Nasional">${t2.result}</span>` : ''}
            </div>
            <div class="cv-ach-meta">
              ${[t2.game, t2.scale, t2.date].filter(Boolean).join(' · ')}
              ${t2.team ? ` · Tim: ${t2.team}` : ''}
              ${t2.role ? ` · ${t2.role}` : ''}
              ${t2.prize ? ` · 💰 ${t2.prize}` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>` : '';

  // Screenshots section
  const ssHtml = state.screenshots.length ? `
    <div class="cv-section">
      <div class="cv-section-title">Screenshots & Bukti</div>
      <div class="cv-ss-grid">
        ${state.screenshots.map(ss => `
          <div class="cv-ss-item">
            <img src="${ss.dataUrl}" alt="Screenshot" />
            ${ss.caption ? `<div class="cv-ss-caption">${ss.caption}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>` : '';

  return `
    <div class="cv-render template-${t}">
      <div class="cv-header">
        ${avatarHtml}
        <div class="cv-header-info">
          <div class="cv-name">${id.realName || 'Nama Gamer'}</div>
          <div class="cv-gamertag">${id.gamerTag ? `@${id.gamerTag}` : ''}</div>
          <div class="cv-meta">${headerMeta}</div>
          ${contactLine ? `<div class="cv-meta" style="margin-top:4px;">${contactLine}</div>` : ''}
        </div>
      </div>
      <div class="cv-body">
        ${id.bio ? `<div class="cv-section"><div class="cv-bio">${id.bio}</div></div>` : ''}
        ${gamesHtml}
        ${statsHtml}
        ${achHtml}
        ${tourHtml}
        ${ssHtml}
      </div>
      <div class="cv-footer">
        Generated by AchieveResumeCraft · ${new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
      </div>
    </div>
  `;
}

// ── STEP DOTS (mark done) ──
function updateStepDots() {
  const checks = {
    identity: () => state.identity.realName || state.identity.gamerTag,
    games: () => state.games.length > 0,
    stats: () => state.stats.length > 0,
    achievements: () => state.achievements.length > 0,
    tournaments: () => state.tournaments.length > 0,
    screenshots: () => state.screenshots.length > 0,
  };
  Object.entries(checks).forEach(([step, check]) => {
    const btn = document.querySelector(`.step-item[data-step="${step}"]`);
    if (!btn) return;
    if (check()) btn.classList.add('done');
    else btn.classList.remove('done');
  });
}

// ── AUTOSAVE ──
function autosave() {
  try {
    localStorage.setItem('arc-state', JSON.stringify(state));
  } catch(e) {
    // Storage full (screenshots can be large) — silent fail
  }
}

function loadFromStorage() {
  const saved = localStorage.getItem('arc-state');
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);

    // Restore identity form values
    const id = state.identity;
    const fieldMap = { realName:'realName', gamerTag:'gamerTag', platform:'platform', location:'location', startYear:'startYear', role:'role', bio:'bio', discord:'discord', stream:'stream' };
    Object.entries(fieldMap).forEach(([key, elId]) => {
      const el = document.getElementById(elId);
      if (el && id[key]) el.value = id[key];
    });
    if (id.avatarDataUrl) renderAvatarPreview(id.avatarDataUrl);

    // Restore lists
    renderGames();
    renderStats();
    renderAchievements();
    renderTournaments();
    renderScreenshots();

    // Restore template
    if (state.template) {
      document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
      const tb = document.querySelector(`.template-btn[data-template="${state.template}"]`);
      if (tb) tb.classList.add('active');
    }

    updateStepDots();
    showToast('💾 Data sebelumnya dimuat kembali');
  } catch(e) {
    console.warn('Failed to load saved state', e);
  }
}

// ── HELPERS ──
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function clearInputs(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}
