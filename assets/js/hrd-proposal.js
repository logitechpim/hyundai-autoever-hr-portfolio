(() => {
  'use strict';
  const proposal = {"program":"사내 30분 교실","buttonLabel":"상세 보기","card":{"eyebrow":"온보딩 프로그램 기획","title":"사내 30분 교실"},"download":{"label":"전체 기획안 다운로드","fileName":"사내 30분 교실 운영안.pdf","publicPath":"/downloads/hrd-30-minute-classroom-plan.pdf"},"slides":[{"id":"program","title":"사내 30분 교실","description":"선배가 잘하는 일을 신입사원과 나누고, 함께 해보는 30분 수업","facts":[{"label":"참가자","value":"신입사원 12명"},{"label":"강사","value":"사내 강사 3명"},{"label":"운영 시간","value":"총 30분"}],"note":"테이블마다 강사 한 명과 신입사원 네 명이 한 조가 되어 활동한다."},{"id":"purpose","title":"기획 의도 및 기대 효과","lead":"선배가 잘하는 일을 알려주는 데서 그치지 않고, 그 일을 익힌 과정까지 나누는 수업이다.","paragraphs":["강사는 수업을 준비하며 그 일을 익히기까지 어떤 연습을 했고 어떤 시행착오를 겪었는지 돌아본다. 신입사원에게는 그 경험을 나눈다.","신입사원은 낯선 일을 직접 해보고, 도움이 됐던 연습이나 방법을 다른 일을 배울 때도 써볼 수 있을지 생각한다.","함께 활동하며 선배와 이야기를 나누고, 수업이 끝난 뒤에도 편하게 말을 걸거나 질문할 계기를 만든다."],"teacherExperience":"학생마다 이해하는 방식에 맞춰 설명을 조정해 온 경험을 바탕으로, 신입사원이 따라오기 쉬운 수업을 준비한다."},{"id":"process","title":"진행 방식","steps":[{"duration":"3분","title":"시작","description":"수업의 취지와 오늘의 순서 소개"},{"duration":"3분","title":"소개","description":"이름과 소속을 나누고, 수업을 고른 이유 소개"},{"duration":"15분","title":"체험 수업","description":"강사의 시범을 본 뒤 함께 따라 하고, 각자 직접 해보기"},{"duration":"6분","title":"결과 공유와 대화","description":"만든 결과와 배운 방법을 나누고, 강사의 업무도 소개"},{"duration":"3분","title":"마무리","description":"간단한 설문 작성 후 다음 일정으로 이동"}]},{"id":"examples","title":"수업 예시","examples":[{"title":"휴대폰 사진 편집","description":"사진을 자르고 밝기를 조절하며 기본 편집 해보기"},{"title":"손글씨 이름 카드","description":"글자 크기와 간격을 맞춰 내 이름 카드 만들기"},{"title":"업무 단축키","description":"자주 쓰는 단축키 하나를 익혀 간단한 작업에 써보기"}]}]};
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
      const facts = [{value:'12명',label:'신입사원'},{value:'3명',label:'사내 강사'},{value:'30분',label:'전체 운영 시간'}];
      body += facts.map(fact => '<div class="hrd-fact"><strong>' + fact.value + '</strong><span>' + fact.label + '</span></div>').join('');
      body += '</div><p class="hrd-program-note">' + escapeHtml(slide.note) + '</p>';
    } else if (slide.id === 'purpose') {
      body += '<p class="hrd-lead">' + escapeHtml(slide.lead) + '</p>';
      body += slide.paragraphs.map(paragraph).join('');
      body += '<div class="hrd-teacher-note"><h3>교사 경험의 활용</h3>' + paragraph(slide.teacherExperience) + '</div>';
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
