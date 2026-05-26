// DonateModal — payment methods popup with two-step UI (select → method)
// Line-style icons (lucide-inspired, original drawings)
const Icon = {
  card: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 15h3" />
    </svg>
  ),
  transfer: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M14 15.5h4" />
      <path d="M16.5 13.5l1.8 2-1.8 2" />
    </svg>
  ),
  sms: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 5.5h17v11h-9.5l-4 3.5v-3.5h-3.5z" />
      <path d="M8 11h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
    </svg>
  ),
  box: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l9-4.5 9 4.5v8l-9 4.5-9-4.5z" />
      <path d="M3 8.5l9 4.5 9-4.5" />
      <path d="M12 13v8" />
      <path d="M9 11v2.2" />
    </svg>
  ),
  platform: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.8 4 6 4 9s-1.4 6.2-4 9c-2.6-2.8-4-6-4-9s1.4-6.2 4-9z" />
    </svg>
  ),
  bank: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5l9-5 9 5" />
      <path d="M4.5 9.5v8" />
      <path d="M9 9.5v8" />
      <path d="M15 9.5v8" />
      <path d="M19.5 9.5v8" />
      <path d="M3 19.5h18" />
    </svg>
  ),
  back: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
};

const DONATE_TABS = [
  { id: 'card',     label: 'Картой онлайн',                  icon: Icon.card,     desc: 'Быстро и безопасно через Сбербанк' },
  { id: 'sber',     label: 'Перевод на карту',               icon: Icon.transfer, desc: 'Сбербанк, по номеру карты' },
  { id: 'sms',      label: 'СМС-сообщение',                  icon: Icon.sms,      desc: 'На номер 7715' },
  { id: 'boxes',    label: 'Ящик для пожертвований',         icon: Icon.box,      desc: 'Адреса в Нижнем Новгороде' },
  { id: 'platform', label: 'Платформа «800 добрых дел»',     icon: Icon.platform, desc: 'Создать сбор или поддержать' },
  { id: 'legal',    label: 'Банковский перевод',             icon: Icon.bank,     desc: 'Реквизиты для юр. лиц' },
];

const DONATE_BOXES = [
  { group: 'Магазины «Дирижабль»', addresses: [
    'ул. Большая Покровская, 46',
    'ул. Белинского, 118',
    'ул. Щербакова, 2',
    'ул. Советская, 19/2',
  ]},
  { group: 'Приют фонда', addresses: [
    'ул. Коминтерна, 29 «А»',
  ]},
  { group: 'Офис ГК «Деком»', addresses: [
    'ул. Большая Печерская, 28/7',
  ]},
  { group: 'Партнёрские сети', addresses: [
    'Магазины «Зоосфера» — все точки в Нижнем Новгороде',
    'Магазины «Лапушки» — все точки в Нижнем Новгороде',
  ]},
];

const LEGAL_DETAILS = [
  ['Получатель',     'НКО «Нижегородский благотворительный фонд защиты животных «Сострадание НН»'],
  ['ИНН',            '5260986585'],
  ['КПП',            '526001001'],
  ['ОГРН',           '1135200002321'],
  ['Расчётный счёт', '40703810600000744114'],
  ['Банк',           'АО «ТБанк»'],
  ['Корр. счёт',     '30101810145250000974'],
  ['БИК',            '044525974'],
  ['Юр./почт. адрес','603155, г. Нижний Новгород, ул. Большая Печерская, д. 28/7'],
  ['Телефон',        '+7 831 231-31-13'],
  ['E-mail',         'info@sostradanie-nn.ru'],
];

const LEGAL_TEXT_BLOCK = LEGAL_DETAILS.map(([k, v]) => `${k}: ${v}`).join('\n')
  + '\n\nВ назначении платежа обязательно указать: Добровольное пожертвование. НДС не облагается.';

