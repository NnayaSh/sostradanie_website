// Marquee — running line of positive slogans (calm, vivid)
const Marquee = () => {
  const phrases = [
    'Каждое доброе дело — чьё-то новое начало',
    'Они уже готовы любить',
    'Свои находятся',
    'Каждый хвост заслуживает свой дом',
    'Быть рядом — уже немало',
  ];
  // duplicate for seamless loop
  const items = [...phrases, ...phrases];

  return (
    <section style={mqStyles.root}>
      <div style={mqStyles.track}>
        {items.map((p, i) => (
          <React.Fragment key={i}>
            <span style={mqStyles.text}>{p}</span>
            <img src="assets/heart.svg" alt="" style={mqStyles.heart} aria-hidden="true" />
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes сostr-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

const mqStyles = {
  root: {
    background: '#ff2a00',
    overflow: 'hidden',
    padding: '22px 0',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  track: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    whiteSpace: 'nowrap',
    width: 'max-content',
    animation: 'сostr-marquee 50s linear infinite',
  },
  text: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 32,
    color: 'white',
    letterSpacing: '0.01em',
    textTransform: 'none',
  },
  bullet: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.55)',
  },
  heart: {
    width: 26,
    height: 18,
    objectFit: 'contain',
    opacity: 0.95,
    flexShrink: 0,
  },
};

Object.assign(window, { Marquee });
