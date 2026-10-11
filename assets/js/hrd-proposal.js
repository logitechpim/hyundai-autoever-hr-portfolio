(() => {
  'use strict';
  const proposal = {"program":"사내 15분 교실","buttonLabel":"HRD 프로그램 제안드립니다","card":{"eyebrow":"온보딩 프로그램 기획","title":"사내 15분 교실"},"download":{"label":"전체 기획안 다운로드","fileName":"proposal.docx","publicPath":"/downloads/hrd-15-minute-classroom.docx"},"slides":[{"id":"program","title":"사내 15분 교실","description":"동료가 잘하는 것을 15분 동안 함께 배워보는 온보딩 프로그램","facts":[{"label":"참가자","value":"신입사원 12명"},{"label":"강사","value":"사내 강사 3명"},{"label":"운영 시간","value":"총 30분"}],"note":"테이블마다 강사 1명과 신입사원 4명이 함께한다."},{"id":"purpose","title":"기획 의도","lead":"잘하는 일을 어떻게 익혔는지 돌아보면, 다른 일을 배울 방법도 찾을 수 있다.","paragraphs":["강사는 자신이 익힌 과정을 설명하며 도움이 됐던 연습과 시행착오를 돌아본다. 참가자는 새로운 것을 직접 배우고, 자신의 경험에서도 배움의 방법을 찾아본다.","함께 활동하고 대화하며 신입사원이 선배에게 말을 걸고 질문할 계기를 만든다."],"teacherExperience":"학생의 이해 정도에 맞춰 설명을 조정했던 교사 경험을 강사의 수업 준비와 참가자 실습 지원에 활용한다."},{"id":"process","title":"진행 방식","steps":[{"duration":"3분","title":"시작","description":"취지와 진행 방식 안내"},{"duration":"3분","title":"소개","description":"이름, 소속, 수업을 고른 이유"},{"duration":"15분","title":"체험 수업","description":"시범을 보고 따라 한 뒤 직접 해보기"},{"duration":"6분","title":"결과 공유와 대화","description":"결과 공유, 배운 방법 돌아보기, 강사 업무 소개"},{"duration":"3분","title":"마무리","description":"짧은 설문 후 다음 일정으로 이동"}]},{"id":"examples","title":"수업 예시","examples":[{"title":"휴대폰 사진 편집","description":"같은 사진으로 간단한 편집 방법 익히기"},{"title":"손글씨 이름 카드","description":"글자 간격을 조절해 자신의 이름 카드 쓰기"},{"title":"업무 단축키","description":"단축키 하나를 익혀 짧은 연습 작업 수행하기"}]},{"id":"effects","title":"기대 효과","effects":[{"subject":"강사","description":"자신이 잘하게 된 과정을 돌아보고, 다른 일에도 써볼 학습 방법을 찾는다."},{"subject":"참가자","description":"새로운 것을 직접 배워보고, 자신의 배움에 도움이 됐던 방법을 떠올린다."},{"subject":"신입사원과 선배","description":"함께 활동하며 대화하고, 이후에도 질문하거나 말을 걸 계기를 만든다."}]}]};
  const trigger = document.getElementById('hrd-proposal-trigger');
  const dialog = document.getElementById('hrd-proposal-dialog');
  const stage = document.getElementById('hrd-proposal-stage');
  const previous = document.getElementById('hrd-proposal-prev');
  const next = document.getElementById('hrd-proposal-next');
  const count = document.getElementById('hrd-proposal-count');
  const status = document.getElementById('hrd-proposal-status');
  if (!trigger || !dialog || !stage) return;
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

  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    index = 0;
    position = { x: window.scrollX, y: window.scrollY };
    previousOverflow = document.body.style.overflow;
    render();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.getElementById('hrd-proposal-close').focus({ preventScroll: true });
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
