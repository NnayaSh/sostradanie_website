// Donate — tiered impact: 100₽ feeds, 500₽ medicine, etc.
const TIERS = [
  {
    id: 100,
    title: 'Миска тепла',
    impact: 'Покормим котика целый день',
    detail: 'Корм, чистая вода и витамины — самое первое «спасибо» от того, кто давно не ел досыта.',
    illo: 'cat-loaf',
  },
  {
    id: 500,
    title: 'Лечим лапы',
    impact: 'Лекарство для одного питомца',
    detail: 'Простуды, царапины, обработка от паразитов. Маленький курс, который ставит на ноги.',
    illo: 'dog-resting',
  },
  {
    id: 1500,
    title: 'Полный осмотр',
    impact: 'Прививка и приём у ветеринара',
    detail: 'Базовый комплекс прививок. Питомец становится здоров и готов к переезду в новый дом.',
    illo: 'cat-vet',
  },
  {
    id: 5000,
    title: 'Вторая жизнь',
    impact: 'Операция и реабилитация',
    detail: 'Помощь животному после серьёзной травмы — от хирургии до месяца восстановления.',
    illo: 'horse-running',
  },
];

const ILLOS = {
  'cat-loaf':     'assets/cat-loaf.png',
  'dog-resting':  'assets/dog-resting.png',
  'cat-vet':  'assets/cat-vet.png',
  'horse-running': 'assets/horse-running.png',
};

const formatRub = (n) => n.toLocaleString('ru-RU') + ' ₽';

