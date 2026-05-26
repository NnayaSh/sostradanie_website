// Newsletter + Footer combined
const NewsletterFooter = () => {
  const [email, setEmail] = React.useState('');
  return (
    <React.Fragment>
      <section style={nfStyles.newsletter} id="about">
        <div style={nfStyles.nlInner} className="nl-grid">
          <img src="assets/cat-running.png" alt="" style={nfStyles.nlImg} />
          <div style={nfStyles.nlText}>
            <div style={nfStyles.nlEyebrow}>Письма раз в месяц</div>
            <h2 style={nfStyles.nlHeading}>
              Новые друзья,<br />хорошие новости
            </h2>
            <p style={nfStyles.nlBody}>Раз в месяц — короткое письмо. Кто нашёл дом, как дела у тех, кто ещё ждёт, и куда идут пожертвования. Без спама.

            </p>
            <form
              onSubmit={(e) => {e.preventDefault();setEmail('');alert('Спасибо! Скоро напишем.');}}
              style={nfStyles.form}>
              
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@email.ru"
                style={nfStyles.input} />
              
              <button type="submit" style={nfStyles.submit}>Подписаться</button>
            </form>
          </div>
        </div>
      </section>

      <footer style={nfStyles.footer}>
        <div style={nfStyles.fInner} className="footer-grid">
          <div style={nfStyles.fBrand}>
            <img src="assets/logo.svg" alt="Сострадание" style={nfStyles.fLogo} />
            <p style={nfStyles.fTagline}>
              Помогаем животным находить заботливые дома с 2018 года.
            </p>
            <div style={nfStyles.fSocials}>
              {['VK'].map((s) =>
              <a key={s} href="#" style={nfStyles.fSocial}>{s}</a>
              )}
            </div>
          </div>
          <div style={nfStyles.fCols} className="footer-cols">
            {[
            { title: 'Питомцы', links: ['Котики', 'Собаки', 'Лошади', 'Все животные'] },
            { title: 'Помочь', links: ['Пожертвовать', 'Передержка', 'Волонтёрство', 'Корм и вещи'] },
            { title: 'Фонд', links: ['О нас', 'Команда', 'Отчёты', 'Документы'] },
            { title: 'Связь', links: ['Нижний Новгород, Бурнаковский проезд, 16', '+7 831 231-31-13', 'sostradanie.nn@gmail.com', 'Часы работы: 11–19'] }].
            map((col) =>
            <div key={col.title} style={nfStyles.fCol}>
                <div style={nfStyles.fColTitle}>{col.title}</div>
                {col.links.map((l) =>
              <a key={l} href="#" style={nfStyles.fLink}>{l}</a>
              )}
              </div>
            )}
          </div>
        </div>
        <div style={nfStyles.fBottom}>
          <span style={nfStyles.fCopy}>© 2026 Фонд «Сострадание». Все права защищены.</span>
          <span style={nfStyles.fCopy}>Сделано с заботой 🐾</span>
        </div>
      </footer>
    </React.Fragment>);

};

const nfStyles = {
  newsletter: {
    background: '#ff2a00',
    padding: '80px 32px',
    overflow: 'hidden'
  },
  nlInner: {
    maxWidth: 1240,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '0.7fr 1fr',
    gap: 48,
    alignItems: 'center'
  },
  nlImg: {
    width: '100%',
    maxWidth: 380,
    objectFit: 'contain',
    filter: 'drop-shadow(0 24px 36px rgba(0,0,0,0.25))',
    transform: 'rotate(-6deg)',
    justifySelf: 'center'
  },
  nlText: {},
  nlEyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 14
  },
  nlHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 72,
    color: 'white',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    marginBottom: 16
  },
  nlBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.5,
    marginBottom: 28,
    maxWidth: 520,
    textWrap: 'pretty'
  },
  form: {
    display: 'flex',
    gap: 8,
    background: 'white',
    padding: 6,
    borderRadius: 999,
    maxWidth: 480,
    boxShadow: '0 8px 24px rgba(168,12,0,0.25)'
  },
  input: {
    flex: 1,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    border: 'none',
    outline: 'none',
    padding: '0 18px',
    color: '#3e2720',
    background: 'transparent'
  },
  submit: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    background: '#3e2720',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '12px 28px',
    cursor: 'pointer',
    letterSpacing: '0.04em'
  },
  footer: { background: '#261510', paddingTop: 64 },
  fInner: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 32px 64px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 64
  },
  fBrand: {},
  fLogo: { height: 40, marginBottom: 20 },
  fTagline: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.5,
    marginBottom: 24,
    maxWidth: 280
  },
  fSocials: { display: 'flex', gap: 10 },
  fSocial: {
    width: 40, height: 40, borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    color: 'white',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontSize: 13,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    letterSpacing: '0.05em'
  },
  fCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 32
  },
  fCol: { display: 'flex', flexDirection: 'column', gap: 12 },
  fColTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 4
  },
  fLink: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: 'rgba(255,255,255,0.72)',
    textDecoration: 'none'
  },
  fBottom: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '20px 32px',
    maxWidth: 1240,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12
  },
  fCopy: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)'
  }
};

Object.assign(window, { NewsletterFooter });