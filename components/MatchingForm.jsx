// MatchingForm — анкета на знакомство, по одному вопросу на экран
const PHASES = [
  { id: 'who',  label: 'Кого ищете' },
  { id: 'home', label: 'Ваш дом' },
  { id: 'you',  label: 'О вас' },
];

const TYPE_OPTIONS = [
  { id: 'cat', label: 'Кошку',   icon: 'assets/cat-loaf.png' },
  { id: 'dog', label: 'Собаку',  icon: 'assets/dog-sitting.png' },
  { id: 'any', label: 'Пока не знаю', icon: null },
];

const QUESTIONS = [
  { id: 'types', phase: 'who',
    title: 'Кто вам по душе?',
    hint: 'Можно выбрать обоих — или нажать «пока не знаю», и&nbsp;мы подскажем.',
    kind: 'cards', multi: true, options: TYPE_OPTIONS, required: true },
  { id: 'size', phase: 'who',
    title: 'Какого размера собака вам подходит?',
    hint: 'Маленькой нужно меньше места, крупной — больше движения.',
    kind: 'chips', options: ['Маленькая', 'Средняя', 'Крупная', 'Не важно'],
    showIf: (a) => (a.types || []).includes('dog') },
  { id: 'age', phase: 'who',
    title: 'А какой возраст?',
    hint: 'Малыши требуют больше времени, возрастные — меньше движения и&nbsp;больше любви.',
    kind: 'chips', options: ['Малыш', 'Молодой', 'Взрослый', 'Возрастной', 'Любой'] },
  { id: 'temper', phase: 'who',
    title: 'Какой характер вам ближе?',
    hint: 'Можно несколько — поможем найти подходящий темперамент.',
    kind: 'chips', multi: true,
    options: ['Спокойный', 'Активный', 'Игривый', 'Самостоятельный', 'Ласковый'] },

  { id: 'housing', phase: 'home',
    title: 'Где будет жить ваш друг?',
    kind: 'chips', options: ['Квартира', 'Дом', 'Дом с участком'], required: true },
  { id: 'company', phase: 'home',
    title: 'С кем вы живёте?',
    kind: 'chips', options: ['Один(одна)', 'С партнёром', 'С детьми', 'С родителями'] },
  { id: 'pets', phase: 'home',
    title: 'Уже есть кто-то из животных?',
    hint: 'Важно знать, чтобы понять, как пройдёт знакомство.',
    kind: 'chips', options: ['Никого', 'Кошка', 'Собака', 'Другие животные'] },
  { id: 'time', phase: 'home',
    title: 'Сколько часов в день дома никого нет?',
    kind: 'chips', options: ['1–3 часа', '3–6 часов', '6–10 часов', 'Я почти всегда дома'], required: true },

  { id: 'experience', phase: 'you',
    title: 'Есть ли опыт с животными?',
    kind: 'chips', options: ['Первый питомец', 'Был раньше', 'Опытный'] },
  { id: 'name', phase: 'you',
    title: 'Как вас зовут?',
    kind: 'text', placeholder: 'Имя', required: true },
  { id: 'contact', phase: 'you',
    title: 'Как с вами связаться?',
    hint: 'Телефон или ник в Telegram — что удобнее.',
    kind: 'text', placeholder: '+7 … или @username', required: true },
  { id: 'about', phase: 'you',
    title: 'Расскажите немного о себе',
    hint: 'Необязательно. Чем занимаетесь, как видите жизнь с питомцем, есть ли пожелания.',
    kind: 'textarea', placeholder: 'Пара слов о вас…' },
];

const PHASE_ART = {
  who:  'assets/dog-resting.png',
  home: 'assets/cat-loaf.png',
  you:  'assets/dog-sitting.png',
};

const initialAnswers = QUESTIONS.reduce((acc, q) => {
  acc[q.id] = q.multi ? [] : '';
  return acc;
}, {});

