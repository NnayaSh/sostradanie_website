// ShelterLife — Instagram-style stories from the shelter
const SHELTER_STORIES = [
  {
    id: 'day',
    title: 'День Сострадания 2026',
    subtitle: 'Как это было',
    badge: 'Будни',
    video: 'assets/videos/day.mp4',
    accent: '#ff2a00',
  },
  {
    id: 'puppies',
    title: 'Новые щенки',
    subtitle: 'Только приехали',
    badge: 'Новички',
    video: 'assets/videos/puppies.mp4',
    accent: '#ff7a3d',
  },
  {
    id: 'cats',
    title: 'Заглянули к котикам',
    subtitle: 'А они выглянули к нам',
    badge: 'Котики',
    video: 'assets/videos/cats.mp4',
    accent: '#e54a1a',
  },
  {
    id: 'subbotnik',
    title: 'Субботник',
    subtitle: 'Волонтёры приехали',
    badge: 'Команда',
    video: 'assets/videos/subbotnik.mp4',
    accent: '#3e2720',
  },
];

const ShelterLife = () => {
  const [openIdx, setOpenIdx] = React.useState(null);

  return (
    <section style={slStyles.root} id="shelter-life">
      <div style={slStyles.inner}>
        <div style={slStyles.head}>
          <div>
            <div style={slStyles.eyebrow}>Жизнь приюта</div>
            <h2 style={slStyles.heading}>Как у нас дела</h2>
            <p style={slStyles.lede}>
              Заглядывайте к нам почаще — обычный день, новые лица, и&nbsp;то, что происходит за&nbsp;кадром.
              Снято волонтёрами на&nbsp;телефон.
            </p>
          </div>
          <div style={slStyles.liveBadge}>
            <span style={slStyles.liveDot}></span>
            Свежее
          </div>
        </div>

        <div style={slStyles.rail} className="sl-rail">
          {SHELTER_STORIES.map((s, i) => (
            <StoryAvatar
              key={s.id}
              story={s}
              onClick={() => setOpenIdx(i)}
            />
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <StoryViewer
          stories={SHELTER_STORIES}
          startIdx={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </section>
  );
};

// ── Avatar ─────────────────────────────────────────────────────
const StoryAvatar = ({ story, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={slStyles.avatarBtn}
      aria-label={`Открыть историю: ${story.title}`}
    >
      <div style={{
        ...slStyles.avatarRing,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        boxShadow: hover ? '0 14px 32px rgba(255,42,0,0.28)' : '0 6px 18px rgba(38,21,16,0.14)',
      }}>
        <div style={slStyles.avatarInner}>
          <video
            src={story.video}
            muted
            playsInline
            preload="metadata"
            style={slStyles.avatarVideo}
          />
        </div>
        <span style={{ ...slStyles.avatarBadge, background: story.accent }}>
          {story.badge}
        </span>
      </div>
      <div style={slStyles.avatarTitle}>{story.title}</div>
      <div style={slStyles.avatarSub}>{story.subtitle}</div>
    </button>
  );
};

// ── Full-screen viewer ─────────────────────────────────────────
const StoryViewer = ({ stories, startIdx, onClose }) => {
  const [idx, setIdx] = React.useState(startIdx);
  const [progress, setProgress] = React.useState(0); // 0..1 for current
  const [paused, setPaused] = React.useState(false);
  const videoRef = React.useRef(null);

  const story = stories[idx];

  // body scroll lock
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); setPaused(p => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx]);

  // reset on story change
  React.useEffect(() => {
    setProgress(0);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [idx]);

  // pause/resume
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  const next = () => {
    setIdx(i => {
      if (i >= stories.length - 1) { onClose(); return i; }
      return i + 1;
    });
  };
  const prev = () => {
    setIdx(i => (i > 0 ? i - 1 : 0));
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  return (
    <div style={vStyles.overlay} onClick={onClose}>
      {/* prev arrow (desktop) */}
      <button
        type="button"
        style={{ ...vStyles.arrow, left: 24 }}
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Предыдущая история"
      >‹</button>

      <div style={vStyles.stage} onClick={(e) => e.stopPropagation()}>
        {/* Progress bars */}
        <div style={vStyles.progressRow}>
          {stories.map((_, i) => (
            <div key={i} style={vStyles.progressTrack}>
              <div style={{
                ...vStyles.progressFill,
                width: i < idx ? '100%' : i === idx ? `${progress * 100}%` : '0%',
                background: i <= idx ? 'white' : 'rgba(255,255,255,0.35)',
              }}></div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={vStyles.header}>
          <div style={vStyles.headerLeft}>
            <div style={{ ...vStyles.headerAvatar, background: story.accent }}>
              <img src="assets/logo.svg" alt="" style={vStyles.headerLogo} />
            </div>
            <div>
              <div style={vStyles.headerTitle}>Сострадание</div>
              <div style={vStyles.headerMeta}>{story.title} · только что</div>
            </div>
          </div>
          <div style={vStyles.headerRight}>
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              style={vStyles.headerIcon}
              aria-label={paused ? 'Воспроизвести' : 'Пауза'}
            >
              {paused ? '▶' : '❚❚'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={vStyles.headerIcon}
              aria-label="Закрыть"
            >×</button>
          </div>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src={story.video}
          autoPlay
          playsInline
          muted={false}
          onTimeUpdate={onTimeUpdate}
          onEnded={next}
          style={vStyles.video}
        />

        {/* Tap zones (mobile) */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{ ...vStyles.tapZone, left: 0 }}
          aria-label="Назад"
        ></button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{ ...vStyles.tapZone, right: 0 }}
          aria-label="Вперёд"
        ></button>

        {/* Caption */}
        <div style={vStyles.caption}>
          <div style={vStyles.captionTitle}>{story.title}</div>
          <div style={vStyles.captionSub}>{story.subtitle}</div>
        </div>
      </div>

      {/* next arrow (desktop) */}
      <button
        type="button"
        style={{ ...vStyles.arrow, right: 24 }}
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Следующая история"
      >›</button>
    </div>
  );
};

// ── Styles ─────────────────────────────────────────────────────
const slStyles = {
  root: { background: '#fdf8f5', padding: '96px 32px 80px', position: 'relative' },
  inner: { maxWidth: 1240, margin: '0 auto' },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 48,
    flexWrap: 'wrap',
  },
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
    fontSize: 64,
    color: '#261510',
    lineHeight: 0.96,
    letterSpacing: '-0.02em',
    marginBottom: 16,
  },
  lede: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    lineHeight: 1.55,
    color: '#5c443c',
    maxWidth: 560,
    margin: 0,
    textWrap: 'pretty',
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    background: 'white',
    padding: '8px 14px',
    borderRadius: 999,
    boxShadow: '0 2px 8px rgba(38,21,16,0.06)',
    marginTop: 6,
  },
  liveDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#ff2a00',
    boxShadow: '0 0 0 0 rgba(255,42,0,0.6)',
    animation: 'sl-pulse 1.6s ease-out infinite',
  },
  rail: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 28,
  },
  avatarBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
  },
  avatarRing: {
    width: '100%',
    aspectRatio: '1 / 1',
    maxWidth: 220,
    borderRadius: '50%',
    padding: 5,
    background: 'conic-gradient(from 130deg, #ff2a00, #ff7a3d, #ffb38a, #ff2a00)',
    position: 'relative',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    boxShadow: '0 6px 18px rgba(38,21,16,0.14)',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#261510',
    border: '4px solid #fdf8f5',
    boxSizing: 'border-box',
  },
  avatarVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'white',
    padding: '5px 12px',
    borderRadius: 999,
    border: '2px solid #fdf8f5',
    whiteSpace: 'nowrap',
  },
  avatarTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: '#261510',
    letterSpacing: '-0.005em',
    marginTop: 6,
    textAlign: 'center',
  },
  avatarSub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#7d6259',
    textAlign: 'center',
    marginTop: -8,
  },
};

const vStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(20,10,6,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stage: {
    position: 'relative',
    width: 'min(420px, 92vw)',
    height: 'min(92vh, 760px)',
    aspectRatio: '9 / 16',
    borderRadius: 22,
    overflow: 'hidden',
    background: '#000',
    boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
  },
  progressRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    display: 'flex',
    gap: 6,
    zIndex: 3,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    background: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'white',
    transition: 'width 0.12s linear',
  },
  header: {
    position: 'absolute',
    top: 28,
    left: 14,
    right: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
    paddingTop: 6,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 36, height: 36, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid rgba(255,255,255,0.85)',
    flexShrink: 0,
  },
  headerLogo: { width: 22, height: 'auto' },
  headerTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    color: 'white',
    letterSpacing: '0.02em',
    lineHeight: 1.1,
  },
  headerMeta: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.2,
    marginTop: 2,
  },
  headerRight: { display: 'flex', gap: 8 },
  headerIcon: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'rgba(255,255,255,0.14)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    background: '#000',
  },
  tapZone: {
    position: 'absolute',
    top: 80,
    bottom: 100,
    width: '40%',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
  },
  caption: {
    position: 'absolute',
    left: 16, right: 16, bottom: 18,
    padding: '14px 18px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
    borderRadius: 16,
    zIndex: 3,
    pointerEvents: 'none',
  },
  captionTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 26,
    color: 'white',
    letterSpacing: '-0.005em',
    lineHeight: 1,
  },
  captionSub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 48, height: 48,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: 32,
    lineHeight: 0.8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit',
    zIndex: 1001,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  },
};

// inject the pulse keyframes + responsive rail tweaks once
if (typeof document !== 'undefined' && !document.getElementById('sl-styles')) {
  const tag = document.createElement('style');
  tag.id = 'sl-styles';
  tag.textContent = `
    @keyframes sl-pulse {
      0% { box-shadow: 0 0 0 0 rgba(255,42,0,0.55); }
      70% { box-shadow: 0 0 0 12px rgba(255,42,0,0); }
      100% { box-shadow: 0 0 0 0 rgba(255,42,0,0); }
    }
    @media (max-width: 760px) {
      #shelter-life { padding: 64px 20px !important; }
      #shelter-life h2 { font-size: 44px !important; }
      .sl-rail {
        display: flex !important;
        gap: 18px !important;
        overflow-x: auto !important;
        scroll-snap-type: x mandatory;
        padding: 8px 4px 12px !important;
        margin: 0 -20px;
        padding-left: 20px !important;
        padding-right: 20px !important;
        -webkit-overflow-scrolling: touch;
      }
      .sl-rail::-webkit-scrollbar { display: none; }
      .sl-rail > button {
        flex: 0 0 140px;
        scroll-snap-align: start;
      }
    }
    @media (max-width: 480px) {
      .sl-rail > button { flex: 0 0 120px; }
    }
  `;
  document.head.appendChild(tag);
}

Object.assign(window, { ShelterLife });
