// Hero — Сострадание (calm cream background, vivid dog illustration)
const Hero = ({ onAdopt, onHelp }) => {
  return (
    <section style={heroStyles.root} id="home">
      {/* soft red shape behind dog */}
      <div style={heroStyles.blob} aria-hidden="true"></div>
      <div style={heroStyles.inner} className="hero-grid">
        <div style={heroStyles.text}>
          <div style={heroStyles.eyebrow}>
            <span style={heroStyles.dot}></span>
            Фонд помощи животным · с 2018 года
          </div>
          <h1 style={heroStyles.heading}>
            Здесь ждут <span style={heroStyles.headingAccent}>своих</span> людей
          </h1>
          <p style={heroStyles.body}>
            Мы знакомим самых добрых животных с самыми тёплыми домами —
            новые начала, мокрые носы и хвосты, виляющие от счастья.
          </p>
          <div style={heroStyles.actions}>
            <button style={heroStyles.btnPrimary} onClick={onAdopt}>
              Найти питомца →
            </button>
            <button style={heroStyles.btnSecondary} onClick={onHelp}>
              Помочь фонду
            </button>
          </div>
          <div style={heroStyles.stats}>
            {[
            ['10 000', 'нашли свой дом'],
            ['200', 'собак ждут новых встреч'],
            ['50', 'кошек ждут новых встреч']].
            map(([num, label]) =>
            <div key={label} style={heroStyles.stat}>
                <span style={heroStyles.statNum}>{num}</span>
                <span style={{ ...heroStyles.statLabel, width: "90px" }}>{label}</span>
              </div>
            )}
          </div>
        </div>
        <div style={heroStyles.imageWrap}>
          <img src="assets/cat-dog.gif" style={{ ...heroStyles.heroImg, objectFit: "contain", height: "544px", width: "566px" }} alt="Кот и пёс — друзья" />
          {/* tiny floating tag */}
          <div style={{ ...heroStyles.tag, justifyContent: "flex-start" }}>
            <span style={heroStyles.tagDot}></span>
            <span>привит · кастрирован · готов в дом</span>
          </div>
        </div>
      </div>
    </section>);

};

const heroStyles = {
  root: {
    background: '#fdf8f5',
    position: 'relative',
    overflow: 'hidden'
  },
  blob: {
    position: 'absolute',
    right: '-8%',
    top: '8%',
    width: 720,
    height: 720,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 40% 40%, #ffd4c7 0%, #fff2ee 55%, transparent 75%)',
    pointerEvents: 'none'
  },
  inner: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '24px 32px 72px',
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    alignItems: 'center',
    gap: 48,
    position: 'relative'
  },
  text: { position: 'relative', zIndex: 2 },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Patefon', Georgia, serif",
    fontSize: 14,
    color: '#7d6259',
    background: 'white',
    padding: '8px 16px',
    borderRadius: 999,
    boxShadow: '0 2px 12px rgba(38,21,16,0.06)',
    marginBottom: 28
  },
  dot: {
    width: 8, height: 8, borderRadius: 999, background: '#ff2a00',
    display: 'inline-block'
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 132,
    lineHeight: 0.92,
    letterSpacing: '-0.025em',
    color: '#261510',
    marginBottom: 24,
    textTransform: 'none'
  },
  headingAccent: {
    color: '#ff2a00',
    fontStyle: 'italic',
    display: 'inline-block'
  },
  body: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 19,
    lineHeight: 1.55,
    color: '#5c4038',
    maxWidth: 480,
    marginBottom: 36,
    textWrap: 'pretty'
  },
  actions: { display: 'flex', gap: 14, marginBottom: 8, flexWrap: 'wrap' },
  btnPrimary: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '15px 32px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 8px 20px rgba(255,42,0,0.28)',
    transition: 'transform 0.15s, box-shadow 0.15s'
  },
  btnSecondary: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    background: 'transparent',
    color: '#3e2720',
    border: '2px solid #cfc2b8',
    borderRadius: 999,
    padding: '13px 30px',
    cursor: 'pointer',
    letterSpacing: '0.03em'
  },
  stats: { display: 'flex', gap: 44, paddingTop: 32 },
  stat: { display: 'flex', flexDirection: 'column', gap: 4 },
  statNum: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 40,
    color: '#261510',
    lineHeight: 1
  },
  statLabel: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#7d6259',
    letterSpacing: '0.02em'
  },
  imageWrap: {
    position: 'relative',
    height: 560,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroImg: {
    width: '100%',
    maxWidth: 620,
    objectFit: 'contain',
    filter: 'drop-shadow(0 32px 48px rgba(255,42,0,0.18))',
    position: 'relative',
    zIndex: 1,
    WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 14px), transparent 100%)',
    maskImage: 'linear-gradient(to bottom, black calc(100% - 14px), transparent 100%)'
  },
  floatCat: {
    position: 'absolute',
    left: -90,
    bottom: -24,
    width: 200,
    objectFit: 'contain',
    filter: 'drop-shadow(0 16px 28px rgba(38,21,16,0.18))',
    zIndex: 2,
    transform: 'scaleX(-1) rotate(-4deg)'
  },
  tag: {
    position: 'absolute',
    top: 24,
    right: 0,
    background: 'white',
    padding: '10px 16px',
    borderRadius: 999,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#3e2720',
    boxShadow: '0 8px 24px rgba(38,21,16,0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    zIndex: 3
  },
  tagDot: {
    width: 8, height: 8, borderRadius: 999,
    background: '#7194c5',
    display: 'inline-block'
  }
};

Object.assign(window, { Hero });