const DonateSection = () => {
  const [tier, setTier] = React.useState(500);
  const [custom, setCustom] = React.useState(500);
  const [recurring, setRecurring] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const selectTier = (t) => {
    setTier(t.id);
    setCustom(t.id);
  };

  const onCustomChange = (e) => {
    const v = Math.max(0, Number(e.target.value) || 0);
    setCustom(v);
    // find matching tier
    const match = TIERS.find(t => t.id === v);
    setTier(match ? match.id : null);
  };

  const activeTier = TIERS.find(t => t.id === tier);

  return (
    <section style={dStyles.root} id="help">
      <div style={dStyles.inner}>
        <div style={dStyles.head}>
          <div style={dStyles.eyebrow}>Помочь фонду</div>
          <h2 style={dStyles.heading}>
            Сто рублей — <span style={dStyles.headingItalic}>уже еда</span>.<br/>
            Пятьсот — <span style={dStyles.headingItalic}>уже лекарство</span>.
          </h2>
          <p style={dStyles.sub}>
            Каждое пожертвование превращается в конкретное доброе дело. Выберите сумму —
            и мы покажем, что она сделает прямо сегодня.
          </p>
        </div>

        <div style={dStyles.tiers} className="tier-grid">
          {TIERS.map(t => {
            const active = t.id === tier;
            return (
              <button
                key={t.id}
                onClick={() => selectTier(t)}
                style={{
                  ...dStyles.tier,
                  ...(active ? dStyles.tierActive : {}),
                }}
              >
                <div style={dStyles.tierImgWrap}>
                  <img src={ILLOS[t.illo]} alt="" style={dStyles.tierImg} />
                </div>
                <div style={{
                  ...dStyles.tierAmount,
                  color: active ? '#ff2a00' : '#261510',
                }}>{formatRub(t.id)}</div>
                <div style={dStyles.tierTitle}>{t.title}</div>
                <div style={dStyles.tierImpact}>{t.impact}</div>
                <div style={dStyles.tierDetail}>{t.detail}</div>
              </button>
            );
          })}
        </div>

        {/* Custom amount + commit row */}
        <div style={dStyles.commitRow}>
          <div style={dStyles.amountBox}>
            <div style={dStyles.amountLabel}>Своя сумма</div>
            <div style={dStyles.inputRow}>
              <input
                type="number"
                value={custom}
                onChange={onCustomChange}
                style={dStyles.input}
                min={1}
              />
              <span style={dStyles.currency}>₽</span>
            </div>
          </div>

          <label style={dStyles.recurring}>
            <input
              type="checkbox"
              checked={recurring}
              onChange={e => setRecurring(e.target.checked)}
              style={dStyles.checkbox}
            />
            <span style={dStyles.recurringText}>
              <span style={dStyles.recurringTitle}>Помогать каждый месяц</span>
              <span style={dStyles.recurringSub}>Подписка, которую можно отменить в любой момент</span>
            </span>
          </label>

          <button style={dStyles.donateBtn} onClick={() => setModalOpen(true)}>
            <span>Пожертвовать {formatRub(custom)}</span>
            <span style={dStyles.donateBtnArrow}>→</span>
          </button>
        </div>

        {activeTier && (
          <div style={dStyles.outcome}>
            <span style={dStyles.outcomeIcon}><svg width="12" height="9" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '0' }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg></span>
            <span style={dStyles.outcomeText}>
              На <strong>{formatRub(activeTier.id)}</strong> мы {activeTier.impact.toLowerCase()}
              {recurring ? ' каждый месяц' : ''}.
            </span>
          </div>
        )}
      </div>

      <DonateModal
        open={modalOpen}
        initialAmount={custom}
        recurring={recurring}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

const dStyles = {
  root: {
    background: '#fdf8f5',
    padding: '96px 32px',
    position: 'relative',
  },
  inner: { maxWidth: 1240, margin: '0 auto' },
  head: { maxWidth: 760, marginBottom: 56 },
  eyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 12,
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 72,
    color: '#261510',
    lineHeight: 0.98,
    letterSpacing: '-0.02em',
    marginBottom: 20,
  },
  headingItalic: {
    color: '#ff2a00',
    fontStyle: 'italic',
  },
  sub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 19,
    color: '#5c4038',
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  tiers: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    marginBottom: 32,
  },
  tier: {
    background: 'white',
    borderRadius: 24,
    padding: '24px 24px 28px',
    border: '2px solid transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    boxShadow: '0 4px 16px rgba(38,21,16,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  tierActive: {
    border: '2px solid #ff2a00',
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 32px rgba(255,42,0,0.18)',
  },
  tierImgWrap: {
    height: 110,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tierImg: {
    height: 100,
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 12px rgba(38,21,16,0.12))',
  },
  tierAmount: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 44,
    lineHeight: 1,
    letterSpacing: '-0.01em',
    marginBottom: 6,
    transition: 'color 0.2s',
  },
  tierTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: '#3e2720',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  tierImpact: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#3e2720',
    lineHeight: 1.4,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  tierDetail: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#7d6259',
    lineHeight: 1.45,
    textWrap: 'pretty',
  },
  commitRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: 24,
    background: 'white',
    borderRadius: 24,
    padding: 24,
    boxShadow: '0 8px 28px rgba(38,21,16,0.08)',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  amountBox: {
    borderRight: '1px solid #e8ddd6',
    paddingRight: 24,
  },
  amountLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#a89087',
    marginBottom: 6,
  },
  inputRow: { display: 'flex', alignItems: 'baseline', gap: 6 },
  input: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 36,
    color: '#261510',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: 130,
    padding: 0,
    letterSpacing: '-0.01em',
  },
  currency: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    color: '#7d6259',
  },
  recurring: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },
  checkbox: {
    width: 22,
    height: 22,
    accentColor: '#ff2a00',
    cursor: 'pointer',
    flexShrink: 0,
  },
  recurringText: { display: 'flex', flexDirection: 'column' },
  recurringTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    color: '#3e2720',
    letterSpacing: '0.02em',
    marginBottom: 2,
  },
  recurringSub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#7d6259',
  },
  donateBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '16px 32px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 8px 20px rgba(255,42,0,0.28)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'transform 0.15s',
  },
  donateBtnArrow: { display: 'inline-block', fontSize: 22 },
  outcome: {
    marginTop: 20,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: '#fff2ee',
    padding: '12px 20px',
    borderRadius: 999,
  },
  outcomeIcon: { color: '#ff2a00', fontSize: 14 },
  outcomeText: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#3e2720',
  },
};

Object.assign(window, { DonateSection });
