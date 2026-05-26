// AnimalsSection — grid of animals looking for homes, with filter
const ANIMALS = [
{ id: 1, name: 'Тамакти', type: 'Собака', age: '3 года', sex: 'Мальчик', size: 'Крупный', status: 'В приюте 1 год', story: 'Спокойный и преданный пёс. Любит долгие прогулки и тёплые пледы. Знает команды «сидеть» и «дай лапу».', image: 'assets/photos/tamakti.png', cat: 'dogs' },
{ id: 2, name: 'Плюша', type: 'Кошка', age: '4 года', sex: 'Девочка', size: 'Средняя', status: 'В приюте 6 месяцев', story: 'Трёхцветная красавица с большими глазами. Урчит как мотор, обожает уютные лежанки.', image: 'assets/photos/plyusha.jpg', cat: 'cats' },
{ id: 3, name: 'Фоня', type: 'Собака', age: '2 года', sex: 'Мальчик', size: 'Средний', status: 'В приюте 2 года', story: 'Светлый солнечный пёс. Всегда рад людям и долгим разговорам по душам.', image: 'assets/photos/fonya.png', cat: 'dogs' },
{ id: 4, name: 'Лютик', type: 'Собака', age: '5 лет', sex: 'Мальчик', size: 'Средний', status: 'В приюте 4 месяца', story: 'Мудрый компаньон с умными глазами. Идеален для семьи, любит тихие вечера.', image: 'assets/photos/lyutik.png', cat: 'dogs' },
{ id: 5, name: 'Брусника', type: 'Лошадь', age: '8 лет', sex: 'Девочка', size: 'Большая', status: 'В приюте 8 месяцев', story: 'Пегая красавица с белой гривой. Доверяет людям и любит яблоки на ладони.', image: 'assets/photos/brusnika.jpg', cat: 'others' },
{ id: 6, name: 'Одри', type: 'Собака', age: '4 года', sex: 'Девочка', size: 'Средний', status: 'В приюте 1 год', story: 'Активная и весёлая. Любит снег, лес и хорошую компанию на прогулках.', image: 'assets/photos/audry.png', cat: 'dogs' }];


const FILTERS = [
{ id: 'all', label: 'Все' },
{ id: 'cats', label: 'Котики' },
{ id: 'dogs', label: 'Собаки' },
{ id: 'others', label: 'Другие' }];


const AnimalsSection = ({ onSelectAnimal, onOpenMatching }) => {
  const [filter, setFilter] = React.useState('all');
  const visible = filter === 'all' ? ANIMALS : ANIMALS.filter((a) => a.cat === filter);

  return (
    <section style={asStyles.root} id="animals">
      <div style={asStyles.inner}>
        <div style={asStyles.head}>
          <div>
            <div style={asStyles.eyebrow}>Найди друга</div>
            <h2 style={asStyles.heading}>Они ждут именно вас</h2>
            <p style={asStyles.sub}>Каждый из них уже здоровый, привитый и социализированный. Осталось одно — выбрать друг друга.


            </p>
          </div>
          <div style={asStyles.filters}>
            {FILTERS.map((f) =>
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                ...asStyles.filterBtn,
                ...(filter === f.id ? asStyles.filterBtnActive : {})
              }}>
              
                {f.label}
              </button>
            )}
          </div>
        </div>

        <div style={asStyles.grid} className="animals-grid">
          {visible.map((a) =>
          <AnimalCard key={a.id} animal={a} onSelect={() => onSelectAnimal(a)} />
          )}
        </div>

        <div style={asStyles.bottomNote}>
          <img src="assets/photos/plyusha.jpg" alt="" style={{ ...asStyles.bottomImg, objectFit: "contain" }} />
          <div>
            <div style={asStyles.bottomHeading}>Не нашли своего?</div>
            <div style={asStyles.bottomBody}>В приюте сейчас 86 питомцев. Заполните анкету — мы подберём друга по характеру.</div>
          </div>
          <button style={asStyles.bottomBtn} onClick={onOpenMatching}>Анкета на знакомство →</button>
        </div>
      </div>
    </section>);

};

