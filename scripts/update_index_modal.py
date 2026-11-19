import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

modal_html = """
  <!-- Quick Answer Popover / Modal Overlay -->
  <div class="modal-overlay" id="answer-modal">
    <div class="answer-modal-box">
      <div class="answer-modal-header">
        <div>
          <div id="answer-modal-badge" style="font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:var(--brand-primary); margin-bottom:0.25rem;"></div>
          <h2 id="answer-modal-title" style="font-size:1.4rem; margin:0;"></h2>
        </div>
        <button class="icon-btn" onclick="window.ADT_APP.closeAnswerModal()" style="border:none;">✕</button>
      </div>
      <div class="answer-modal-body" id="answer-modal-body">
        <!-- Answer content loaded here -->
      </div>
      <div class="answer-modal-footer">
        <button class="btn-secondary" onclick="window.ADT_APP.closeAnswerModal()">Close</button>
        <button class="btn-primary" id="answer-modal-full-btn">Open in Unit Explorer →</button>
      </div>
    </div>
  </div>
"""

if 'id="answer-modal"' not in html:
    html = html.replace('<!-- Site Footer -->', modal_html + '\n  <!-- Site Footer -->')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Answer modal added to index.html successfully!')
else:
    print('Answer modal already present')
