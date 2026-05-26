// HowToHelp — alternative ways to help besides money
const HOW_ITEMS = [
  {
    id: 'adopt',
    label: 'Забрать домой',
    headline: 'Дать дом',
    body: 'Самый большой подарок — забрать животное к себе. Мы поможем с транспортом и адаптацией.',
    cta: 'Посмотреть питомцев',
    illo: 'assets/dog-sitting.png',
    color: '#ff2a00',
    fg: 'white',
  },
  {
    id: 'foster',
    label: 'Передержка',
    headline: 'Принять на пару недель',
    body: 'Когда мест в приюте не хватает, временный дом — это уже спасение. На неделю, на месяц — как удобно вам.',
    cta: 'Стать передержкой',
    illo: 'assets/cat-loaf.png',
    color: '#fdf8f5',
    fg: '#261510',
  },
  {
    id: 'volunteer',
    label: 'Волонтёрство',
    headline: 'Прийти в гости',
    body: 'Гулять, чесать за ушами, помогать с уборкой. Несколько часов в месяц меняют чью-то жизнь.',
    cta: 'Записаться',
    illo: 'assets/dog-running.png',
    color: '#3e2720',
    fg: 'white',
  },
  {
    id: 'supplies',
    label: 'Передать вещи',
    headline: 'Принести нужное',
    body: 'Старые пледы, корм, лотки, шампуни. Всё, что лежит без дела дома, в приюте делает кого-то счастливее.',
    cta: 'Список нужного',
    illo: 'assets/cat-running.png',
    color: '#B6D1F2',
    fg: '#261510',
  },
  {
    id: 'news',
    label: 'Следите за новостями',
    headline: 'Помочь по запросу',
    body: 'Иногда нужен трактор для чистки территории, грузовик с сеном или новые вольеры. Подпишитесь — расскажем, когда нужна именно ваша помощь.',
    cta: 'Подписаться на новости',
    illo: 'assets/horse-running.png',
    color: '#7194C5',
    fg: 'white',
  },
];

const HowToHelp = () => {
  return (
    <section style={helpStyles.root} id="howto">
      <div style={helpStyles.inner}>
        <div style={helpStyles.head}>
          <div style={helpStyles.eyebrow}>Помочь по-разному</div>
          <h2 style={helpStyles.heading}>Не только деньгами</h2>
          <p style={helpStyles.sub}>
            Помощь начинается с маленького. Время, тёплый плед, прогулка — всё это уже забота.
          </p>
        </div>
        <div style={helpStyles.grid} className="help-grid">
          {HOW_ITEMS.map((it, i) => (
            <HelpCard key={it.id} item={it} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HelpCard = ({ item, large }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...helpStyles.card,
        background: item.color,
        color: item.fg,
        gridColumn: large ? 'span 2' : 'span 1',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 16px 36px rgba(38,21,16,0.18)'
          : '0 4px 16px rgba(38,21,16,0.08)',
      }}
    >
      <div
        className="help-card-content"
        style={helpStyles.cardContent}>
        <div style={{
          ...helpStyles.cardLabel,
          color: item.fg === 'white' ? 'rgba(255,255,255,0.65)' : '#7d6259',
        }}>
          <svg width="14" height="10" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 8 }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg>{item.label}
        </div>
        <div style={{
          ...helpStyles.cardHeading,
          fontSize: large ? 56 : 38,
          color: item.fg,
        }}>
          {item.headline}
        </div>
        <p style={{
          ...helpStyles.cardBody,
          color: item.fg === 'white' ? 'rgba(255,255,255,0.85)' : '#5c4038',
          maxWidth: large ? 380 : '100%',
        }}>
          {item.body}
        </p>
        <div style={{
          ...helpStyles.cardCta,
          background: item.fg === 'white' ? 'rgba(255,255,255,0.12)' : 'rgba(255,42,0,0.10)',
          color: item.fg === 'white' ? 'white' : '#ff2a00',
          borderColor: item.fg === 'white' ? 'rgba(255,255,255,0.25)' : 'transparent',
        }}>
          {item.cta}
          <span style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s' }}>→</span>
        </div>
      </div>
      <img
        src={item.illo}
        alt=""
        style={{
          ...helpStyles.cardIllo,
          width: large ? 280 : 180,
          right: large ? -20 : -20,
          bottom: large ? -10 : -10,
        }}
      />
    </div>
  );
};

const helpStyles = {
  root: { background: '#f5ede8', padding: '96px 32px' },
  inner: { maxWidth: 1240, margin: '0 auto' },
  head: { maxWidth: 700, marginBottom: 48 },
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
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    marginBottom: 16,
  },
  sub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    color: '#5c4038',
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  card: {
    borderRadius: 24,
    padding: '32px',
    minHeight: 280,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: { position: 'relative', zIndex: 2 },
  cardLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  cardHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    lineHeight: 0.98,
    letterSpacing: '-0.02em',
    marginBottom: 16,
  },
  cardBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    lineHeight: 1.5,
    marginBottom: 24,
    textWrap: 'pretty',
  },
  cardCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    padding: '10px 18px',
    borderRadius: 999,
    border: '1px solid transparent',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  cardIllo: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    objectFit: 'contain',
    filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.18))',
    zIndex: 1,
  },
};

Object.assign(window, { HowToHelp });
