// FAQ — frequently asked questions
// NOTE: faqStyles is referenced inside FAQ_ITEMS' JSX, which is evaluated at module
// load time — so it must be declared first.
const faqStyles = {
  root: { background: '#fff2ee', padding: '96px 32px', position: 'relative', overflow: 'hidden' },
  inner: { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'end',
    gap: 40,
    marginBottom: 56
  },
  headText: { maxWidth: 720 },
  eyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 14
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 84,
    color: '#261510',
    lineHeight: 0.92,
    letterSpacing: '-0.02em',
    margin: '0 0 22px 0'
  },
  lede: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    lineHeight: 1.5,
    color: '#5b4038',
    margin: 0,
    maxWidth: 520,
    textWrap: 'pretty'
  },
  illoWrap: {
    width: 220,
    height: 220,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexShrink: 0
  },
  illo: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    transform: 'rotate(-6deg)'
  },

  list: {
    background: 'white',
    borderRadius: 28,
    overflow: 'hidden',
    boxShadow: '0 8px 28px rgba(38,21,16,0.08)'
  },
  item: {
    borderBottom: '1px solid #e8ddd6'
  },
  qBtn: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: '28px 32px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: 24,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.15s'
  },
  qNum: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: '#ff2a00',
    letterSpacing: '0.04em',
    lineHeight: 1
  },
  qText: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    color: '#261510',
    letterSpacing: '-0.005em',
    lineHeight: 1.15
  },
  qToggle: {
    width: 44,
    height: 44,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1,
    transition: 'background 0.2s, color 0.2s, transform 0.3s ease',
    flexShrink: 0
  },

  aWrap: {
    display: 'grid',
    transition: 'grid-template-rows 0.32s ease'
  },
  a: {
    padding: '0 32px 32px 86px',
    fontFamily: "'Patefon',Georgia,serif",
    color: '#3e2720',
    fontSize: 17,
    lineHeight: 1.6,
    maxWidth: 880
  },
  p: { margin: '0 0 12px 0', textWrap: 'pretty' },
  ol: {
    margin: 0,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  listHead: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    margin: '18px 0 12px'
  },
  checklist: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px 28px'
  },
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 16,
    lineHeight: 1.45
  },
  checkDot: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    color: '#ff2a00',
    fontSize: 18,
    lineHeight: 1.4,
    flexShrink: 0,
    width: 16,
    display: 'inline-block'
  },

  footer: {
    marginTop: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    flexWrap: 'wrap'
  },
  footerText: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    color: '#5b4038'
  },
  footerLink: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: '#ff2a00',
    letterSpacing: '0.02em',
    borderBottom: '2px solid #ff2a00',
    paddingBottom: 2,
    transition: 'opacity 0.15s'
  }
};