const PURPOSES = [
  'Корм и содержание животных',
  'Ветеринарная помощь',
  'Стерилизация и кастрация',
  'Реабилитация после травм',
  'Куда нужнее всего',
];

// ────────────────────────────────────────────────────────────────────
const DonateModal = ({ open, initialAmount, recurring, onClose }) => {
  // Two-step nav: 'select' (grid of methods) → 'method' (chosen method content)
  const [step, setStep] = React.useState('select');
  const [tab, setTab] = React.useState(null);
  const [slideDir, setSlideDir] = React.useState(0); // -1 back, +1 forward, 0 none

  // Card tab form state
  const [amount, setAmount] = React.useState(initialAmount || 500);
  const [purpose, setPurpose] = React.useState(PURPOSES[4]);
  const [email, setEmail] = React.useState('');
  const [agree, setAgree] = React.useState(false);

  // Copy feedback
  const [copied, setCopied] = React.useState(null); // key string

  React.useEffect(() => {
    if (open) {
      setStep('select');
      setTab(null);
      setSlideDir(0);
      setAmount(initialAmount || 500);
      setAgree(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, initialAmount]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
  const goToMethod = (id) => { setTab(id); setSlideDir(isMobile ? 0 : 1); setStep('method'); };
  const goBack = () => { setSlideDir(isMobile ? 0 : -1); setStep('select'); };
  const activeMeta = DONATE_TABS.find(t => t.id === tab);

  const copy = (text, key) => {
    const done = () => { setCopied(key); setTimeout(() => setCopied(null), 1800); };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
      done();
    }
  };

  return (
    <div style={dmStyles.overlay} onClick={onClose}>
      <div style={dmStyles.box} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Способы пожертвования">
        <button style={dmStyles.close} onClick={onClose} aria-label="Закрыть">×</button>

        {/* Step 1: Select screen */}
        {step === 'select' && (
          <div
            key="select"
            className={`dm-step dm-step-select${slideDir === -1 ? ' dm-anim-in-left' : ''}`}
          >
            <div style={dmStyles.header} className="dm-header">
              <div style={dmStyles.eyebrow}>Поддержать фонд</div>
              <h3 style={dmStyles.heading} className="dm-heading">
                Помочь — <span style={dmStyles.headingItalic}>любым удобным способом</span>
              </h3>
              <p style={dmStyles.lede}>
                Каждый рубль доходит до животного. Выберите способ, который удобен вам — все они работают
                одинаково хорошо.
              </p>
            </div>

            <div style={dmStyles.body} className="dm-body">
              <div style={dmStyles.methodsGrid} className="dm-methods-grid">
                {DONATE_TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => goToMethod(t.id)}
                    style={dmStyles.methodCard}
                    className="dm-method-card"
                  >
                    <span style={dmStyles.methodIcon} className="dm-method-icon">{t.icon}</span>
                    <span style={dmStyles.methodLabel}>{t.label}</span>
                    <span style={dmStyles.methodDesc}>{t.desc}</span>
                    <span style={dmStyles.methodArrow} className="dm-method-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Method screen */}
        {step === 'method' && activeMeta && (
          <div
            key="method"
            className={`dm-step dm-step-method${slideDir === 1 ? ' dm-anim-in-right' : ''}`}
          >
            <div style={dmStyles.methodHeader} className="dm-method-header">
              <button onClick={goBack} style={dmStyles.backBtn} className="dm-back-btn">
                {Icon.back}
                <span>Назад к способам</span>
              </button>
              <h3 style={dmStyles.methodHeading} className="dm-method-heading">{activeMeta.label}</h3>
            </div>

            <div style={dmStyles.body} className="dm-body">
              {tab === 'card' && (
                <CardTab
                  amount={amount} setAmount={setAmount}
                  purpose={purpose} setPurpose={setPurpose}
                  email={email} setEmail={setEmail}
                  agree={agree} setAgree={setAgree}
                  recurring={recurring}
                />
              )}
              {tab === 'sber'     && <SberTab copy={copy} copied={copied} />}
              {tab === 'sms'      && <SmsTab />}
              {tab === 'boxes'    && <BoxesTab />}
              {tab === 'platform' && <PlatformTab />}
              {tab === 'legal'    && <LegalTab copy={copy} copied={copied} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tab: Card online ────────────────────────────────────────────────
const CardTab = ({ amount, setAmount, purpose, setPurpose, email, setEmail, agree, setAgree, recurring }) => {
  const presets = [100, 500, 1500, 5000];
  const formattedAmount = (Number(amount) || 0).toLocaleString('ru-RU');

  return (
    <div style={dmStyles.cardWrap} className="dm-card-wrap">
      <div style={dmStyles.cardForm}>
        <div style={dmStyles.field}>
          <div style={dmStyles.fieldLabel}>Сумма пожертвования</div>
          <div style={dmStyles.amountChips}>
            {presets.map(p => {
              const active = Number(amount) === p;
              return (
                <button
                  key={p}
                  onClick={() => setAmount(p)}
                  style={{ ...dmStyles.chip, ...(active ? dmStyles.chipActive : {}) }}
                >{p.toLocaleString('ru-RU')} ₽</button>
              );
            })}
          </div>
          <div style={dmStyles.amountInputWrap}>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={e => setAmount(Math.max(0, Number(e.target.value) || 0))}
              style={dmStyles.amountInput}
            />
            <span style={dmStyles.amountCurrency}>₽</span>
          </div>
        </div>

        <div style={dmStyles.field}>
          <div style={dmStyles.fieldLabel}>Назначение платежа</div>
          <div style={dmStyles.selectWrap}>
            <select
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              style={dmStyles.select}
            >
              {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <span style={dmStyles.selectChevron}>▾</span>
          </div>
        </div>

        <div style={dmStyles.field}>
          <div style={dmStyles.fieldLabel}>E-mail для квитанции</div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={dmStyles.input}
          />
        </div>

        <label style={dmStyles.agreeRow}>
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            style={dmStyles.checkbox}
          />
          <span style={dmStyles.agreeText}>
            Согласен с <a href="#" style={dmStyles.agreeLink}>офертой</a> и&nbsp;даю согласие на
            <a href="#" style={dmStyles.agreeLink}> обработку персональных данных</a>.
          </span>
        </label>

        <button
          style={{
            ...dmStyles.payBtn,
            opacity: agree && Number(amount) > 0 ? 1 : 0.45,
            cursor: agree && Number(amount) > 0 ? 'pointer' : 'not-allowed',
          }}
          disabled={!agree || Number(amount) <= 0}
        >
          <span>Перейти к оплате · {formattedAmount} ₽{recurring ? ' / мес.' : ''}</span>
          <span style={dmStyles.payBtnArrow}>→</span>
        </button>

        <div style={dmStyles.payNote}>
          Безопасная оплата через шлюз ПАО «Сбербанк России». Принимаем карты Мир, Visa, Mastercard.
        </div>
      </div>

      <aside style={dmStyles.cardAside}>
        <div style={dmStyles.asideHead}>На что пойдут эти деньги</div>
        <ul style={dmStyles.asideList}>
          <li style={dmStyles.asideItem}>
            <span style={dmStyles.asideMark}><svg width="12" height="9" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '0' }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg></span>
            <span>Корм и витамины — каждый день, без перебоев</span>
          </li>
          <li style={dmStyles.asideItem}>
            <span style={dmStyles.asideMark}><svg width="12" height="9" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '0' }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg></span>
            <span>Ветеринария: прививки, операции, реабилитация</span>
          </li>
          <li style={dmStyles.asideItem}>
            <span style={dmStyles.asideMark}><svg width="12" height="9" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '0' }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg></span>
            <span>Стерилизация бездомных кошек и собак</span>
          </li>
          <li style={dmStyles.asideItem}>
            <span style={dmStyles.asideMark}><svg width="12" height="9" viewBox="0 0 106 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: '0' }} aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M-1.23978e-05 19.3379L22.7427 57.5976L23.5644 58.8198L51.685 73.5771L53.8305 73.5771L81.9512 58.8198L82.7729 57.5976L105.516 19.3379L84.9883 -3.29612e-05L59.5698 5.57614L52.7578 23.7363L45.9458 5.57615L20.5273 -2.52482e-05L-1.23978e-05 19.3379Z"></path></svg></span>
            <span>Содержание приюта, отопление, уборка</span>
          </li>
        </ul>
        <div style={dmStyles.asideFoot}>
          Отчёт о расходах публикуем ежемесячно на сайте и в&nbsp;соцсетях.
        </div>
      </aside>
    </div>
  );
};

// ─── Tab: Sber card ──────────────────────────────────────────────────
const SberTab = ({ copy, copied }) => {
  const card = '5469 9801 4101 2902';
  return (
    <div style={dmStyles.singleCol}>
      <div style={dmStyles.simpleHead}>Перевод на карту Сбербанка</div>
      <p style={dmStyles.simpleBody}>
        Откройте приложение Сбербанк Онлайн или любого другого банка и сделайте перевод на номер
        карты ниже. Получатель — Соколова Ирина Александровна (учредитель фонда).
      </p>

      <div style={dmStyles.cardChip}>
        <div style={dmStyles.cardChipLabel}>Номер карты Сбербанка</div>
        <div style={dmStyles.cardChipRow}>
          <div style={dmStyles.cardChipNumber}>{card}</div>
          <button
            onClick={() => copy(card.replace(/\s/g, ''), 'sber')}
            style={dmStyles.copyBtn}
          >
            {copied === 'sber' ? '✓ Скопировано' : 'Скопировать'}
          </button>
        </div>
      </div>

      <div style={dmStyles.metaRow}>
        <div>
          <div style={dmStyles.metaLabel}>Получатель</div>
          <div style={dmStyles.metaValue}>Соколова И. А.</div>
        </div>
        <div>
          <div style={dmStyles.metaLabel}>Комиссия</div>
          <div style={dmStyles.metaValue}>Без комиссии для клиентов Сбера</div>
        </div>
        <div>
          <div style={dmStyles.metaLabel}>Назначение</div>
          <div style={dmStyles.metaValue}>«Благотворительный взнос»</div>
        </div>
      </div>
    </div>
  );
};

// ─── Tab: SMS ───────────────────────────────────────────────────────
const SmsTab = () => (
  <div style={dmStyles.singleCol}>
    <div style={dmStyles.simpleHead}>СМС на короткий номер 7715</div>
    <p style={dmStyles.simpleBody}>
      Самый быстрый способ. Отправьте СМС на номер <strong>7715</strong> со словом «питомец»
      и&nbsp;суммой через пробел. Деньги спишутся со счёта вашего мобильного телефона.
    </p>

    <div style={dmStyles.smsExample}>
      <div style={dmStyles.smsLabel}>Пример сообщения</div>
      <div style={dmStyles.smsBubble}>питомец 100</div>
      <div style={dmStyles.smsTo}>на номер <strong>7715</strong></div>
    </div>

    <div style={dmStyles.smsHints}>
      <div style={dmStyles.metaLabel}>Подсказки</div>
      <ul style={dmStyles.hintList}>
        <li>Сумма — любое число от&nbsp;10 до&nbsp;15&nbsp;000&nbsp;₽.</li>
        <li>Услуга работает у всех российских мобильных операторов.</li>
        <li>Отправка СМС бесплатна, списывается только указанная сумма.</li>
      </ul>
    </div>
  </div>
);

// ─── Tab: Donation boxes ─────────────────────────────────────────────
const BoxesTab = () => (
  <div style={dmStyles.singleCol}>
    <div style={dmStyles.simpleHead}>Ящики для пожертвований</div>
    <p style={dmStyles.simpleBody}>
      Если удобно опустить наличные — наши ящики стоят в&nbsp;нескольких точках
      Нижнего&nbsp;Новгорода. Содержимое инкассируется при свидетелях, отчёт публикуется ежемесячно.
    </p>

    <div style={dmStyles.boxesGrid}>
      {DONATE_BOXES.map(g => (
        <div key={g.group} style={dmStyles.boxesGroup}>
          <div style={dmStyles.boxesGroupTitle}>{g.group}</div>
          <ul style={dmStyles.boxesList}>
            {g.addresses.map(a => (
              <li key={a} style={dmStyles.boxesItem}>
                <span style={dmStyles.boxesPin}>◆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// ─── Tab: 800 добрых дел ─────────────────────────────────────────────
const PlatformTab = () => (
  <div style={dmStyles.singleCol}>
    <div style={dmStyles.simpleHead}>Платформа «800 добрых дел»</div>
    <p style={dmStyles.simpleBody}>
      «800 добрых дел» — это городская краудфандинговая платформа Нижнего Новгорода. На&nbsp;ней можно
      поддержать конкретные проекты фонда «Сострадание НН» и&nbsp;увидеть, сколько уже собрано на
      каждое доброе дело.
    </p>
    <p style={dmStyles.simpleBody}>
      Платформа удобна тем, что позволяет жертвовать с&nbsp;карты, через СБП и&nbsp;по&nbsp;QR-коду,
      а&nbsp;также подписаться на&nbsp;регулярные пожертвования.
    </p>

    <a href="https://800dobrihdel.ru" target="_blank" rel="noopener noreferrer" style={dmStyles.linkBtn}>
      <span>Перейти на 800dobrihdel.ru</span>
      <span style={dmStyles.payBtnArrow}>↗</span>
    </a>
  </div>
);

// ─── Tab: Legal entities ─────────────────────────────────────────────
const LegalTab = ({ copy, copied }) => (
  <div style={dmStyles.singleCol}>
    <div style={dmStyles.simpleHead}>Реквизиты для юридических лиц</div>
    <p style={dmStyles.simpleBody}>
      Перевод от&nbsp;организации или ИП. Договор пожертвования высылаем по&nbsp;запросу
      на&nbsp;<a href="mailto:info@sostradanie-nn.ru" style={dmStyles.agreeLink}>info@sostradanie-nn.ru</a>.
    </p>

    <div style={dmStyles.warning}>
      <span style={dmStyles.warningIcon}>!</span>
      <div>
        <div style={dmStyles.warningTitle}>Важно — назначение платежа</div>
        <div style={dmStyles.warningBody}>
          В&nbsp;назначении платежа обязательно указать: <strong>«Добровольное пожертвование.
          НДС не&nbsp;облагается»</strong>.
        </div>
      </div>
    </div>

    <dl style={dmStyles.legalDl}>
      {LEGAL_DETAILS.map(([k, v]) => (
        <div key={k} style={dmStyles.legalRow} className="dm-legal-row">
          <dt style={dmStyles.legalKey}>{k}</dt>
          <dd style={dmStyles.legalVal}>{v}</dd>
        </div>
      ))}
    </dl>

    <button
      onClick={() => copy(LEGAL_TEXT_BLOCK, 'legal')}
      style={dmStyles.copyAllBtn}
    >
      {copied === 'legal' ? '✓ Реквизиты скопированы' : 'Скопировать реквизиты целиком'}
    </button>
  </div>
);

// ─── Styles ──────────────────────────────────────────────────────────
const dmStyles = {
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
    background: '#fdf8f5',
    borderRadius: 28,
    maxWidth: 980,
    width: '100%',
    maxHeight: '92vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 32px 64px rgba(0,0,0,0.28)',
  },
  close: {
    position: 'absolute',
    top: 16, right: 18,
    background: 'white',
    border: 'none',
    width: 38, height: 38,
    borderRadius: 999,
    fontSize: 24,
    color: '#3e2720',
    cursor: 'pointer',
    lineHeight: 1,
    zIndex: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
  },

  header: {
    padding: '36px 40px 20px',
    maxWidth: 720,
  },
  eyebrow: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#ff2a00',
    marginBottom: 10,
  },
  heading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 44,
    color: '#120804',
    lineHeight: 1.0,
    letterSpacing: '-0.02em',
    margin: 0,
    marginBottom: 12,
  },
  headingItalic: { color: '#ff2a00', fontStyle: 'italic' },
  lede: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#5c4038',
    lineHeight: 1.5,
    margin: 0,
    textWrap: 'pretty',
  },

  tabsWrap: {
    padding: '0 40px',
    borderBottom: '1px solid #e8ddd6',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  tabs: {
    display: 'flex',
    gap: 6,
    minWidth: 'min-content',
  },
  tab: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.04em',
    background: 'transparent',
    color: '#7d6259',
    border: 'none',
    padding: '14px 4px 16px',
    margin: '0 14px 0 0',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    transition: 'color 0.15s, border-color 0.15s',
  },
  tabActive: {
    color: '#120804',
    borderBottom: '3px solid #ff2a00',
  },
  tabBadge: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: '#fff2ee',
    color: '#ff2a00',
    padding: '3px 8px',
    borderRadius: 999,
  },
  tabBadgeActive: {
    background: '#ff2a00',
    color: 'white',
  },

  body: { padding: '28px 40px 40px' },

  // ── Methods grid (step 1) ─
  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 14,
  },
  methodCard: {
    position: 'relative',
    background: 'white',
    border: '1.5px solid #e8ddd6',
    borderRadius: 18,
    padding: '22px 20px 20px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    color: '#120804',
    transition: 'border-color 0.18s, transform 0.18s, box-shadow 0.18s, background 0.18s',
    overflow: 'hidden',
  },
  methodIcon: {
    color: '#ff2a00',
    width: 32,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    transition: 'transform 0.18s',
  },
  methodLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 19,
    letterSpacing: '0.01em',
    color: '#120804',
    lineHeight: 1.15,
  },
  methodDesc: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#5c4038',
    lineHeight: 1.4,
    textWrap: 'pretty',
  },
  methodArrow: {
    position: 'absolute',
    top: 18,
    right: 20,
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: '#c9b8ae',
    transition: 'transform 0.2s, color 0.18s',
  },

  // ── Method header (step 2) ─
  methodHeader: {
    padding: '32px 40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    borderBottom: '1px solid #e8ddd6',
  },
  backBtn: {
    alignSelf: 'flex-start',
    background: 'transparent',
    border: 'none',
    padding: '6px 10px 6px 4px',
    cursor: 'pointer',
    color: '#7d6259',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    transition: 'color 0.15s, background 0.15s',
  },
  methodHeading: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 36,
    color: '#120804',
    lineHeight: 1.05,
    letterSpacing: '-0.015em',
    margin: 0,
  },

  // ── Card tab ─
  cardWrap: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
    gap: 32,
  },
  cardForm: { display: 'flex', flexDirection: 'column', gap: 22 },
  field: { display: 'flex', flexDirection: 'column', gap: 10 },
  fieldLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#7d6259',
  },
  amountChips: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.04em',
    background: 'white',
    color: '#3e2720',
    border: '1.5px solid #e8ddd6',
    borderRadius: 999,
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  chipActive: {
    background: '#fff2ee',
    color: '#ff2a00',
    borderColor: '#ff2a00',
  },
  amountInputWrap: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    background: 'white',
    border: '1.5px solid #e8ddd6',
    borderRadius: 14,
    padding: '14px 18px',
  },
  amountInput: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    color: '#120804',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    flex: 1,
    width: '100%',
    padding: 0,
    letterSpacing: '-0.01em',
  },
  amountCurrency: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: '#7d6259',
  },
  selectWrap: { position: 'relative' },
  select: {
    width: '100%',
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    background: 'white',
    color: '#261510',
    border: '1.5px solid #e8ddd6',
    borderRadius: 14,
    padding: '13px 40px 13px 16px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  },
  selectChevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7d6259',
    pointerEvents: 'none',
    fontSize: 14,
  },
  input: {
    width: '100%',
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    background: 'white',
    color: '#261510',
    border: '1.5px solid #e8ddd6',
    borderRadius: 14,
    padding: '13px 16px',
    outline: 'none',
  },
  agreeRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    cursor: 'pointer',
  },
  checkbox: {
    width: 20, height: 20,
    accentColor: '#ff2a00',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: 2,
  },
  agreeText: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#5c4038',
    lineHeight: 1.45,
  },
  agreeLink: { color: '#ff2a00', textDecoration: 'underline' },
  payBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '16px 28px',
    letterSpacing: '0.03em',
    boxShadow: '0 8px 20px rgba(255,42,0,0.28)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    transition: 'opacity 0.15s, transform 0.15s',
  },
  payBtnArrow: { fontSize: 22 },
  payNote: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#7d6259',
    lineHeight: 1.45,
    textAlign: 'center',
  },

  cardAside: {
    background: '#fff2ee',
    borderRadius: 20,
    padding: '24px 24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    alignSelf: 'start',
  },
  asideHead: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#ff2a00',
  },
  asideList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  asideItem: {
    display: 'flex',
    gap: 10,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#3e2720',
    lineHeight: 1.45,
  },
  asideMark: { color: '#ff2a00', flexShrink: 0, marginTop: 2 },
  asideFoot: {
    marginTop: 6,
    paddingTop: 14,
    borderTop: '1px solid rgba(255,42,0,0.18)',
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 13,
    color: '#7d6259',
    lineHeight: 1.45,
  },

  // ── Single-column tabs (sber, sms, boxes, platform, legal) ─
  singleCol: { maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18 },
  simpleHead: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    color: '#120804',
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
    margin: 0,
  },
  simpleBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 16,
    color: '#3e2720',
    lineHeight: 1.55,
    margin: 0,
    textWrap: 'pretty',
  },

  // ── Sber card chip ─
  cardChip: {
    background: 'linear-gradient(135deg, #3e2720 0%, #261510 100%)',
    color: 'white',
    borderRadius: 18,
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    boxShadow: '0 8px 20px rgba(38,21,16,0.18)',
  },
  cardChipLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
  },
  cardChipRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  cardChipNumber: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: '0.05em',
    color: 'white',
  },
  copyBtn: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '9px 16px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
  },

  metaRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    paddingTop: 8,
  },
  metaLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#a89087',
    marginBottom: 4,
  },
  metaValue: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#261510',
    lineHeight: 1.4,
  },

  // ── SMS ─
  smsExample: {
    background: 'white',
    borderRadius: 18,
    padding: '20px 22px',
    border: '1.5px solid #e8ddd6',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  smsLabel: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#a89087',
  },
  smsBubble: {
    alignSelf: 'flex-start',
    background: '#fff2ee',
    color: '#ff2a00',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: '0.02em',
    padding: '10px 18px',
    borderRadius: '16px 16px 16px 4px',
  },
  smsTo: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#7d6259',
  },
  smsHints: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingTop: 4,
  },
  hintList: {
    margin: 0,
    paddingLeft: 18,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#3e2720',
    lineHeight: 1.55,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  // ── Boxes ─
  boxesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 18,
    marginTop: 4,
  },
  boxesGroup: {
    background: 'white',
    border: '1.5px solid #e8ddd6',
    borderRadius: 16,
    padding: '18px 20px',
  },
  boxesGroupTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: '0.02em',
    color: '#120804',
    marginBottom: 10,
  },
  boxesList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  boxesItem: {
    display: 'flex',
    gap: 10,
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#3e2720',
    lineHeight: 1.45,
  },
  boxesPin: { color: '#ff2a00', flexShrink: 0, marginTop: 2, fontSize: 10 },

  // ── Link button (platform) ─
  linkBtn: {
    alignSelf: 'flex-start',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    background: '#ff2a00',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '14px 26px',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 8px 20px rgba(255,42,0,0.28)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
  },

  // ── Legal ─
  warning: {
    background: '#fff2ee',
    border: '1.5px solid #ff7a5e',
    borderRadius: 16,
    padding: '16px 18px',
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
  },
  warningIcon: {
    flexShrink: 0,
    width: 28, height: 28,
    borderRadius: 999,
    background: '#ff2a00',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1,
  },
  warningTitle: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#a81500',
    marginBottom: 4,
  },
  warningBody: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 15,
    color: '#3e2720',
    lineHeight: 1.5,
  },
  legalDl: {
    margin: 0,
    background: 'white',
    border: '1.5px solid #e8ddd6',
    borderRadius: 16,
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column',
  },
  legalRow: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr',
    gap: 16,
    padding: '10px 18px',
    borderBottom: '1px dashed #e8ddd6',
  },
  legalKey: {
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#7d6259',
    margin: 0,
    alignSelf: 'center',
  },
  legalVal: {
    fontFamily: "'Patefon',Georgia,serif",
    fontSize: 14,
    color: '#261510',
    lineHeight: 1.45,
    margin: 0,
    wordBreak: 'break-word',
  },
  copyAllBtn: {
    alignSelf: 'flex-start',
    fontFamily: "'JonovaCondensed','Arial Narrow',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    background: '#3e2720',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '13px 24px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    boxShadow: '0 6px 16px rgba(38,21,16,0.18)',
  },
};

