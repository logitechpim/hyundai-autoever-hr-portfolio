(() => {
  'use strict';
  const proposal = {"program":"사내 15분 교실","buttonLabel":"상세 보기","card":{"eyebrow":"온보딩 프로그램 기획","title":"사내 15분 교실"},"download":{"label":"전체 기획안 다운로드","fileName":"사내15분교실_온보딩기획안.pdf","publicPath":"/downloads/사내15분교실_온보딩기획안.pdf"},"slides":[{"id":"program","title":"사내 15분 교실","description":"선배 직원이 잘하는 것을 15분 동안 함께 배워보는 온보딩 프로그램","facts":[{"label":"참가자","value":"신입사원 12명"},{"label":"선배 직원","value":"선배 직원 3명"},{"label":"운영 시간","value":"총 30분"}],"note":"테이블마다 선배 직원 한 명과 신입사원 네 명이 함께한다."},{"id":"purpose","title":"기획 의도 및 기대 효과","paragraphs":["선배 직원이 잘하는 일을 익히며 도움이 됐던 연습과 시행착오를 돌아보고 나누면, 신입사원은 다른 일을 배울 때 활용할 방법을 찾을 수 있다.","함께 활동하며 신입사원과 선배 직원은 서로를 알아가고 친밀감을 쌓는다. 수업 뒤에도 편하게 말을 걸고 질문할 계기를 만들어 조직의 화합에 보탬이 된다."]},{"id":"process","title":"진행 방식","steps":[{"duration":"3분","title":"시작","description":"왜 이 수업을 여는지, 오늘은 어떻게 진행할지 안내한다."},{"duration":"3분","title":"소개","description":"이름과 소속을 소개하고, 이 수업을 고른 이유를 나눈다."},{"duration":"15분","title":"체험 수업","description":"강사의 시범을 보고 함께 따라 한 뒤, 각자 직접 해본다."},{"duration":"6분","title":"체험 나누기","description":"해본 일과 도움이 된 방법을 이야기하고, 강사에게 평소 어떤 일을 하는지도 듣는다."},{"duration":"3분","title":"마무리","description":"간단한 설문을 작성하고 다음 일정으로 이동한다."}]},{"id":"examples","title":"수업 예시","examples":[{"title":"휴대폰 사진 편집","description":"사진을 자르고 밝기를 조절해 본다."},{"title":"손글씨 이름 카드","description":"글자 크기와 간격을 조절해 이름 카드를 만든다."},{"title":"업무 단축키","description":"자주 쓰는 단축키 하나를 익혀 간단한 작업을 해본다."}]}]};
  const trigger = document.getElementById('hrd-proposal-card');
  const triggerLabel = document.getElementById('hrd-proposal-trigger');
  const dialog = document.getElementById('hrd-proposal-dialog');
  const stage = document.getElementById('hrd-proposal-stage');
  const previous = document.getElementById('hrd-proposal-prev');
  const next = document.getElementById('hrd-proposal-next');
  const count = document.getElementById('hrd-proposal-count');
  const status = document.getElementById('hrd-proposal-status');
  if (!trigger || !triggerLabel || !dialog || !stage) return;
  let index = 0;
  let position = { x: 0, y: 0 };
  let previousOverflow = '';
  let pointerStartedOutside = false;
  const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paragraph = text => '<p>' + escapeHtml(text) + '</p>';

  function render() {
    const slide = proposal.slides[index];
    let body = '<h2 id="hrd-slide-title">' + escapeHtml(slide.title) + '</h2>';
    if (slide.id === 'program') {
      body += '<p class="hrd-lead">' + escapeHtml(slide.description) + '</p><div class="hrd-facts">';
      const facts = [{value:'12명',label:'신입사원'},{value:'3명',label:'선배 직원'},{value:'30분',label:'전체 운영 시간'}];
      body += facts.map(fact => '<div class="hrd-fact"><strong>' + fact.value + '</strong><span>' + fact.label + '</span></div>').join('');
      body += '</div><p class="hrd-program-note">' + escapeHtml(slide.note) + '</p>';
    } else if (slide.id === 'purpose') {
      body += slide.paragraphs.map((text, paragraphIndex) => paragraphIndex === 0
        ? '<p class="hrd-purpose-emphasis">' + escapeHtml(text) + '</p>'
        : paragraph(text)).join('');
    } else if (slide.id === 'process') {
      body += '<ol class="hrd-steps">' + slide.steps.map(step => '<li class="hrd-step"><span class="hrd-step-time">' + escapeHtml(step.duration) + '</span><strong>' + escapeHtml(step.title) + '</strong>' + paragraph(step.description) + '</li>').join('') + '</ol>';
    } else if (slide.id === 'examples') {
      body += '<div class="hrd-examples">' + slide.examples.map(example => '<div class="hrd-example"><h3>' + escapeHtml(example.title) + '</h3>' + paragraph(example.description) + '</div>').join('') + '</div>';
    } else if (slide.id === 'effects') {
      body += '<div class="hrd-effects">' + slide.effects.map(effect => '<div class="hrd-effect"><h3>' + escapeHtml(effect.subject) + '</h3>' + paragraph(effect.description) + '</div>').join('') + '</div>';
    }
    stage.innerHTML = body;
    stage.scrollTop = 0;
    previous.disabled = index === 0;
    next.disabled = index === proposal.slides.length - 1;
    count.textContent = (index + 1) + ' / ' + proposal.slides.length;
    status.textContent = (index + 1) + ' / ' + proposal.slides.length + ' ' + slide.title;
  }

  trigger.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    if (dialog.open) return;
    index = 0;
    position = { x: window.scrollX, y: window.scrollY };
    previousOverflow = document.body.style.overflow;
    render();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.getElementById('hrd-proposal-close').focus({ preventScroll: true });
  });
  trigger.addEventListener('keydown', event => {
    if (event.target.closest('a')) return;
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); trigger.click(); }
  });
  document.getElementById('hrd-proposal-close').addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => { if (index > 0) { index--; render(); } });
  next.addEventListener('click', () => { if (index < proposal.slides.length - 1) { index++; render(); } });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter(element => element.getClientRects().length > 0);
    if (!focusable.length) { event.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !focusable.includes(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !focusable.includes(active))) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    const root = document.documentElement;
    const originalBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    trigger.focus({ preventScroll: true });
    window.scrollTo(position.x, position.y);
    requestAnimationFrame(() => { root.style.scrollBehavior = originalBehavior; });
  });
  function outside(event) {
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }
  dialog.addEventListener('pointerdown', event => { pointerStartedOutside = event.target === dialog && outside(event); });
  dialog.addEventListener('click', event => {
    if (pointerStartedOutside && event.target === dialog && outside(event)) dialog.close();
    pointerStartedOutside = false;
  });
})();