const AnimalCard = ({ animal, onSelect }) => {
  const [hover, setHover] = React.useState(false);
  const a = animal;

  // alternating card backgrounds for visual rhythm
  const bgPalette = ['#fff2ee', '#f0f4f8', '#fdf8f5', '#fff2ee', '#f0f4f8', '#fdf8f5'];
  const bg = bgPalette[(a.id - 1) % bgPalette.length];

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...cardStyles.card,
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ?
        '0 18px 40px rgba(38,21,16,0.16)' :
        '0 4px 16px rgba(38,21,16,0.08)'
      }}>
      
      <div style={{ ...cardStyles.imgWrap, background: bg }}>
        <img src={a.image} alt={a.name} style={cardStyles.img} />
        <span style={cardStyles.statusBadge}>{a.status}</span>
      </div>
      <div style={cardStyles.body}>
        <div style={cardStyles.nameRow}>
          <span style={cardStyles.name}>{a.name}</span>
          <span style={{ ...cardStyles.sex, color: a.sex === 'Мальчик' ? '#7194c5' : '#ff2a00' }} aria-label={a.sex}>
            {a.sex === 'Мальчик' ?
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="14" r="5" />
                <path d="M15 9l5-5" />
                <path d="M15 4h5v5" />
              </svg> :

            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="9" r="5" />
                <path d="M12 14v7" />
                <path d="M9 18h6" />
              </svg>
            }
          </span>
        </div>
        <div style={cardStyles.meta}>{a.type} · {a.age} · {a.size}</div>
        <p style={cardStyles.story}>{a.story}</p>
        <div style={cardStyles.cta}>
          <span>Познакомиться</span>
          <span style={{
            ...cardStyles.arrow,
            transform: hover ? 'translateX(4px)' : 'translateX(0)'
          }}>→</span>
        </div>
      </div>
    </button>);

};

const asStyles = {
  root: { background: '#fdf8f5', padding: '96px 32px 80px' },
  inner: { maxWidth: 1240, margin: '0 auto' },
  head: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 32,
    marginBottom: 48,
    flexWrap: 'wrap'
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
    fontSize: 72,
    color: '#261510',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    marginBottom: 16
  },
  sub: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    color: '#5c4038',
    lineHeight: 1.5,
    maxWidth: 480,
    textWrap: 'pretty'
  },
  filters: {
    display: 'flex',
    gap: 8,
    background: 'white',
    padding: 6,
    borderRadius: 999,
    boxShadow: '0 2px 12px rgba(38,21,16,0.06)'
  },
  filterBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    background: 'transparent',
    color: '#5c4038',
    border: 'none',
    borderRadius: 999,
    padding: '10px 20px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'all 0.15s'
  },
  filterBtnActive: {
    background: '#3e2720',
    color: 'white'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    marginBottom: 48
  },
  bottomNote: {
    background: 'white',
    borderRadius: 24,
    padding: '24px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    boxShadow: '0 4px 20px rgba(38,21,16,0.06)'
  },
  bottomImg: { width: 90, height: 90, objectFit: 'cover', borderRadius: 999, flexShrink: 0 },
  bottomHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 26,
    color: '#261510',
    marginBottom: 4
  },
  bottomBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#5c4038',
    lineHeight: 1.45,
    maxWidth: 540
  },
  bottomBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '14px 28px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    flexShrink: 0,
    marginLeft: 'auto'
  }
};

const cardStyles = {
  card: {
    background: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    width: '100%',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column'
  },
  imgWrap: {
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  statusBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    padding: '6px 14px',
    borderRadius: 999,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    background: 'white',
    color: '#3e2720',
    boxShadow: '0 2px 8px rgba(38,21,16,0.1)'
  },
  body: { padding: '20px 22px 22px' },
  nameRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 },
  name: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 32,
    color: '#120804',
    lineHeight: 1
  },
  sex: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7194c5',
    flexShrink: 0
  },
  meta: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#7d6259',
    marginBottom: 12,
    letterSpacing: '0.01em'
  },
  story: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#3e2720',
    lineHeight: 1.5,
    marginBottom: 16,
    minHeight: 66,
    textWrap: 'pretty'
  },
  cta: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: '#ff2a00',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  arrow: { transition: 'transform 0.2s', display: 'inline-block' }
};

Object.assign(window, { AnimalsSection, ANIMALS });