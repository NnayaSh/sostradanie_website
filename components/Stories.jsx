// Stories — happy adoption testimonials, no pity
const STORIES = [
{
  id: 1,
  name: 'Вельвет',
  family: 'Новый дом',
  when: 'Дома 8 месяцев',
  quote: 'Вельвет выбрал нас сам — пришёл, сел на руки и остался. Теперь будит по утрам и провожает на работу.',
  image: 'assets/photos/velvet.jpg',
  bg: '#fff2ee'
},
{
  id: 2,
  name: 'Тони',
  family: 'Анна и Костя',
  when: 'Дома 1 год',
  quote: 'Думали, не справимся со взрослой собакой. А он оказался самым деликатным существом, которое мы знали. И лучшим другом для сына.',
  image: 'assets/photos/tony.jpg',
  bg: '#f0f4f8'
},
{
  id: 3,
  name: 'Марс',
  family: 'Конюшня «Заря»',
  when: 'Дома 2 года',
  quote: 'Боялся людей. Сейчас сам приходит на руки, как только слышит наши шаги. Рыжий король дома.',
  image: 'assets/photos/mars.jpg',
  bg: '#fdf8f5'
}];


const Stories = () => {
  const [active, setActive] = React.useState(0);
  const story = STORIES[active];

  return (
    <section style={stStyles.root} id="stories">
      <div style={stStyles.inner}>
        <div style={stStyles.head}>
          <div>
            <div style={stStyles.eyebrow}>Счастливые истории</div>
            <h2 style={stStyles.heading}>А потом они нашли друг друга</h2>
          </div>
          <div style={stStyles.dots}>
            {STORIES.map((_, i) =>
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                ...stStyles.dot,
                background: i === active ? '#ff2a00' : '#cfc2b8',
                width: i === active ? 32 : 12,
                minWidth: i === active ? 32 : 12
              }}
              aria-label={`История ${i + 1}`} />

            )}
          </div>
        </div>

        <div style={{ ...stStyles.card, background: story.bg }} className="stories-grid">
          <div style={stStyles.imgSide}>
            <img src={story.image} alt={story.name} style={stStyles.img} />
          </div>
          <div style={stStyles.textSide}>
            <div style={stStyles.quoteMark}>“</div>
            <p style={stStyles.quote}>{story.quote}</p>
            <div style={stStyles.byline}>
              <div style={stStyles.bylineName}>{story.name}</div>
              <div style={stStyles.bylineMeta}>{story.family} · {story.when}</div>
            </div>
            <div style={stStyles.nav}>
              <button
                style={stStyles.navBtn}
                onClick={() => setActive((active - 1 + STORIES.length) % STORIES.length)}>
                ←</button>
              <button
                style={stStyles.navBtn}
                onClick={() => setActive((active + 1) % STORIES.length)}>
                →</button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

const stStyles = {
  root: { background: '#fdf8f5', padding: '56px 32px' },
  inner: { maxWidth: 1240, margin: '0 auto' },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 20
  },
  eyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 12
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 48,
    color: '#261510',
    lineHeight: 0.96,
    letterSpacing: '-0.02em'
  },
  dots: { display: 'flex', gap: 8, alignItems: 'center', position: 'relative', zIndex: 5 },
  dot: {
    height: 10, borderRadius: 999, border: 'none', cursor: 'pointer',
    transition: 'all 0.25s',
    padding: 0,
    pointerEvents: 'auto'
  },
  card: {
    borderRadius: 32,
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '0.85fr 1fr',
    height: 400,
    minHeight: 400,
    boxShadow: '0 8px 28px rgba(38,21,16,0.08)'
  },
  imgSide: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 0,
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  textSide: {
    background: 'white',
    padding: '28px 40px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  quoteMark: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontSize: 72,
    color: '#ff2a00',
    lineHeight: 0.4,
    marginBottom: 8
  },
  quote: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 19,
    lineHeight: 1.4,
    color: '#261510',
    marginBottom: 16,
    textWrap: 'pretty',
    fontStyle: 'italic'
  },
  byline: { marginBottom: 14 },
  bylineName: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: '#261510',
    lineHeight: 1,
    marginBottom: 4
  },
  bylineMeta: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#7d6259'
  },
  nav: { display: 'flex', gap: 10 },
  navBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontSize: 18,
    background: '#fdf8f5',
    color: '#3e2720',
    border: 'none',
    width: 36, height: 36, borderRadius: 999,
    cursor: 'pointer',
    transition: 'background 0.15s'
  }
};

Object.assign(window, { Stories });