const FAQ_ITEMS = [
{
  id: 'about',
  q: 'Что такое Фонд «Сострадание НН»?',
  body:
  <p style={faqStyles.p}>
        Нижегородский Благотворительный Фонд Защиты Животных «Сострадание&nbsp;НН» — организация,
        чья деятельность направлена на помощь бездомным животным и лошадям в Нижнем&nbsp;Новгороде.
        Фонд содержит приют на <b>200&nbsp;собак</b> и <b>50&nbsp;кошек</b> и опекает
        <b> 10&nbsp;спасённых с бойни лошадей.</b>
      </p>

},
{
  id: 'how-to-adopt',
  q: 'Как взять животное из приюта?',
  body:
  <ol style={faqStyles.ol}>
        <li>
          Заранее подумайте, с каким животным вам и вашей семье будет комфортно: с активным или
          спокойным, должен ли он ладить с детьми или уже имеющимися питомцами.
        </li>
        <li>
          Выберите животное или нескольких в каталоге собак и кошек — и свяжитесь с нами.
        </li>
        <li>
          Познакомьтесь с животным в приюте и пройдите собеседование на роль хозяина.
          Мы рекомендуем несколько раз приехать в гости, чтобы установить дружескую связь
          и понять характер животного. Не беспокойтесь — вашего нового члена семьи не отдадут
          другим, если встреча прошла позитивно и вы сообщите нам о серьёзности своих намерений.
        </li>
        <li>
          После встречи подумайте над своим выбором, поспите и примите решение на свежую голову,
          без эмоций. Сообщите нам о принятом решении.
        </li>
        <li>
          Подписав документ передачи животного, вы получите паспорт с отметками о вакцинации
          и нового члена семьи. Поздравляем с пополнением!
        </li>
      </ol>

},
{
  id: 'home-dog',
  q: 'Как подготовить дом к появлению собаки?',
  body:
  <div>
        <p style={faqStyles.p}>
          На первое время уберите хрупкие и опасные для собаки вещи из зоны досягаемости
          (цветочные горшки, провода). После периода адаптации их можно вернуть на место.
          Собаке требуется несколько дней, чтобы привыкнуть к туалету на улице — на это время
          уберите ковры с пола.
        </p>
        <div style={faqStyles.listHead}>Что купить</div>
        <ul style={faqStyles.checklist}>
          {[
      'Адресник с именем собаки и вашими контактами + яркий шнурок для адресника',
      'Яркая, надёжная и удобная Н-образная шлейка',
      'Поводок не менее 5 метров (не рулетка)',
      'Миски для воды и еды',
      'Корм и специальные лакомства',
      'Шампунь, расчёска-пуходёрка или фурминатор',
      'Полотенце',
      'Несколько разных игрушек',
      'Место для сна — лежак или плед',
      'Когтерезка',
      'Весной, летом и осенью — средства от клещей'].
      map((t, i) =>
      <li key={i} style={faqStyles.checkItem}>
              <span style={faqStyles.checkDot}>•</span>
              <span>{t}</span>
            </li>
      )}
        </ul>
      </div>

},
{
  id: 'home-cat',
  q: 'Как подготовить дом к появлению кошки?',
  body:
  <div>
        <p style={faqStyles.p}>
          Рекомендуем почитать книгу <i>«Котологика, о чём молчит кошка»</i>,
          чтобы понимать, что же задумал ваш кот.
        </p>
        <div style={faqStyles.listHead}>Что купить</div>
        <ul style={faqStyles.checklist}>
          {[
      'Адресник с именем кошки и вашими контактами + яркий шнурок',
      'Миски для воды и еды',
      'Корм и специальные лакомства',
      'Лоток и наполнитель',
      'Когтеточка',
      'Шампунь, расчёска-пуходёрка или фурминатор',
      'Полотенце',
      'Несколько разных игрушек',
      'Место для сна — лежак или плед',
      'Средства от блох — таблетки, капли, ошейник',
      'Переноска'].
      map((t, i) =>
      <li key={i} style={faqStyles.checkItem}>
              <span style={faqStyles.checkDot}>•</span>
              <span>{t}</span>
            </li>
      )}
        </ul>
      </div>

},
{
  id: 'vaccines',
  q: 'Стерилизованы и привиты ли животные в приюте?',
  body:
  <p style={faqStyles.p}>
        Да. Все животные в обязательном порядке стерилизуются и чипируются отловом
        перед тем, как попадают в приют. Каждый год животные проходят обязательную
        вакцинацию от бешенства и комплекса вирусов. У волонтёра есть паспорт
        на каждое животное с подтверждением вакцинации.
      </p>

},
{
  id: 'checklist',
  q: 'Чек-лист ответственного хозяина',
  body:
  <ul style={faqStyles.checklist}>
        {[
    'Вы осознаёте, что адаптация и воспитание животного потребуют времени и терпения, а иногда финансовых затрат.',
    'Если вы живёте на съёмной квартире — арендодатель не против животных. При смене квартиры вы готовы искать жильё, где вас примут с питомцем.',
    'Вы понимаете, что собаке требуются регулярные прогулки в любую погоду, а котик иногда будет делать ночной тыгдык по квартире.',
    'Потребности животного не станут отягчающими для вашего бюджета.',
    'В вашем окружении нет людей, которые были бы против животного — даже если эти люди не живут с вами постоянно.'].
    map((t, i) =>
    <li key={i} style={faqStyles.checkItem}>
            <span style={{ ...faqStyles.checkDot, color: '#ff2a00' }}>✓</span>
            <span>{t}</span>
          </li>
    )}
      </ul>

},
{
  id: 'project',
  q: 'Что за проект «Мы в ответе за тех, кого приручили»?',
  body:
  <p style={faqStyles.p}>
        В Благотворительном Фонде «Сострадание&nbsp;НН» проходит проект
        <b> «Мы в ответе за тех, кого приручили»</b> — победитель городского конкурса
        <i> «Открытый Нижний»</i>, реализуемый при поддержке администрации Нижнего&nbsp;Новгорода.
        Цель проекта — сделать ветеринарные процедуры доступными для социально незащищённых
        слоёв населения и их питомцев.
      </p>

}];


const FAQ = () => {
  const [open, setOpen] = React.useState('about');

  const toggle = (id) => setOpen((prev) => prev === id ? null : id);

  return (
    <section style={faqStyles.root} id="faq">
      <div style={faqStyles.inner}>
        <div style={faqStyles.head} className="faq-head">
          <div style={faqStyles.headText}>
            <div style={faqStyles.eyebrow}>Часто задаваемые вопросы</div>
            <h2 style={faqStyles.heading}>
              О чём спрашивают<br />
              <span style={{ color: '#ff2a00' }}>будущие хозяева</span>
            </h2>
            <p style={faqStyles.lede}>Если не нашли ответа — напишите нам в Telegram или Вконтакте, мы расскажем всё подробно про конкретное животное.


            </p>
          </div>
          <div style={faqStyles.illoWrap} className="faq-illo">
            <img src="assets/dog-running.png" alt="" style={faqStyles.illo} />
          </div>
        </div>

        <div style={faqStyles.list}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <div
                key={item.id}
                style={{
                  ...faqStyles.item,
                  borderTop: i === 0 ? '1px solid #e8ddd6' : 'none'
                }}>
                
                <button
                  type="button"
                  style={faqStyles.qBtn}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="faq-qbtn">
                  
                  <span style={faqStyles.qNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={faqStyles.qText}>{item.q}</span>
                  <span
                    style={{
                      ...faqStyles.qToggle,
                      background: isOpen ? '#ff2a00' : '#fdf8f5',
                      color: isOpen ? 'white' : '#3e2720',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                    aria-hidden="true">
                    
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  style={{
                    ...faqStyles.aWrap,
                    gridTemplateRows: isOpen ? '1fr' : '0fr'
                  }}>
                  
                  <div style={{ overflow: 'hidden' }}>
                    <div style={faqStyles.a}>{item.body}</div>
                  </div>
                </div>
              </div>);

          })}
        </div>

        <div style={faqStyles.footer}>
          <span style={faqStyles.footerText}>Остались вопросы?</span>
          <a href="#" style={faqStyles.footerLink}>Написать нам →</a>
        </div>
      </div>
    </section>);

};

Object.assign(window, { FAQ });