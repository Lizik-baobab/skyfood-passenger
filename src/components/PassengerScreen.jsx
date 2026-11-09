import { useEffect, useRef, useState } from 'react';
import { checkTicket } from '../services/passengerService';
import { getCafes } from '../services/cafeService';

import coffeeImage from '../assets/coffee.png';
import cafeAerocafeImage from '../assets/cafe-aerocafe.png';
import cafeCoffeePointImage from '../assets/cafe-coffee-point.png';
import cafeTerminalBistroImage from '../assets/cafe-terminal-bistro.png';
import cafeVolgaImage from '../assets/cafe-volga.png';
import cafeHouseImage from '../assets/cafe-house.png';
import cafeAirportFoodImage from '../assets/cafe-airport-food.png';
import cafePulkovoImage from '../assets/cafe-pulkovo.png';
import cafePulkovoCoffeeImage from '../assets/cafe-pulkovo-coffee.png';
import cafePulkovoBistroImage from '../assets/cafe-pulkovo-bistro.png';

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round',
    strokeLinejoin: 'round', 'aria-hidden': true
  };

  const paths = {
    plane: <><path d="M2.5 16.5 21 3l-6.5 18-3.8-7.2-8.2 2.7Z"/><path d="m10.7 13.8 5.1-5.1"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    ticket: <><path d="M3 7a2 2 0 0 0 0 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0 0-4V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M13 3v2m0 4v2m0 4v2"/></>,
    water: <><path d="M12 2.8 6.5 9a7.5 7.5 0 1 0 11 0L12 2.8Z"/><path d="M9 15a3.5 3.5 0 0 0 3.5 3.5"/></>,
    meal: <><path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M16 2v20m0-20c3 2 4 5 4 9h-4"/></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.5-3"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M21 16.5v3a2 2 0 0 1-2.2 2A19 19 0 0 1 10.5 18a19 19 0 0 1-5.8-5.8A19 19 0 0 1 2.8 3.7 2 2 0 0 1 4.8 1.5h3a2 2 0 0 1 2 1.7l.4 2.5a2 2 0 0 1-.6 1.8L8.3 8.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.8-.6l2.5.4a2 2 0 0 1 1.1 1.2Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1 7.8 7.7 7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
    sparkle: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>
  };

  return <svg {...common}>{paths[name] || null}</svg>;
};

const CITIES = [
  { name: 'Москва', airports: [{ code: 'SVO', name: 'Шереметьево' }] },
  { name: 'Казань', airports: [{ code: 'KZN', name: 'Казань' }] },
  { name: 'Санкт-Петербург', airports: [{ code: 'LED', name: 'Пулково' }] },
];


const CAFE_IMAGES = {
  1: cafeAerocafeImage,
  2: cafeCoffeePointImage,
  3: cafeTerminalBistroImage,
  4: cafeVolgaImage,
  5: cafeHouseImage,
  6: cafeAirportFoodImage,
  7: cafePulkovoImage,
  8: cafePulkovoCoffeeImage,
  9: cafePulkovoBistroImage
};


const RULES = [
  { icon: 'plane', title: 'При каких условиях предоставляется', text: 'Ваучер предоставляется пассажирам при задержке рейса, если авиакомпания участвует в программе SkyFood.' },
  { icon: 'refresh', title: 'Какие виды существуют', text: 'Программа предусматривает два типа: WATER (вода) и MEAL (питание).' },
  { icon: 'water', title: 'Чем отличаются WATER и MEAL', text: 'WATER предоставляется при меньшем времени задержки и предназначен для покупки воды. MEAL — при более длительном ожидании, для питания.' },
  { icon: 'search', title: 'Как проверить наличие', text: 'Введите код посадочного талона в разделе «Проверить ваучер» на этой странице.' },
  { icon: 'meal', title: 'Как воспользоваться в кафе', text: 'Предъявите посадочный талон сотруднику кафе-партнёра. Он проверит ваучер и поможет оформить заказ.' },
  { icon: 'ticket', title: 'Можно ли использовать несколько раз', text: 'Да, ваучер можно использовать до тех пор, пока на нём есть остаток средств.' },
  { icon: 'clock', title: 'Когда ваучер перестаёт действовать', text: 'При начале посадки, отмене или вылете рейса ваучер закрывается. После закрытия новые покупки невозможны.' },
  { icon: 'bag', title: 'Что можно купить', text: 'Разрешённые продукты и напитки. Спиртные напитки и табачные изделия приобрести нельзя.' },
];