const MatchingForm = ({ open, onClose }) => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(initialAnswers);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setStep(0);
      setSent(false);
      setAnswers(initialAnswers);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const visible = React.useMemo(
    () => QUESTIONS.filter((qq) => !qq.showIf || qq.showIf(answers)),
    [answers]
  );
  const safeStep = Math.min(step, Math.max(0, visible.length - 1));
  const q = visible[safeStep];
  const total = visible.length;
  const value = answers[q?.id];

  const hasValue = q?.multi ? value?.length > 0 : !!(value && String(value).trim());
  const canAdvance = q?.required ? hasValue : true;

  const next = React.useCallback(() => {
    if (!canAdvance) return;
    if (safeStep < total - 1) setStep(safeStep + 1);
    else setSent(true);
  }, [canAdvance, safeStep, total]);

  const back = () => { if (safeStep > 0) setStep(safeStep - 1); };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && q?.kind !== 'textarea') {
        const tag = document.activeElement?.tagName;
        if (tag !== 'TEXTAREA') { e.preventDefault(); next(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, next, q]);

  if (!open) return null;

  const update = (val) => setAnswers((a) => ({ ...a, [q.id]: val }));
  const toggleMulti = (v) => {
    const cur = answers[q.id] || [];
    update(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };

  const currentPhaseIdx = PHASES.findIndex((p) => p.id === q?.phase);

  return (
    <div style={mfStyles.overlay} className="mf-overlay" onClick={onClose}>
      <div style={mfStyles.box} onClick={(e) => e.stopPropagation()}>
        <button style={mfStyles.close} onClick={onClose} aria-label="Закрыть">×</button>

        {!sent && (
          <React.Fragment>
            <div style={mfStyles.sidebar}>
              <div style={mfStyles.eyebrow}>Анкета на знакомство</div>
              <h2 style={mfStyles.heading}>Подберём питомца по&nbsp;характеру</h2>
              <p style={mfStyles.lede}>
                Несколько коротких вопросов — и мы подумаем, кто из 86 наших подопечных
                подойдёт именно вам.
              </p>

              <ol style={mfStyles.steplist}>
                {PHASES.map((p, i) => {
                  const done = i < currentPhaseIdx;
                  const active = i === currentPhaseIdx;
                  return (
                    <li key={p.id} style={{
                      ...mfStyles.stepItem,
                      ...(active ? mfStyles.stepItemActive : {}),
                      ...(done ? mfStyles.stepItemDone : {}),
                    }}>
                      <span style={{
                        ...mfStyles.stepNum,
                        ...(active ? mfStyles.stepNumActive : {}),
                        ...(done ? mfStyles.stepNumDone : {}),
                      }}>{done ? '✓' : i + 1}</span>
                      <span>{p.label}</span>
                    </li>
                  );
                })}
              </ol>

              <div style={mfStyles.sidebarFoot}>
                <img src={PHASE_ART[q.phase]} alt="" style={mfStyles.sideImg} key={q.phase} />
              </div>
            </div>

            <div style={mfStyles.formSide}>
              <div style={mfStyles.topRow}>
                <div style={mfStyles.progressBar}>
                  <div style={{ ...mfStyles.progressFill, width: `${((step + 1) / total) * 100}%` }} />
                </div>
                <div style={mfStyles.stepLabel}>
                  {safeStep + 1} <span style={mfStyles.stepLabelDim}>из {total}</span>
                </div>
              </div>

              <div key={q.id} style={mfStyles.questionWrap}>
                <div style={mfStyles.phaseLabel}>{PHASES[currentPhaseIdx]?.label}</div>
                <h3 style={mfStyles.qTitle}>
                  {q.title}{q.required && <span style={mfStyles.req}> *</span>}
                </h3>
                {q.hint && <p style={mfStyles.qHint}>{q.hint}</p>}

                <div style={mfStyles.control}>
                  {q.kind === 'cards' && (
                    <div style={mfStyles.typeGrid}>
                      {q.options.map((opt) => {
                        const active = q.multi
                          ? (value || []).includes(opt.id)
                          : value === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => q.multi ? toggleMulti(opt.id) : update(opt.id)}
                            style={{ ...mfStyles.typeCard, ...(active ? mfStyles.typeCardActive : {}) }}
                          >
                            <div style={mfStyles.typeImgWrap}>
                              {opt.icon
                                ? <img src={opt.icon} alt="" style={mfStyles.typeImg} />
                                : <span style={mfStyles.typeQ}>?</span>}
                            </div>
                            <span style={mfStyles.typeLabel}>{opt.label}</span>
                            <span style={{ ...mfStyles.typeDot, ...(active ? mfStyles.typeDotActive : {}) }} />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.kind === 'chips' && (
                    <div style={mfStyles.chips}>
                      {q.options.map((opt) => {
                        const active = q.multi
                          ? (value || []).includes(opt)
                          : value === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => q.multi ? toggleMulti(opt) : update(opt)}
                            style={{ ...mfStyles.chip, ...(active ? mfStyles.chipActive : {}) }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.kind === 'text' && (
                    <input
                      type="text"
                      autoFocus
                      value={value || ''}
                      placeholder={q.placeholder}
                      onChange={(e) => update(e.target.value)}
                      style={mfStyles.bigInput}
                    />
                  )}

                  {q.kind === 'textarea' && (
                    <textarea
                      value={value || ''}
                      placeholder={q.placeholder}
                      onChange={(e) => update(e.target.value)}
                      style={mfStyles.bigTextarea}
                    />
                  )}
                </div>
              </div>

              <div style={mfStyles.actions}>
                <div style={mfStyles.actionsLeft}>
                  <button type="button" onClick={back}
                    disabled={safeStep === 0}
                    aria-label="Назад"
                    style={{ ...mfStyles.arrowBtn, ...(safeStep === 0 ? mfStyles.arrowBtnDisabled : {}) }}>
                    <ArrowSvg dir="left" />
                  </button>
                  <button type="button" onClick={next}
                    disabled={!canAdvance}
                    aria-label="Дальше"
                    style={{ ...mfStyles.arrowBtn, ...mfStyles.arrowBtnPrimary, ...(canAdvance ? {} : mfStyles.arrowBtnDisabled) }}>
                    <ArrowSvg dir="right" />
                  </button>
                  <span style={mfStyles.help}>
                    {safeStep < total - 1 ? 'или нажмите Enter' : 'последний шаг'}
                  </span>
                </div>
                <div style={mfStyles.actionsRight}>
                  {!q.required && !hasValue && safeStep < total - 1 && (
                    <button type="button" onClick={next} style={mfStyles.skip}>Пропустить</button>
                  )}
                  {safeStep === total - 1 && (
                    <button type="button" onClick={next}
                      disabled={!canAdvance}
                      style={{ ...mfStyles.primary, ...(canAdvance ? {} : mfStyles.primaryDisabled) }}>
                      Отправить анкету →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        {sent && (
          <div style={mfStyles.sent}>
            <img src="assets/cat-running.png" alt="" style={mfStyles.sentImg} />
            <div style={mfStyles.sentHeading}>Спасибо, {answers.name || 'друг'}!</div>
            <p style={mfStyles.sentBody}>
              Мы получили анкету и&nbsp;уже думаем, кто из&nbsp;приюта подойдёт вам по&nbsp;характеру.
              Свяжемся в&nbsp;течение дня — расскажем про&nbsp;подходящих ребят и&nbsp;пригласим познакомиться.
            </p>
            <div style={mfStyles.sentFacts}>
              <div style={mfStyles.sentFact}>
                <div style={mfStyles.sentFactLabel}>Свяжемся</div>
                <div style={mfStyles.sentFactValue}>в течение 24 часов</div>
              </div>
              <div style={mfStyles.sentFact}>
                <div style={mfStyles.sentFactLabel}>Контакт</div>
                <div style={mfStyles.sentFactValue}>{answers.contact || '—'}</div>
              </div>
            </div>
            <button type="button" onClick={onClose} style={mfStyles.sentBtn}>Закрыть</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes mfFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mfSideFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mf-overlay button,
        .mf-overlay input,
        .mf-overlay textarea { outline: none; }
        .mf-overlay button:focus-visible {
          box-shadow: 0 0 0 3px rgba(255,42,0,0.28);
        }
        .mf-overlay input:focus,
        .mf-overlay textarea:focus {
          border-color: #ff2a00 !important;
        }
      `}</style>
    </div>
  );
};

const ArrowSvg = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

// ───────── Styles ─────────

const mfStyles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(38,21,16,0.55)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },
  box: {
    background: 'white',
    borderRadius: 28,
    overflow: 'hidden',
    maxWidth: 1040,
    width: '100%',
    maxHeight: '92vh',
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    position: 'relative',
    boxShadow: '0 32px 64px rgba(0,0,0,0.28)',
  },
  close: {
    position: 'absolute',
    top: 16, right: 18,
    background: 'rgba(255,255,255,0.92)',
    border: 'none',
    width: 36, height: 36,
    borderRadius: 999,
    fontSize: 24,
    color: '#3e2720',
    cursor: 'pointer',
    lineHeight: 1,
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  },

  // sidebar
  sidebar: {
    background: '#ff2a00',
    color: 'white',
    padding: '40px 32px 28px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  eyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 14,
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 46,
    color: 'white',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    marginBottom: 18,
    textWrap: 'balance',
  },
  lede: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.5,
    marginBottom: 28,
    textWrap: 'pretty',
  },
  steplist: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: '0.04em',
    color: 'rgba(255,255,255,0.55)',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    transition: 'color 0.2s',
  },
  stepItemActive: { color: 'white' },
  stepItemDone: { color: 'rgba(255,255,255,0.85)' },
  stepNum: {
    width: 28, height: 28,
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    background: 'rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.85)',
    transition: 'all 0.2s',
  },
  stepNumActive: { background: 'white', color: '#ff2a00' },
  stepNumDone: { background: 'rgba(255,255,255,0.25)', color: 'white' },
  sidebarFoot: {
    marginTop: 'auto',
    position: 'relative',
    height: 180,
  },
  sideImg: {
    position: 'absolute',
    bottom: -32, right: -24,
    width: 280,
    objectFit: 'contain',
    filter: 'drop-shadow(0 12px 24px rgba(38,21,16,0.18))',
    pointerEvents: 'none',
    animation: 'mfSideFade 0.4s ease-out both',
  },

  // form side
  formSide: {
    padding: '28px 44px 28px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  progressBar: {
    flex: 1,
    height: 4,
    background: '#f3e7df',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#ff2a00',
    transition: 'width 0.35s ease',
  },
  stepLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.08em',
    color: '#261510',
    flexShrink: 0,
  },
  stepLabelDim: { color: '#a8958a' },

  questionWrap: {
    animation: 'mfFadeIn 0.32s ease-out',
  },
  phaseLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 10,
  },
  qTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 42,
    color: '#120804',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    margin: '0 0 10px',
    textWrap: 'balance',
  },
  qHint: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#7d6259',
    lineHeight: 1.5,
    margin: '0 0 22px',
    textWrap: 'pretty',
    maxWidth: 480,
  },
  req: { color: '#ff2a00' },
  control: { marginTop: 6 },

  // cards
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    maxWidth: 540,
  },
  typeCard: {
    position: 'relative',
    background: '#fdf8f5',
    border: '2px solid #efe3da',
    borderRadius: 20,
    padding: '20px 12px 16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.15s ease',
  },
  typeCardActive: {
    background: '#fff2ee',
    borderColor: '#ff2a00',
    boxShadow: '0 8px 22px rgba(255,42,0,0.18)',
  },
  typeImgWrap: {
    width: 84, height: 84,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  typeQ: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 64,
    color: '#ff2a00',
    lineHeight: 1,
  },
  typeLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: '#261510',
    letterSpacing: '0.02em',
  },
  typeDot: {
    position: 'absolute',
    top: 12, right: 12,
    width: 18, height: 18,
    borderRadius: 999,
    background: 'white',
    border: '2px solid #d8c9bc',
    transition: 'all 0.15s',
  },
  typeDotActive: {
    background: '#ff2a00',
    borderColor: '#ff2a00',
    boxShadow: '0 0 0 4px rgba(255,42,0,0.18)',
  },

  // chips
  chips: { display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 560 },
  chip: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 17,
    background: '#fdf8f5',
    color: '#3e2720',
    border: '1.5px solid #e8ddd6',
    borderRadius: 999,
    padding: '12px 22px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  chipActive: {
    background: '#261510',
    color: 'white',
    borderColor: '#261510',
  },

  // big inputs
  bigInput: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 24,
    background: 'transparent',
    color: '#261510',
    border: 'none',
    borderBottom: '2px solid #e8ddd6',
    padding: '8px 2px',
    outline: 'none',
    width: '100%',
    maxWidth: 480,
    transition: 'border-color 0.15s',
  },
  bigTextarea: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 17,
    background: '#fdf8f5',
    color: '#261510',
    border: '1.5px solid #e8ddd6',
    borderRadius: 14,
    padding: '14px 16px',
    outline: 'none',
    width: '100%',
    maxWidth: 540,
    minHeight: 120,
    resize: 'vertical',
    lineHeight: 1.5,
  },

  // actions
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 28,
  },
  actionsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  actionsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  arrowBtn: {
    width: 48, height: 48,
    borderRadius: 999,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#e8ddd6',
    background: 'white',
    color: '#3e2720',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    boxShadow: '0 2px 8px rgba(38,21,16,0.06)',
  },
  arrowBtnPrimary: {
    background: '#ff2a00',
    color: 'white',
    borderColor: '#ff2a00',
    boxShadow: '0 6px 16px rgba(255,42,0,0.28)',
  },
  arrowBtnDisabled: {
    background: '#f5ece4',
    color: '#cbbdb1',
    borderColor: '#f0e6dc',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  help: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#a8958a',
    fontStyle: 'italic',
    marginLeft: 4,
  },
  skip: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    background: 'transparent',
    color: '#a8958a',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    padding: '12px 8px',
    textDecoration: 'underline',
    textUnderlineOffset: 4,
  },
  primary: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 17,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '14px 28px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 6px 16px rgba(255,42,0,0.28)',
    transition: 'all 0.15s',
  },
  primaryDisabled: {
    background: '#e8ddd6',
    color: '#b3a397',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },

  // sent
  sent: {
    gridColumn: '1 / -1',
    padding: '56px 56px 56px',
    textAlign: 'center',
    background: '#fdf8f5',
  },
  sentImg: {
    width: 200,
    objectFit: 'contain',
    margin: '0 auto 18px',
    filter: 'drop-shadow(0 14px 28px rgba(38,21,16,0.2))',
  },
  sentHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 64,
    color: '#ff2a00',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    marginBottom: 14,
  },
  sentBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    color: '#3e2720',
    lineHeight: 1.55,
    maxWidth: 480,
    margin: '0 auto 28px',
    textWrap: 'pretty',
  },
  sentFacts: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    padding: '20px 0',
    borderTop: '1px solid #e8ddd6',
    borderBottom: '1px solid #e8ddd6',
    marginBottom: 28,
    maxWidth: 480,
    marginInline: 'auto',
  },
  sentFact: { textAlign: 'left' },
  sentFactLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#7d6259',
    marginBottom: 4,
  },
  sentFactValue: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#261510',
  },
  sentBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    background: '#3e2720',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '13px 32px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },
};

Object.assign(window, { MatchingForm });
