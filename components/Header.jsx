// Header — Сострадание
const Header = ({ activePage = 'home', onNav }) => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= 760 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'animals', label: 'Питомцы' },
    { id: 'help', label: 'Как помочь' },
    { id: 'stories', label: 'Истории' },
    { id: 'life', label: 'Жизнь приюта' },
    { id: 'about', label: 'Новости' },
  ];

  const handleNav = (id) => {
    setOpen(false);
    onNav?.(id);
  };

  return (
    <header style={headerStyles.root}>
      <div style={headerStyles.inner} className="header-inner">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }} style={headerStyles.logoLink}>
          <img src="assets/logo.svg" alt="Сострадание" style={headerStyles.logo} />
        </a>

        {!isMobile && (
          <nav style={headerStyles.nav}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
                style={{
                  ...headerStyles.navLink,
                  ...(activePage === item.id ? headerStyles.navLinkActive : {}),
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {!isMobile && (
          <button style={headerStyles.cta} onClick={() => handleNav('help')}>Помочь сейчас</button>
        )}

        {isMobile && (
          <button
            style={headerStyles.burger}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            <span style={{ ...headerStyles.burgerLine, transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
            <span style={{ ...headerStyles.burgerLine, opacity: open ? 0 : 1 }}></span>
            <span style={{ ...headerStyles.burgerLine, transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
          </button>
        )}
      </div>

      {isMobile && open && (
        <div style={headerStyles.drawer}>
          <nav style={headerStyles.drawerNav}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
                style={{
                  ...headerStyles.drawerLink,
                  ...(activePage === item.id ? headerStyles.drawerLinkActive : {}),
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button style={headerStyles.drawerCta} onClick={() => handleNav('help')}>
            Помочь сейчас
          </button>
        </div>
      )}
    </header>
  );
};

const headerStyles = {
  root: {
    background: '#3e2720',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(38,21,16,0.18)',
  },
  inner: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 32px',
    height: 76,
    display: 'flex',
    alignItems: 'center',
    gap: 40,
  },
  logoLink: { display: 'flex', alignItems: 'center', flexShrink: 0, marginRight: 'auto' },
  logo: { height: 38 },
  nav: {
    display: 'flex',
    gap: 32,
    flex: 1,
  },
  navLink: {
    fontFamily: "'JonovaCondensed', 'Arial Narrow', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    color: 'rgba(255,255,255,0.72)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 0.15s',
    paddingBottom: 4,
    borderBottom: '2px solid transparent',
  },
  navLinkActive: {
    color: '#ffffff',
    borderBottom: '2px solid #ff2a00',
  },
  cta: {
    fontFamily: "'JonovaCondensed', 'Arial Narrow', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '10px 22px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    flexShrink: 0,
    transition: 'background 0.15s',
  },
  burger: {
    width: 44,
    height: 44,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexShrink: 0,
  },
  burgerLine: {
    display: 'block',
    width: 24,
    height: 2,
    background: 'white',
    borderRadius: 2,
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    transformOrigin: 'center',
  },
  drawer: {
    background: '#3e2720',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '8px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
  },
  drawerLink: {
    fontFamily: "'JonovaCondensed', 'Arial Narrow', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    letterSpacing: '0.03em',
    padding: '14px 4px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  drawerLinkActive: {
    color: '#ff7a5e',
  },
  drawerCta: {
    fontFamily: "'JonovaCondensed', 'Arial Narrow', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '14px 22px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    marginTop: 12,
  },
};

Object.assign(window, { Header });