const NAV_ITEMS = [
  ['Главная', '#hero'],
  ['Как работает', '#how'],
  ['Проверить', '#check-section'],
  ['Где воспользоваться', '#cafes-list'],
  ['Правила', '#rules'],
  ['Контакты', '#contacts'],
];

const BARCODE = [2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1];

function BoardingPass() {
  return (
    <div className="sf-boarding-pass" aria-label="Образец посадочного талона">
      <div className="sf-bp-top"><span>BOARDING PASS</span><Icon name="plane" size={12} /></div>
      <div className="sf-bp-route">SVO <span>→</span> LED</div>
      <div className="sf-bp-meta">GATE 12 · SEAT 18A</div>
      <div className="sf-bp-bottom">
        <div className="sf-bp-code-wrap">
          <span className="sf-bp-label">КОД ТАЛОНА</span>
          <strong className="sf-bp-code">BP-1001-01</strong>
        </div>
        <div className="sf-bp-barcode" aria-hidden="true">
          {BARCODE.map((width, index) => <i key={index} style={{ width }} />)}
        </div>
      </div>
    </div>
  );
}

function LoadingVoucher({ ticket }) {
  return (
    <section className="sf-state-card is-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="sf-state-topline">
        <span className="sf-state-code">Код талона: {ticket}</span>
        <span className="sf-state-badge"><i className="sf-spinner" /> Проверка</span>
      </div>
      <div className="sf-state-icon"><i className="sf-spinner" /></div>
      <div className="sf-state-copy">
        <h3>Проверяем…</h3>
        <p>Сверяем данные посадочного талона. Это займёт несколько секунд.</p>
      </div>
      <div className="sf-loading-progress"><span /></div>
      <p className="sf-state-note">Не закрывайте страницу — результат появится автоматически.</p>
    </section>
  );
}

