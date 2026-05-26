// Modal — animal detail / adoption interest
const AnimalModal = ({ animal, onClose }) => {
  const [step, setStep] = React.useState('info'); // 'info' | 'visit'

  React.useEffect(() => {
    if (animal) {
      setStep('info');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [animal?.id]);

  if (!animal) return null;
  const a = animal;

  return (
    <div style={mStyles.overlay} onClick={onClose}>
      <div style={mStyles.box} onClick={e => e.stopPropagation()}>
        <button style={mStyles.close} onClick={onClose} aria-label="Закрыть">×</button>

        {step === 'info' && (
          <React.Fragment>
            <div style={mStyles.imgSide}>
              <img src={a.image} alt={a.name} style={mStyles.img} />
            </div>
            <div style={mStyles.infoSide}>
              <span style={mStyles.statusBadge}>{a.status}</span>
              <div style={mStyles.name}>{a.name}</div>
              <div style={mStyles.meta}>
                {a.type} · {a.age} · {a.size} · {a.sex}
              </div>
              <p style={mStyles.story}>{a.story}</p>

              <div style={mStyles.facts}>
                {[
                  ['Привит', '✓'],
                  ['Кастрирован', '✓'],
                  ['Чипирован', '✓'],
                  ['Социализирован', '✓'],
                ].map(([k, v]) => (
                  <div key={k} style={mStyles.fact}>
                    <span style={mStyles.factCheck}>{v}</span>
                    <span>{k}</span>
                  </div>
                ))}
              </div>

              <div style={mStyles.actions}>
                <button style={mStyles.primary} onClick={() => setStep('visit')}>
                  Познакомиться →
                </button>
                <button style={mStyles.secondary}>Поделиться</button>
              </div>
            </div>
          </React.Fragment>
        )}

        {step === 'visit' && (
          <div style={mStyles.visitWrap}>
            <button style={mStyles.back} onClick={() => setStep('info')}>← Назад</button>
            <div style={mStyles.visitHead}>
              <div style={mStyles.formEyebrow}>Знакомство с {a.name}</div>
              <h3 style={mStyles.formHeading}>Приходите в приют</h3>
              <p style={mStyles.visitBody}>
                Мы открыты каждый день с 11:00 до 19:00. Заранее звонить не нужно — приезжайте,
                познакомьтесь с {a.name} вживую, погуляйте, посмотрите как он реагирует на вас.
              </p>
              <p style={mStyles.visitBody}>
                Никаких анкет и проверок на пороге — мы просто поговорим, расскажем характер, привычки
                и помощь в адаптации. Если почувствуете, что это ваш питомец — заберёте домой в тот же день
                или договоримся об удобном времени.
              </p>
              <div style={mStyles.visitFacts}>
                <div style={mStyles.visitFact}>
                  <div style={mStyles.visitFactLabel}>Адрес</div>
                  <div style={mStyles.visitFactValue}>Нижний Новгород, Бурнаковский проезд, 16</div>
                </div>
                <div style={mStyles.visitFact}>
                  <div style={mStyles.visitFactLabel}>Телефон</div>
                  <div style={mStyles.visitFactValue}>+7 831 231-31-13</div>
                </div>
                <div style={mStyles.visitFact}>
                  <div style={mStyles.visitFactLabel}>Часы работы</div>
                  <div style={mStyles.visitFactValue}>Ежедневно 11:00 — 19:00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, multiline, required, type = 'text', placeholder }) => (
  <label style={fStyles.label}>
    <span style={fStyles.labelText}>{label}{required && <span style={fStyles.req}> *</span>}</span>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        style={{ ...fStyles.input, minHeight: 90, resize: 'vertical', padding: 14, lineHeight: 1.5 }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        style={fStyles.input}
      />
    )}
  </label>
);

const fStyles = {
  label: { display: 'flex', flexDirection: 'column', gap: 6 },
  labelText: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#7d6259',
  },
  req: { color: '#ff2a00' },
  input: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    background: '#fdf8f5',
    color: '#261510',
    border: '1.5px solid #e8ddd6',
    borderRadius: 12,
    padding: '12px 14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
};

const mStyles = {
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
    maxWidth: 920,
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
  },
  close: {
    position: 'absolute',
    top: 16, right: 18,
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    width: 36, height: 36,
    borderRadius: 999,
    fontSize: 24,
    color: '#3e2720',
    cursor: 'pointer',
    lineHeight: 1,
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  imgSide: {
    background: '#fff2ee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    minHeight: 480,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoSide: { padding: '40px 40px 32px' },
  statusBadge: {
    display: 'inline-block',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: '#fff2ee',
    color: '#ff2a00',
    padding: '6px 14px',
    borderRadius: 999,
    marginBottom: 16,
  },
  name: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 56,
    color: '#120804',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    marginBottom: 8,
  },
  meta: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#7d6259',
    marginBottom: 16,
  },
  story: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 17,
    color: '#3e2720',
    lineHeight: 1.55,
    marginBottom: 24,
    textWrap: 'pretty',
  },
  facts: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    padding: '16px 0',
    borderTop: '1px solid #e8ddd6',
    borderBottom: '1px solid #e8ddd6',
    marginBottom: 24,
  },
  fact: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#3e2720',
  },
  factCheck: {
    color: '#ff2a00',
    fontWeight: 700,
    fontSize: 16,
  },
  actions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
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
  },
  secondary: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 17,
    background: 'transparent',
    color: '#3e2720',
    border: '2px solid #cfc2b8',
    borderRadius: 999,
    padding: '12px 26px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
  },
  formWrap: {
    gridColumn: '1 / -1',
    padding: '32px 40px 40px',
  },
  visitWrap: {
    gridColumn: '1 / -1',
    padding: '32px 40px 40px',
  },
  visitHead: { maxWidth: 560 },
  visitBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#3e2720',
    lineHeight: 1.6,
    marginBottom: 16,
    textWrap: 'pretty',
  },
  visitFacts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginTop: 24,
    paddingTop: 24,
    borderTop: '1px solid #e8ddd6',
  },
  visitFact: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  visitFactLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#7d6259',
  },
  visitFactValue: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#261510',
    lineHeight: 1.4,
  },
  back: {
    background: 'transparent',
    border: 'none',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontSize: 14,
    color: '#7d6259',
    cursor: 'pointer',
    marginBottom: 16,
    letterSpacing: '0.04em',
    padding: 0,
  },
  formHead: { marginBottom: 24, maxWidth: 520 },
  formEyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 8,
  },
  formHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 36,
    color: '#261510',
    lineHeight: 1.05,
    marginBottom: 10,
  },
  formSub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#5c4038',
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  submit: {
    gridColumn: '1 / -1',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 17,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '15px 32px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    marginTop: 8,
    boxShadow: '0 6px 16px rgba(255,42,0,0.28)',
  },
  sent: {
    gridColumn: '1 / -1',
    padding: '48px 56px 56px',
    textAlign: 'center',
  },
  sentImg: {
    width: 180,
    objectFit: 'contain',
    margin: '0 auto 24px',
    filter: 'drop-shadow(0 12px 24px rgba(38,21,16,0.18))',
  },
  sentHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 56,
    color: '#ff2a00',
    lineHeight: 1,
    marginBottom: 12,
  },
  sentBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 17,
    color: '#3e2720',
    lineHeight: 1.55,
    maxWidth: 420,
    margin: '0 auto 24px',
    textWrap: 'pretty',
  },
};

// Single-column layout for form/sent steps via media-query-style trick:
// we'll just override grid via inline style key — simplest: when step !== 'info', the box becomes 1 column.
// Done by checking and applying a class? React doesn't easily restyle parent — so we'll add an effect:
// Simpler: clone box with conditional gridTemplate.
// Already handled because formWrap & sent use gridColumn '1 / -1'.

Object.assign(window, { AnimalModal });
