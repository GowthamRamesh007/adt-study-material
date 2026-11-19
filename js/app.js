/**
 * OME354 APPLIED DESIGN THINKING - APPLICATION LOGIC
 * Architecture: Clean Vanilla ES6, Zero-dependency, LocalStorage persistence
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    currentView: 'home',
    currentUnitId: 1,
    currentQuestionId: 'Q1',
    readingMode: 'understanding', // 'understanding' or 'exam'
    completedTopics: new Set(),
    bookmarkedQuestions: new Set(),
    expandedCards: new Set(), // Track which cards in Exam Centre are expanded inline
    quizState: {
      currentIndex: 0,
      score: 0,
      userAnswers: {},
      filterUnit: 'all',
      isSubmitted: false
    },
    theme: 'light'
  };

  // LocalStorage Keys
  const STORAGE_KEY_PROGRESS = 'adt_completed_topics_v1';
  const STORAGE_KEY_BOOKMARKS = 'adt_bookmarks_v1';
  const STORAGE_KEY_LAST_TOPIC = 'adt_last_visited_topic_v1';
  const STORAGE_KEY_THEME = 'adt_theme_v1';

  // Load saved state
  function loadPersistedState() {
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedCompleted) AppState.completedTopics = new Set(JSON.parse(savedCompleted));

      const savedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (savedBookmarks) AppState.bookmarkedQuestions = new Set(JSON.parse(savedBookmarks));

      const savedLast = localStorage.getItem(STORAGE_KEY_LAST_TOPIC);
      if (savedLast) AppState.currentQuestionId = savedLast;

      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
      AppState.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(Array.from(AppState.completedTopics)));
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(Array.from(AppState.bookmarkedQuestions)));
      localStorage.setItem(STORAGE_KEY_LAST_TOPIC, AppState.currentQuestionId);
      localStorage.setItem(STORAGE_KEY_THEME, AppState.theme);
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  // DOM Elements
  const DOM = {
    views: document.querySelectorAll('.view-section'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    searchTriggerBtn: document.getElementById('search-trigger-btn'),
    searchModal: document.getElementById('search-modal'),
    searchInput: document.getElementById('search-input'),
    searchResults: document.getElementById('search-results'),
    closeSearchBtn: document.getElementById('close-search-btn'),
    unitsGrid: document.getElementById('units-grid'),
    sidebarTopicList: document.getElementById('sidebar-topic-list'),
    sidebarUnitSelect: document.getElementById('sidebar-unit-select'),
    readingPane: document.getElementById('reading-pane-content'),
    modeBtnUnderstanding: document.getElementById('mode-btn-understanding'),
    modeBtnExam: document.getElementById('mode-btn-exam'),
    printBtn: document.getElementById('print-btn'),
    bookmarkBtn: document.getElementById('bookmark-btn'),
    markCompleteBtn: document.getElementById('mark-complete-btn'),
    examListContainer: document.getElementById('exam-questions-list'),
    examFilterPills: document.querySelectorAll('.exam-filter-pill'),
    quizQuestionContainer: document.getElementById('quiz-question-container'),
    quizPrevBtn: document.getElementById('quiz-prev-btn'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    revisionGrid: document.getElementById('revision-masonry-grid'),
    answerModal: document.getElementById('answer-modal'),
    answerModalTitle: document.getElementById('answer-modal-title'),
    answerModalBadge: document.getElementById('answer-modal-badge'),
    answerModalBody: document.getElementById('answer-modal-body'),
    answerModalFullBtn: document.getElementById('answer-modal-full-btn')
  };

  // Helper: Find question by ID
  function getQuestionById(id) {
    if (!window.COURSE_DATA || !window.COURSE_DATA.questions) return null;
    return window.COURSE_DATA.questions.find(q => q.id.toLowerCase() === id.toLowerCase());
  }

  // Helper: Find Unit by ID
  function getUnitById(id) {
    if (!window.COURSE_DATA || !window.COURSE_DATA.units) return null;
    return window.COURSE_DATA.units.find(u => u.id === Number(id));
  }

  // View Navigation
  function switchView(viewName) {
    AppState.currentView = viewName;
    DOM.views.forEach(v => {
      if (v.id === `view-${viewName}`) {
        v.classList.add('active-view');
      } else {
        v.classList.remove('active-view');
      }
    });

    DOM.navLinks.forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // View specific activations
    if (viewName === 'unit-explorer') {
      renderSidebarTopics();
      renderReadingPane();
    } else if (viewName === 'exam-centre') {
      renderExamQuestions('all');
    } else if (viewName === 'quiz-centre') {
      renderQuizQuestion();
    } else if (viewName === 'revision-centre') {
      renderRevisionCards();
    }
  }

  // Theme Toggle
  function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon(AppState.theme);
    saveState();
  }

  function updateThemeIcon(theme) {
    if (!DOM.themeToggleBtn) return;
    DOM.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    DOM.themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }

  // Render Home Units
  function renderHomeUnits() {
    if (!DOM.unitsGrid || !window.COURSE_DATA) return;
    const units = window.COURSE_DATA.units;

    DOM.unitsGrid.innerHTML = units.map(u => {
      const qCount = window.COURSE_DATA.questions.filter(q => q.unit === u.id).length;
      return `
        <div class="unit-card" style="--unit-accent: ${u.accent}">
          <div class="unit-header-meta">
            <span class="unit-code-badge">${u.code}</span>
            <span class="unit-time-badge">⏱️ ${u.estimatedRead}</span>
          </div>
          <h3 class="unit-card-title">${u.title}</h3>
          <p class="unit-card-desc">${u.description}</p>
          <div class="unit-topics-tags">
            ${u.keyThemes.map(t => `<span class="topic-tag">${t}</span>`).join('')}
          </div>
          <div class="unit-card-footer">
            <span class="unit-progress-mini">${qCount} Essential Questions</span>
            <button class="unit-open-btn" onclick="window.ADT_APP.openUnit(${u.id})">
              Explore Unit →
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Sidebar Topics
  function renderSidebarTopics() {
    if (!DOM.sidebarTopicList || !window.COURSE_DATA) return;
    const unitId = Number(AppState.currentUnitId);
    const questionsInUnit = window.COURSE_DATA.questions.filter(q => q.unit === unitId);

    DOM.sidebarTopicList.innerHTML = questionsInUnit.map(q => {
      const isActive = q.id.toLowerCase() === AppState.currentQuestionId.toLowerCase();
      const isCompleted = AppState.completedTopics.has(q.id);
      const isBookmarked = AppState.bookmarkedQuestions.has(q.id);

      return `
        <li class="sidebar-topic-item ${isActive ? 'active' : ''}" onclick="window.ADT_APP.selectQuestion('${q.id}')">
          <span class="sidebar-mark-pill">${q.marks}M</span>
          <span style="flex:1;">
            ${isCompleted ? '✓ ' : ''}${q.id}: ${q.question}
          </span>
          ${isBookmarked ? '🔖' : ''}
        </li>
      `;
    }).join('');
  }

  // Render Reading Pane
  function renderReadingPane() {
    if (!DOM.readingPane || !window.COURSE_DATA) return;
    const q = getQuestionById(AppState.currentQuestionId);
    if (!q) return;

    const unit = getUnitById(q.unit);
    const isCompleted = AppState.completedTopics.has(q.id);
    const isBookmarked = AppState.bookmarkedQuestions.has(q.id);

    // Generate formatted content based on selected mode
    let contentHtml = '';

    if (AppState.readingMode === 'exam') {
      // EXAM WRITING MODE: Pure, unaltered original text formatting for direct memorization & writing in exam halls
      contentHtml = `
        <div class="exam-writing-banner" style="background:var(--bg-secondary); border-left:4px solid var(--brand-secondary); padding:1rem 1.25rem; border-radius:4px; margin-bottom:1.5rem; font-size:0.9rem;">
          <strong>📝 Exam Writing Mode (Verbatim Anna University Standard Answer):</strong>
          <p style="margin:0.25rem 0 0; color:var(--text-secondary);">This displays the complete, unabridged, official text structure suitable for direct reproduction in university examinations.</p>
        </div>
        <div class="original-answer-body" style="white-space: pre-line; font-family: var(--font-sans); font-size: 1.05rem; line-height: 1.8;">
          ${escapeHtml(q.full_text)}
        </div>
      `;
    } else {
      // UNDERSTANDING MODE: Rich editorial layout with highlighted keywords, structured sub-blocks, and visual callouts
      const processedHtml = formatUnderstandingMode(q.content_lines, q.keywords);
      contentHtml = `
        <div class="understanding-banner" style="background:var(--bg-tertiary); border-left:4px solid var(--brand-primary); padding:1rem 1.25rem; border-radius:4px; margin-bottom:2rem; font-size:0.9rem;">
          <strong>💡 Interactive Conceptual Mode:</strong>
          <p style="margin:0.25rem 0 0; color:var(--text-secondary);">Structured with visual highlights, step-by-step hierarchy, and emphasized core concepts while 100% preserving original content.</p>
        </div>
        <div class="understanding-content-flow">
          ${processedHtml}
        </div>
      `;
    }

    DOM.readingPane.innerHTML = `
      <div class="reading-pane-header">
        <div class="reading-breadcrumbs">
          <span>OME354</span> &gt;
          <span>${unit ? unit.code : 'UNIT'}</span> &gt;
          <span class="curr">${q.id} (${q.marks} Marks)</span>
        </div>
        <h1 class="reading-question-title">${q.id}: ${q.question}</h1>
        <div class="reading-toolbar">
          <div class="mode-toggle-group">
            <button class="mode-btn ${AppState.readingMode === 'understanding' ? 'active' : ''}" onclick="window.ADT_APP.setReadingMode('understanding')">
              💡 Understanding Mode
            </button>
            <button class="mode-btn ${AppState.readingMode === 'exam' ? 'active' : ''}" onclick="window.ADT_APP.setReadingMode('exam')">
              📝 Exam Writing Mode
            </button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-secondary" id="bookmark-btn" onclick="window.ADT_APP.toggleBookmark()">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn-secondary" id="mark-complete-btn" onclick="window.ADT_APP.toggleComplete()">
              ${isCompleted ? '✓ Completed' : '○ Mark Complete'}
            </button>
            <button class="btn-secondary" onclick="window.print()">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
      <div class="reading-pane-body">
        ${contentHtml}
      </div>
      <div class="reading-pane-nav" style="display:flex; justify-content:space-between; margin-top:3rem; padding-top:1.5rem; border-top:1px solid var(--card-border);">
        <button class="btn-secondary" onclick="window.ADT_APP.navQuestion(-1)">
          ← Previous Question
        </button>
        <button class="btn-primary" onclick="window.ADT_APP.navQuestion(1)">
          Next Question →
        </button>
      </div>
    `;

    // Persist last visited topic
    saveState();
  }

  // Format Understanding Mode safely
  function formatUnderstandingMode(lines, keywords) {
    if (!lines || !lines.length) return '<p>No content available.</p>';
    let out = '';
    let inList = false;

    lines.forEach(rawLine => {
      const line = rawLine ? rawLine.trim() : '';
      if (!line) return;

      const isAllUpper = (line === line.toUpperCase()) && /[A-Z]/.test(line);
      const isHeading = (isAllUpper && line.length < 70 && !line.startsWith('PART')) ||
                        line.startsWith('STEP ') ||
                        line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ');

      const isExample = line.toLowerCase().startsWith('example:');
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('–') || line.startsWith('✓') || line.startsWith('❌');

      if (isHeading) {
        if (inList) { out += '</ul>'; inList = false; }
        out += `<div class="answer-section-block"><div class="answer-section-heading">${escapeHtml(line)}</div>`;
      } else if (isExample) {
        if (inList) { out += '</ul>'; inList = false; }
        out += `<div class="case-study-box"><span class="case-study-badge">Real-World Case / Example</span><p style="margin:0;">${escapeHtml(line)}</p></div>`;
      } else if (isBullet) {
        if (!inList) { out += '<ul class="answer-bullet-list">'; inList = true; }
        out += `<li>${highlightTerms(escapeHtml(line.replace(/^[•\-–]\s*/, '')), keywords)}</li>`;
      } else {
        if (inList) { out += '</ul>'; inList = false; }
        out += `<p>${highlightTerms(escapeHtml(line), keywords)}</p>`;
      }
    });

    if (inList) out += '</ul>';
    return out;
  }

  function highlightTerms(text, keywords) {
    if (!keywords || !keywords.length) return text;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      text = text.replace(regex, '<span class="highlight-keyword">$1</span>');
    });
    return text;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Toggle inline accordion on question cards
  function toggleCardAnswer(qId, event) {
    if (event) event.stopPropagation();
    const cardEl = document.getElementById(`exam-card-${qId}`);
    if (!cardEl) return;

    if (AppState.expandedCards.has(qId)) {
      AppState.expandedCards.delete(qId);
      cardEl.classList.remove('expanded');
    } else {
      AppState.expandedCards.add(qId);
      cardEl.classList.add('expanded');
    }
  }

  // Open Quick Answer Modal directly from any question tap
  function showAnswerModal(qId, event) {
    if (event) event.stopPropagation();
    const q = getQuestionById(qId);
    if (!q || !DOM.answerModal) return;

    const unit = getUnitById(q.unit);
    if (DOM.answerModalBadge) {
      DOM.answerModalBadge.innerText = `OME354 • ${unit ? unit.code : 'UNIT'} • PART ${q.part} • ${q.marks} MARKS`;
    }
    if (DOM.answerModalTitle) {
      DOM.answerModalTitle.innerText = `${q.id}: ${q.question}`;
    }
    if (DOM.answerModalBody) {
      DOM.answerModalBody.innerHTML = `
        <div style="background:var(--bg-secondary); border-left:4px solid var(--brand-primary); padding:0.75rem 1rem; border-radius:4px; margin-bottom:1.5rem; font-size:0.88rem;">
          <strong>Official Complete Exam Answer:</strong>
        </div>
        <div style="white-space: pre-line; line-height: 1.8; font-size: 1.05rem;">
          ${escapeHtml(q.full_text)}
        </div>
      `;
    }
    if (DOM.answerModalFullBtn) {
      DOM.answerModalFullBtn.onclick = function () {
        closeAnswerModal();
        window.ADT_APP.openQuestion(q.id);
      };
    }

    DOM.answerModal.classList.add('open');
  }

  function closeAnswerModal() {
    if (DOM.answerModal) DOM.answerModal.classList.remove('open');
  }

  // Render Exam Questions List with both inline accordion toggle AND full reader access
  function renderExamQuestions(filter) {
    if (!DOM.examListContainer || !window.COURSE_DATA) return;
    const questions = window.COURSE_DATA.questions;

    let filtered = questions;
    if (filter === 'partA') filtered = questions.filter(q => q.part === 'A');
    if (filter === 'partB') filtered = questions.filter(q => q.part === 'B');
    if (filter === 'partC') filtered = questions.filter(q => q.part === 'C');
    if (filter === 'bookmarked') filtered = questions.filter(q => AppState.bookmarkedQuestions.has(q.id));

    DOM.examListContainer.innerHTML = filtered.map(q => {
      const unit = getUnitById(q.unit);
      const isExpanded = AppState.expandedCards.has(q.id);

      return `
        <div class="exam-card ${isExpanded ? 'expanded' : ''}" id="exam-card-${q.id}" onclick="window.ADT_APP.toggleCardAnswer('${q.id}', event)">
          <div class="exam-card-header">
            <span class="exam-q-badge marks-${q.marks}">
              Part ${q.part} • ${q.id} • ${q.marks} Marks
            </span>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="font-size:0.8rem; color:var(--text-muted);">${unit ? unit.code : ''}</span>
              <span class="toggle-arrow">▼</span>
            </div>
          </div>
          
          <h3 class="exam-card-title">${q.id}: ${q.question}</h3>
          
          <p style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:0.75rem;">
            ${escapeHtml(q.full_text.slice(0, 160))}...
          </p>

          <div class="exam-card-footer">
            <span style="font-size:0.8rem; color:var(--text-muted);">
              ${isExpanded ? 'Tap question to collapse ▲' : 'Tap question to reveal answer ▼'}
            </span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-secondary" style="padding:0.35rem 0.75rem; font-size:0.82rem;" onclick="window.ADT_APP.showAnswerModal('${q.id}', event)">
                🔍 Quick View
              </button>
              <button class="view-complete-btn" onclick="window.ADT_APP.openQuestion('${q.id}'); if(event) event.stopPropagation();">
                Study in Unit Explorer →
              </button>
            </div>
          </div>

          <!-- Inline Expandable Answer Body -->
          <div class="exam-card-inline-answer">
            <div class="inline-answer-header">
              <span>📖 Complete Anna University Verified Answer (${q.marks} Marks)</span>
              <button class="btn-primary" style="padding:0.3rem 0.7rem; font-size:0.78rem;" onclick="window.ADT_APP.openQuestion('${q.id}'); event.stopPropagation();">
                Open in Fullscreen Study Mode →
              </button>
            </div>
            <div class="inline-answer-body" style="white-space: pre-line;">
              ${escapeHtml(q.full_text)}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Revision Cards
  function renderRevisionCards() {
    if (!DOM.revisionGrid || !window.REVISION_DATA) return;
    DOM.revisionGrid.innerHTML = window.REVISION_DATA.map(item => `
      <div class="revision-card">
        <div class="revision-card-category">${item.category} • Unit ${item.unit}</div>
        <h3 class="revision-card-title">${item.title}</h3>
        <div class="revision-card-text">${escapeHtml(item.text)}</div>
      </div>
    `).join('');
  }

  // Interactive Quiz Functions
  function renderQuizQuestion() {
    if (!DOM.quizQuestionContainer || !window.QUIZ_DATA) return;
    const qList = window.QUIZ_DATA;
    const curIdx = AppState.quizState.currentIndex;
    const q = qList[curIdx];

    const progressPct = ((curIdx + 1) / qList.length) * 100;
    const progressBar = document.getElementById('quiz-progress-fill');
    if (progressBar) progressBar.style.width = `${progressPct}%`;

    const selectedOption = AppState.quizState.userAnswers[q.id];
    const isAnswered = selectedOption !== undefined;

    DOM.quizQuestionContainer.innerHTML = `
      <div class="quiz-meta-row">
        <span>Question ${curIdx + 1} of ${qList.length}</span>
        <span>Unit ${q.unit} Concept</span>
        <span>Score: ${AppState.quizState.score}/${qList.length}</span>
      </div>
      <h3 class="quiz-question-text">${q.question}</h3>
      <div class="quiz-options-list">
        ${q.options.map((opt, idx) => {
          let extraClass = '';
          if (isAnswered) {
            if (idx === q.correct) extraClass = 'correct';
            else if (idx === selectedOption) extraClass = 'incorrect';
          }
          return `
            <button class="quiz-option-btn ${extraClass}" ${isAnswered ? 'disabled' : ''} onclick="window.ADT_APP.submitQuizAnswer(${q.id}, ${idx})">
              <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
              <span>${escapeHtml(opt)}</span>
            </button>
          `;
        }).join('')}
      </div>
      <div class="quiz-feedback-box ${isAnswered ? 'show ' + (selectedOption === q.correct ? 'correct' : 'incorrect') : ''}">
        <strong>${selectedOption === q.correct ? '✓ Correct Answer!' : '✗ Incorrect!'}</strong>
        <p style="margin:0.5rem 0 0; font-size:0.92rem;">${escapeHtml(q.explanation)}</p>
      </div>
    `;

    // Update Nav Buttons
    if (DOM.quizPrevBtn) DOM.quizPrevBtn.disabled = curIdx === 0;
    if (DOM.quizNextBtn) {
      if (curIdx === qList.length - 1) {
        DOM.quizNextBtn.innerText = 'Finish Quiz';
      } else {
        DOM.quizNextBtn.innerText = 'Next Question →';
      }
    }
  }

  function submitQuizAnswer(qId, selectedIdx) {
    if (AppState.quizState.userAnswers[qId] !== undefined) return;
    const q = window.QUIZ_DATA.find(item => item.id === qId);
    if (!q) return;

    AppState.quizState.userAnswers[qId] = selectedIdx;
    if (selectedIdx === q.correct) {
      AppState.quizState.score += 1;
    }
    renderQuizQuestion();
  }

  function nextQuizQuestion() {
    if (AppState.quizState.currentIndex < window.QUIZ_DATA.length - 1) {
      AppState.quizState.currentIndex += 1;
      renderQuizQuestion();
    } else {
      showQuizSummary();
    }
  }

  function prevQuizQuestion() {
    if (AppState.quizState.currentIndex > 0) {
      AppState.quizState.currentIndex -= 1;
      renderQuizQuestion();
    }
  }

  function showQuizSummary() {
    const total = window.QUIZ_DATA.length;
    const score = AppState.quizState.score;
    const pct = Math.round((score / total) * 100);

    DOM.quizQuestionContainer.innerHTML = `
      <div style="text-align:center; padding:2rem 1rem;">
        <h2 style="font-size:2.2rem; margin-bottom:1rem;">Quiz Complete! 🎉</h2>
        <div style="font-size:3.5rem; font-weight:800; color:var(--brand-primary); margin-bottom:0.5rem;">
          ${pct}%
        </div>
        <p style="font-size:1.1rem; color:var(--text-secondary); margin-bottom:2rem;">
          You scored <strong>${score}</strong> out of <strong>${total}</strong> questions correctly based on the OME354 curriculum.
        </p>
        <button class="btn-primary" onclick="window.ADT_APP.resetQuiz()">
          ↺ Restart Quiz
        </button>
      </div>
    `;
    if (DOM.quizPrevBtn) DOM.quizPrevBtn.style.display = 'none';
    if (DOM.quizNextBtn) DOM.quizNextBtn.style.display = 'none';
  }

  function resetQuiz() {
    AppState.quizState = {
      currentIndex: 0,
      score: 0,
      userAnswers: {},
      filterUnit: 'all',
      isSubmitted: false
    };
    if (DOM.quizPrevBtn) DOM.quizPrevBtn.style.display = 'inline-block';
    if (DOM.quizNextBtn) DOM.quizNextBtn.style.display = 'inline-block';
    renderQuizQuestion();
  }

  // Search Engine
  function openSearch() {
    if (!DOM.searchModal) return;
    DOM.searchModal.classList.add('open');
    DOM.searchInput.focus();
    renderSearchResults('');
  }

  function closeSearch() {
    if (!DOM.searchModal) return;
    DOM.searchModal.classList.remove('open');
  }

  function renderSearchResults(query) {
    if (!DOM.searchResults || !window.COURSE_DATA) return;
    const qTrim = query.trim().toLowerCase();

    if (!qTrim) {
      DOM.searchResults.innerHTML = `
        <div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.9rem;">
          Type keywords (e.g. <em>Empathy, SCAMPER, Prototype, Persona, MVP, Airbnb</em>) to search all questions and answers.
        </div>
      `;
      return;
    }

    const matches = window.COURSE_DATA.questions.filter(q =>
      q.id.toLowerCase().includes(qTrim) ||
      q.question.toLowerCase().includes(qTrim) ||
      q.full_text.toLowerCase().includes(qTrim)
    );

    if (matches.length === 0) {
      DOM.searchResults.innerHTML = `
        <div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.9rem;">
          No matching answers found for "${escapeHtml(query)}".
        </div>
      `;
      return;
    }

    DOM.searchResults.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-item-row" onclick="window.ADT_APP.openQuestion('${m.id}')">
        <div class="search-item-title">${m.id}: ${m.question}</div>
        <div class="search-item-meta">Part ${m.part} • ${m.marks} Marks • Unit ${m.unit}</div>
      </div>
    `).join('');
  }

  // Interactive Diagrams Visual Controller
  function selectProcessStage(stageIndex) {
    const descriptions = [
      "1. EMPATHIZE: Immerse in the user's world. Observe behaviors, conduct deep qualitative interviews, and shadow daily routines to reveal emotional barriers and latent unstated needs.",
      "2. DEFINE: Synthesize raw research observations into clear Point-of-View (POV) statements and 'How Might We' challenges to anchor creative direction.",
      "3. IDEATE: Divergent creative generation. Utilize SCAMPER, Brainstorming, and Mind Mapping. Focus entirely on idea quantity and suspend critical judgment.",
      "4. PROTOTYPE: Build to think. Transform concepts into tangible, testable artifacts ranging from low-fidelity paper sketches to functional Minimum Viable Products.",
      "5. TEST: Return to real users. Put the prototype in their hands, observe unguided interaction, listen actively, and harvest feedback to drive rapid iterative refinement."
    ];
    const inspector = document.getElementById('process-stage-inspector');
    if (inspector) inspector.innerHTML = descriptions[stageIndex];

    document.querySelectorAll('.dt-stage-node').forEach((node, idx) => {
      if (idx === stageIndex) node.classList.add('active');
      else node.classList.remove('active');
    });
  }

  function selectEmpathyQuadrant(quadrant) {
    const texts = {
      says: "<strong>SAYS QUADRANT:</strong> Direct verbatim quotes spoken by users during field interviews (e.g. 'I get overwhelmed trying to manage five different prescriptions every day.').",
      thinks: "<strong>THINKS QUADRANT:</strong> Inner beliefs, unspoken concerns, and assumptions (e.g. 'I worry my adult children will consider me a burden if I ask for technical help.').",
      does: "<strong>DOES QUADRANT:</strong> Observable behaviors and physical actions (e.g. User writes handwritten notes on kitchen calendar, squints closely at medicine bottles).",
      feels: "<strong>FEELS QUADRANT:</strong> Emotional state and underlying anxieties (e.g. Anxious about potential medical overdose, embarrassed about age-related cognitive decline)."
    };
    const inspector = document.getElementById('empathy-matrix-inspector');
    if (inspector) inspector.innerHTML = texts[quadrant];

    document.querySelectorAll('.empathy-quadrant').forEach(q => {
      if (q.dataset.quadrant === quadrant) q.classList.add('active');
      else q.classList.remove('active');
    });
  }

  function selectDiamondPhase(phase) {
    const texts = {
      divergent: "<strong>DIVERGENT THINKING (Explore Breadth):</strong> Generating a large volume of possibilities without criticism. Exploring wide solutions, wild concepts, and multiple perspectives. Quantity drives quality.",
      convergent: "<strong>CONVERGENT THINKING (Filter & Focus):</strong> Analytical selection. Applying feasibility, technical constraints, desirability, and user value criteria to narrow down to the optimal path forward."
    };
    const inspector = document.getElementById('diamond-inspector');
    if (inspector) inspector.innerHTML = texts[phase];

    document.querySelectorAll('.diamond-shape').forEach(d => {
      if (d.dataset.phase === phase) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  // Public Interface for Inline & Global Events
  window.ADT_APP = {
    switchView: switchView,
    openUnit: function (unitId) {
      AppState.currentUnitId = unitId;
      if (DOM.sidebarUnitSelect) DOM.sidebarUnitSelect.value = unitId;
      const firstQInUnit = window.COURSE_DATA.questions.find(q => q.unit === unitId);
      if (firstQInUnit) AppState.currentQuestionId = firstQInUnit.id;
      switchView('unit-explorer');
    },
    openQuestion: function (qId) {
      const q = getQuestionById(qId);
      if (q) {
        AppState.currentUnitId = q.unit;
        AppState.currentQuestionId = q.id;
        if (DOM.sidebarUnitSelect) DOM.sidebarUnitSelect.value = q.unit;
        closeSearch();
        switchView('unit-explorer');
      }
    },
    selectQuestion: function (qId) {
      AppState.currentQuestionId = qId;
      renderSidebarTopics();
      renderReadingPane();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setReadingMode: function (mode) {
      AppState.readingMode = mode;
      renderReadingPane();
    },
    toggleBookmark: function () {
      const qId = AppState.currentQuestionId;
      if (AppState.bookmarkedQuestions.has(qId)) {
        AppState.bookmarkedQuestions.delete(qId);
      } else {
        AppState.bookmarkedQuestions.add(qId);
      }
      saveState();
      renderSidebarTopics();
      renderReadingPane();
    },
    toggleComplete: function () {
      const qId = AppState.currentQuestionId;
      if (AppState.completedTopics.has(qId)) {
        AppState.completedTopics.delete(qId);
      } else {
        AppState.completedTopics.add(qId);
      }
      saveState();
      renderSidebarTopics();
      renderReadingPane();
    },
    navQuestion: function (direction) {
      const questions = window.COURSE_DATA.questions;
      const currIdx = questions.findIndex(q => q.id.toLowerCase() === AppState.currentQuestionId.toLowerCase());
      const nextIdx = currIdx + direction;
      if (nextIdx >= 0 && nextIdx < questions.length) {
        const nextQ = questions[nextIdx];
        AppState.currentUnitId = nextQ.unit;
        AppState.currentQuestionId = nextQ.id;
        if (DOM.sidebarUnitSelect) DOM.sidebarUnitSelect.value = nextQ.unit;
        renderSidebarTopics();
        renderReadingPane();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    toggleCardAnswer: toggleCardAnswer,
    showAnswerModal: showAnswerModal,
    closeAnswerModal: closeAnswerModal,
    submitQuizAnswer: submitQuizAnswer,
    nextQuizQuestion: nextQuizQuestion,
    prevQuizQuestion: prevQuizQuestion,
    resetQuiz: resetQuiz,
    selectProcessStage: selectProcessStage,
    selectEmpathyQuadrant: selectEmpathyQuadrant,
    selectDiamondPhase: selectDiamondPhase
  };

  // Setup Event Listeners
  function initEventListeners() {
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        switchView(view);
      });
    });

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (DOM.searchTriggerBtn) {
      DOM.searchTriggerBtn.addEventListener('click', openSearch);
    }
    if (DOM.closeSearchBtn) {
      DOM.closeSearchBtn.addEventListener('click', closeSearch);
    }
    if (DOM.searchModal) {
      DOM.searchModal.addEventListener('click', (e) => {
        if (e.target === DOM.searchModal) closeSearch();
      });
    }
    if (DOM.answerModal) {
      DOM.answerModal.addEventListener('click', (e) => {
        if (e.target === DOM.answerModal) closeAnswerModal();
      });
    }
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
        closeAnswerModal();
      }
    });

    if (DOM.sidebarUnitSelect) {
      DOM.sidebarUnitSelect.addEventListener('change', (e) => {
        window.ADT_APP.openUnit(Number(e.target.value));
      });
    }

    DOM.examFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.examFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderExamQuestions(pill.dataset.filter);
      });
    });

    if (DOM.quizNextBtn) {
      DOM.quizNextBtn.addEventListener('click', nextQuizQuestion);
    }
    if (DOM.quizPrevBtn) {
      DOM.quizPrevBtn.addEventListener('click', prevQuizQuestion);
    }
  }

  function init() {
    loadPersistedState();
    initEventListeners();
    renderHomeUnits();
    renderSidebarTopics();
    renderReadingPane();
    renderExamQuestions('all');
    renderQuizQuestion();
    renderRevisionCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