export default function PassengerScreen() {
  const [ticket, setTicket] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [selectedAirport, setSelectedAirport] = useState('SVO');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cafes, setCafes] = useState([]);
  const [cafesLoading, setCafesLoading] = useState(true);
  const [cafesError, setCafesError] = useState('');
  const requestIdRef = useRef(0);

  const currentCity = CITIES.find(city => city.name === selectedCity);
  const availableAirports = currentCity ? currentCity.airports : [];
  const filteredCafes = cafes.filter(
    cafe => cafe.airportCode === selectedAirport
  );

  useEffect(() => {
    document.body.classList.toggle('sf-menu-is-open', menuOpen);
    return () => document.body.classList.remove('sf-menu-is-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);


useEffect(() => {
  let cancelled = false;

  async function loadCafes() {
    try {
      const items = await getCafes();

      if (!cancelled) {
        setCafes(items);
      }
    } catch (error) {
      if (!cancelled) {
        setCafesError(error.message);
      }
    } finally {
      if (!cancelled) {
        setCafesLoading(false);
      }
    }
  }

  loadCafes();

  return () => {
    cancelled = true;
  };
}, []);


  const handleCityChange = event => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    const city = CITIES.find(item => item.name === cityName);
    if (city?.airports?.length) setSelectedAirport(city.airports[0].code);
  };

  const handleCheck = async event => {
    event.preventDefault();
    const code = ticket.trim();
    if (!code || loading) return;

    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await checkTicket(code);
      if (requestIdRef.current !== currentRequestId) return;

      if (!result) {
        setError('По этому коду не удалось найти информацию. Проверьте номер и попробуйте ещё раз.');
      } else {
        setData(result);
      }
    } catch (err) {
      if (requestIdRef.current === currentRequestId) {
        setError(err?.message || 'Не удалось проверить ваучер. Попробуйте ещё раз позднее.');
      }
    } finally {
      if (requestIdRef.current === currentRequestId) {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    requestIdRef.current += 1;
    setTicket('');
    setData(null);
    setError('');
    setLoading(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = () => {
    closeMenu();
  };

  const status = data?.status?.trim();
  const isActive = status === 'Активен';
  const isNotIssued = status === 'Не выдан';
  const isClosed = status === 'Закрыт';
  const isUnknownStatus = Boolean(data && !isActive && !isNotIssued && !isClosed);

  return (
    <div className="sf-site-shell">
      <div className="sf-site-container">
        <header className="sf-header">
          <a href="#hero" className="sf-logo" onClick={handleNavClick}>
            <span className="sf-logo-mark"><Icon name="plane" size={22} /></span>
            <span>SkyFood</span>
          </a>

          <nav className="sf-nav sf-desktop-nav" aria-label="Основная навигация">
            {NAV_ITEMS.map(([label, href], index) => (
              <a className={index === 0 ? 'is-active' : ''} href={href} key={href}>{label}</a>
            ))}
          </nav>

          <button
            className="sf-menu-button"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-controls="sf-mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
        </header>

        <div className={`sf-menu-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
        <aside id="sf-mobile-menu" className={`sf-mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <div className="sf-mobile-menu-head">
            <a href="#hero" className="sf-logo" onClick={handleNavClick}>
              <span className="sf-logo-mark"><Icon name="plane" size={20} /></span>
              <span>SkyFood</span>
            </a>
            <button type="button" className="sf-menu-close" onClick={closeMenu} aria-label="Закрыть меню">
              <Icon name="close" size={21} />
            </button>
          </div>
          <nav className="sf-mobile-nav" aria-label="Мобильная навигация">
            {NAV_ITEMS.map(([label, href], index) => (
              <a className={index === 0 ? 'is-active' : ''} href={href} key={href} onClick={handleNavClick}>
                <span>{label}</span><Icon name="arrow" size={17} />
              </a>
            ))}
          </nav>
          <div className="sf-mobile-menu-note"><Icon name="heart" size={16} /> Забота в деталях — даже во время ожидания</div>
        </aside>

        <main>
          <section className="sf-hero" id="hero">
            <img className="sf-hero-image" src={coffeeImage} alt="Кофе и круассан у окна аэропорта" />
            <div className="sf-hero-wash" />
            <div className="sf-hero-content">
              <div className="sf-eyebrow"><Icon name="sparkle" size={14} /> ЧУТЬ БОЛЬШЕ ЗАБОТЫ В ПУТИ</div>
              <h1>SkyFood — вкусное решение при задержке рейса</h1>
              <p>Пусть ожидание станет приятнее. Проверьте ваучер и обменяйте его на воду или обед в аэропорту.</p>
              <button className="sf-primary-button" type="button" onClick={() => document.getElementById('check-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Проверить ваучер <Icon name="arrow" size={18} />
              </button>
              <div className="sf-hero-caption"><Icon name="shield" size={15} /> Без регистрации — код с посадочного талона</div>
            </div>
          </section>

          <section className="sf-main-grid" aria-label="Проверка ваучера и типы">
            <article className="sf-panel sf-check-panel" id="check-section">
              <div className="sf-panel-title"><Icon name="search" size={22} /><h2>Проверить ваучер</h2></div>

              <form className="sf-check-form" onSubmit={handleCheck}>
                <label className="sf-code-field">
                  <span>Код талона</span>
                  <div className="sf-input-wrap">
                    <input
                      type="text"
                      value={ticket}
                      onChange={event => {
                        setTicket(event.target.value);
                        setData(null);
                        setError('');
                      }}
                      placeholder="BP-1001-01"
                      autoComplete="off"
                      spellCheck="false"
                      aria-label="Код посадочного талона"
                    />
                    {ticket && (
                      <button className="sf-clear-btn" type="button" onClick={handleClear} aria-label="Очистить код талона" title="Очистить">
                        <Icon name="close" size={17} />
                      </button>
                    )}
                    {!ticket && <Icon className="sf-input-ticket-icon" name="ticket" size={18} />}
                  </div>
                </label>

                <button type="submit" className="sf-submit-button" disabled={loading || !ticket.trim()}>
                  {loading ? <><span className="sf-button-spinner" /> Проверяем…</> : <>Проверить <Icon name="arrow" size={17} /></>}
                </button>
              </form>

              {loading && <LoadingVoucher ticket={ticket.trim()} />}

              {error && !loading && (
                <section className="sf-state-card is-error" role="alert">
                  <div className="sf-state-topline">
                    <span className="sf-state-code">Код талона: {ticket.trim() || '—'}</span>
                    <span className="sf-state-badge"><Icon name="search" size={14} /> Ошибка</span>
                  </div>
                  <div className="sf-state-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5M8.5 8.5l4.6 4.6m0-4.6-4.6 4.6"/></svg>
                  </div>
                  <div className="sf-state-copy">
                    <h3>Посадочный талон не найден</h3>
                    <p>{error}</p>
                  </div>
                  <div className="sf-state-note"><Icon name="info" size={19} /><span>Проверьте правильность кода и попробуйте ещё раз позднее.</span></div>
                </section>
              )}

              {data && !loading && isActive && (
                <div className="sf-voucher-result">
                  <div className="sf-voucher-result-head">
                    <strong>Ваш ваучер SkyFood</strong>
                    <span className="sf-status-pill"><i />{data.status}</span>
                  </div>
                  <div className="sf-voucher-details">
                    <div><span>Пассажир:</span><strong>{data.passengerName || 'Не указан'}</strong></div>
                    <div><span>Тип ваучера:</span><strong>{data.voucherType || 'Не указан'}</strong></div>
                    <div><span>Сумма текущего периода:</span><strong>{data.totalAmount ?? '—'} {data.currency || ''}</strong></div>
                    <div><span>Статус:</span><strong className="sf-active-text">{data.status}</strong></div>
                    <div className="sf-balance-row"><span>Доступный остаток:</span><strong>{data.balance ?? '—'} {data.currency || ''}</strong></div>
                  </div>
                  <p className="sf-voucher-instruction">Предъявите посадочный талон сотруднику участвующего в программе кафе. Сотрудник проверит ваш ваучер и поможет оформить покупку.</p>
                </div>
              )}

              {data && !loading && isNotIssued && (
                <section className="sf-state-card is-pending" role="status">
                  <div className="sf-state-topline">
                    <span className="sf-state-code">{ticket.trim()}</span>
                    <span className="sf-state-badge"><Icon name="clock" size={14} /> Не выдан</span>
                  </div>
                  <div className="sf-state-icon"><Icon name="clock" size={29} /></div>
                  <div className="sf-state-copy">
                    <h3>Ваучер пока недоступен</h3>
                    <p>По вашему посадочному талону пока нет доступного ваучера SkyFood. Если ваш рейс задержан, проверьте информацию позднее.</p>
                  </div>
                  <div className="sf-state-note"><Icon name="info" size={19} /><span>Если рейс задержан, попробуйте проверить наличие ваучера немного позже.</span></div>
                </section>
              )}

              {data && !loading && isClosed && (
                <section className="sf-state-card is-closed" role="status">
                  <div className="sf-state-topline">
                    <span className="sf-state-code">{ticket.trim()}</span>
                    <span className="sf-state-badge"><Icon name="shield" size={14} /> Закрыт</span>
                  </div>
                  <div className="sf-state-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14v12H5zM8 8V6a4 4 0 0 1 8 0v2"/><path d="m9 12 6 5m0-5-6 5"/></svg>
                  </div>
                  <div className="sf-state-copy">
                    <h3>Ваучер больше не действует</h3>
                    <p>Ваучер закрыт. Его использование для новых покупок недоступно.</p>
                  </div>
                  <div className="sf-state-note"><Icon name="info" size={19} /><span>После закрытия ваучера новые покупки невозможны.</span></div>
                </section>
              )}

              {data && !loading && isUnknownStatus && (
                <section className="sf-state-card is-error" role="alert">
                  <div className="sf-state-topline">
                    <span className="sf-state-code">{ticket.trim()}</span>
                    <span className="sf-state-badge"><Icon name="search" size={14} /> Ошибка</span>
                  </div>
                  <div className="sf-state-icon"><Icon name="search" size={29} /></div>
                  <div className="sf-state-copy">
                    <h3>Не удалось определить статус ваучера</h3>
                    <p>Получен неизвестный статус: {status || 'не указан'}. Обратитесь к представителю авиакомпании или повторите проверку позднее.</p>
                  </div>
                  <div className="sf-state-note"><Icon name="info" size={19} /><span>Если проблема повторяется, обратитесь в службу поддержки.</span></div>
                </section>
              )}

              <div className="sf-hint-panel">
                <BoardingPass />
                <div className="sf-hint-copy">
                  <h3>Где найти код?</h3>
                  <p>Введите код с посадочного талона — он находится в выделённой части образца.</p>
                  <div className="sf-hint-example"><Icon name="ticket" size={14} /> BP-1001-01 · латиницей</div>
                </div>
              </div>


<div className="sf-test-codes">
  <span>Тестовые коды локальной базы:</span>
  <div>
    <code>BP-1001-01</code> — WATER, 150 ₽
    {' · '}
    <code>BP-1008-01</code> — MEAL, 900 ₽
  </div>
</div>

              <p className="sf-check-footnote">Уточните использование ваучера перед покупкой непосредственно в кафе.</p>
            </article>

            <article className="sf-panel sf-types-panel">
              <div className="sf-panel-title"><h2>Типы ваучеров</h2></div>
              <div className="sf-type-options">
                <div className="sf-type-option"><span className="sf-type-icon"><Icon name="water" size={24} /></span><strong>WATER</strong><p>Питьевая вода</p></div>
                <div className="sf-type-option"><span className="sf-type-icon"><Icon name="meal" size={24} /></span><strong>MEAL</strong><p>Обед или перекус</p></div>
              </div>
              <div className="sf-types-note"><Icon name="refresh" size={17} /><span>Возможно пополнение ваучера при продолжительной задержке.</span></div>
            </article>
          </section>

          <section className="sf-cafes-panel" id="cafes-list">
            <div className="sf-section-heading"><h2>Где воспользоваться ваучером</h2></div>
            <div className="sf-filter-bar">
              <label className="sf-city-select">
                <span className="sf-sr-only">Выберите город</span>
                <select value={selectedCity} onChange={handleCityChange}>
                  {CITIES.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
                </select>
                <span className="sf-select-chevron">⌄</span>
              </label>
              <div className="sf-airport-buttons">
                {availableAirports.map(airport => (
                  <button type="button" key={airport.code} className={selectedAirport === airport.code ? 'is-selected' : ''} onClick={() => setSelectedAirport(airport.code)}>{airport.code}</button>
                ))}
              </div>
              <span className="sf-cafe-count">
                {cafesLoading ? 'Загрузка...' : `${filteredCafes.length} кафе`}
              </span>
            </div>


{cafesError && (
  <p role="alert">{cafesError}</p>
)}

{cafesLoading && (
  <p role="status">Загрузка кафе...</p>
)}

{!cafesLoading && !cafesError &&
  filteredCafes.length === 0 && (
    <p>В выбранном аэропорту кафе не найдены.</p>
)}

<div className="sf-cafes-grid">
  {filteredCafes.map(cafe => (
    <article className="sf-cafe-card" key={cafe.cafeId}>
      <div className="sf-cafe-image">
        <img
          src={CAFE_IMAGES[cafe.cafeId] ?? coffeeImage}
          alt={`Фото кафе ${cafe.cafeName}`}
        />
        <span>Кафе аэропорта</span>
      </div>

      <div className="sf-cafe-info">
        <div className="sf-cafe-title-row">
          <h3>{cafe.cafeName}</h3>
          <a href="#rules" aria-label={`Как воспользоваться ваучером в кафе ${cafe.cafeName}`}>
            <Icon name="external" size={16} />
          </a>
        </div>

        <p className="sf-cafe-terminal">
          {cafe.airportCode} · Терминал {cafe.terminal}
        </p>

        <p className="sf-cafe-zone">
          <Icon name="pin" size={12} />
          Этаж {cafe.floor ?? '—'} · сектор {cafe.sector ?? '—'}
        </p>
      </div>
    </article>
  ))}
</div>

        
          </section>

          <section className="sf-how-section" id="how">
            <h2>Как это работает</h2>
            <div className="sf-how-grid">
              <article className="sf-how-card"><div className="sf-how-top"><span>01</span><Icon name="ticket" size={18} /></div><h3>Проверьте ваучер</h3><p>Введите код с посадочного талона. Узнайте тип ваучера и до какого времени он действует.</p></article>
              <article className="sf-how-card"><div className="sf-how-top"><span>02</span><Icon name="meal" size={18} /></div><h3>Выберите кафе</h3><p>Найдите подходящее заведение в вашем терминале. Уточните, находится ли оно после досмотра.</p></article>
              <article className="sf-how-card"><div className="sf-how-top"><span>03</span><Icon name="clock" size={18} /></div><h3>Наслаждайтесь паузой</h3><p>Покажите ваучер сотруднику перед заказом. Возьмите воду или перекус и отдохните.</p></article>
            </div>
          </section>

          <section className="sf-rules-panel" id="rules">
            <h2>Правила использования</h2>
            <div className="sf-rules-grid">
              {RULES.map(rule => (
                <article className="sf-rule" key={rule.title}>
                  <span className="sf-rule-icon"><Icon name={rule.icon} size={17} /></span>
                  <div><h3>{rule.title}</h3><p>{rule.text}</p></div>
                </article>
              ))}
            </div>
            <div className="sf-important-note"><Icon name="info" size={16} /><p><strong>Особое внимание:</strong> Размер ваучера зависит от авиакомпании. Список разрешённых товаров зависит от типа ваучера. При начале посадки, отмене или вылете рейса ваучер закрывается. После закрытия ваучера новые покупки невозможны.</p></div>
            <p className="sf-rules-caption">Немного деталей, чтобы всё прошло легко. Точные условия указаны в вашем ваучере.</p>
          </section>

          <footer className="sf-footer" id="contacts">
            <h2>Контакты</h2>
            <p className="sf-footer-intro">Нужна помощь с ваучером? Мы рядом, чтобы ваша пауза в аэропорту прошла спокойнее.</p>
            <div className="sf-contact-grid">
              <div className="sf-contact-item"><span className="sf-contact-icon"><Icon name="mail" size={18} /></span><div><small>Электронная почта</small><a href="mailto:support@skyfood.example">support@skyfood.example</a></div></div>
              <div className="sf-contact-item"><span className="sf-contact-icon"><Icon name="phone" size={18} /></span><div><small>Телефон</small><a href="tel:88000000000">8 800 000-00-00</a></div></div>
              <div className="sf-contact-item"><span className="sf-contact-icon"><Icon name="clock" size={18} /></span><div><small>Время работы</small><strong>Ежедневно, 08:00–22:00 МСК</strong></div></div>
            </div>
            <div className="sf-footer-bar">
              <span>© 2026 SkyFood. С заботой о пути.</span>
              <div><span><Icon name="shield" size={13} /> Бережно к данным</span><span><Icon name="ticket" size={13} /> Время для паузы</span><span><Icon name="heart" size={13} /> Забота в деталях</span></div>
            </div>
            <p className="sf-legal">Иллюстративный макет сервиса. Контакты и заведения приведены в качестве примера; партнёрства с авиакомпаниями не заявляются.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