// Remove last dashed border on legal list
dmStyles.legalRow.borderBottom = '1px dashed #e8ddd6';

// Responsive: collapse 2-col card layout on narrow screens via injected CSS
if (typeof document !== 'undefined' && !document.getElementById('donate-modal-mq')) {
  const s = document.createElement('style');
  s.id = 'donate-modal-mq';
  s.textContent = `
    .dm-method-card:hover { border-color: #ff2a00 !important; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(255,42,0,0.12); }
    .dm-method-card:hover .dm-method-arrow { color: #ff2a00 !important; transform: translateX(4px); }
    .dm-method-card:hover .dm-method-icon { transform: scale(1.06); }
    .dm-method-card:focus-visible { outline: 2px solid #ff2a00; outline-offset: 2px; }
    .dm-back-btn:hover { color: #ff2a00 !important; background: #fff2ee !important; }

    @media (min-width: 821px) {
      .dm-anim-in-right { animation: dmSlideInRight 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
      .dm-anim-in-left  { animation: dmSlideInLeft  0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
    }
    @keyframes dmSlideInRight {
      from { opacity: 0; transform: translateX(28px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes dmSlideInLeft {
      from { opacity: 0; transform: translateX(-28px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @media (max-width: 820px) {
      .dm-card-wrap { grid-template-columns: 1fr !important; }
      .dm-legal-row { grid-template-columns: 1fr !important; }
      .dm-legal-row dt { margin-bottom: 2px !important; }
      .dm-methods-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 600px) {
      .dm-header { padding: 28px 22px 16px !important; }
      .dm-method-header { padding: 24px 22px 16px !important; }
      .dm-method-heading { font-size: 28px !important; }
      .dm-body { padding: 22px !important; }
      .dm-heading { font-size: 32px !important; }
    }
  `;
  document.head.appendChild(s);
}

// Wire className hooks (inject classNames where the media query targets)
const _origCardWrap = dmStyles.cardWrap;
// We use inline style + className on the same elements; the className-based MQ will override grid-template-columns.

Object.assign(window, { DonateModal });
