import { useState } from 'react';
import { checkTicket } from '../services/passengerService';
import coffeeImage from '../assets/coffee.png';

const IconSearch = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const IconTicket = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>);
const IconWater = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>);
const IconMeal = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>);
const IconRefresh = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>);
const IconShield = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const IconCafe = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>);
const IconHeart = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const IconArrow = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);

const CAFES = [
  { id: 1, name: 'SkyCafe', airport: 'SVO', city: 'Москва', terminal: 'B', floor: '2', sector: '3', phone: '+7 (495) 123-45-67', vouchers: 'WATER, MEAL' },
  { id: 2, name: 'Coffee Point', airport: 'DME', city: 'Москва', terminal: '1', floor: '1', sector: 'Зона вылета', phone: '', vouchers: 'WATER' },
  { id: 3, name: 'Bistro & Bar', airport: 'LED', city: 'Санкт-Петербург', terminal: '1', floor: '3', sector: 'A', phone: '+7 (812) 765-43-21', vouchers: 'MEAL' },
  { id: 4, name: 'SkyCafe Express', airport: 'SVO', city: 'Москва', terminal: 'D', floor: '1', sector: '2', phone: '+7 (495) 987-65-43', vouchers: 'WATER' },
  { id: 5, name: 'Кавказская Пленница', airport: 'KZN', city: 'Казань', terminal: '1', floor: '2', sector: 'B', phone: '+7 (843) 555-12-34', vouchers: 'MEAL' },
  { id: 6, name: 'Siberian Coffee', airport: 'OVB', city: 'Новосибирск', terminal: 'A', floor: '1', sector: '1', phone: '', vouchers: 'WATER, MEAL' },
  { id: 7, name: 'Уральские пельмени', airport: 'SVX', city: 'Екатеринбург', terminal: '2', floor: '3', sector: 'C', phone: '+7 (343) 777-88-99', vouchers: 'MEAL' },
  { id: 8, name: 'Sochi Breeze', airport: 'AER', city: 'Сочи', terminal: '1', floor: '1', sector: 'Зона прилета', phone: '+7 (862) 222-33-44', vouchers: 'WATER' },
];

const CITIES = [
  { name: 'Москва', airports: [{ code: 'SVO', name: 'Шереметьево' }, { code: 'DME', name: 'Домодедово' }] },
  { name: 'Санкт-Петербург', airports: [{ code: 'LED', name: 'Пулково' }] },
  { name: 'Казань', airports: [{ code: 'KZN', name: 'Казань' }] },
  { name: 'Новосибирск', airports: [{ code: 'OVB', name: 'Толмачёво' }] },
  { name: 'Екатеринбург', airports: [{ code: 'SVX', name: 'Кольцово' }] },
  { name: 'Сочи', airports: [{ code: 'AER', name: 'Адлер' }] },
];

export default function PassengerScreen() {
  const [ticket, setTicket] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [selectedAirport, setSelectedAirport] = useState('SVO');

  const handleCheck = async (e) => {
    e.preventDefault();
    const code = ticket.trim();
    if (!code || loading) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await checkTicket(code);
      setData(result);
    } catch (err) {
      setError(err?.message || 'Не удалось проверить ваучер. Попробуйте ещё раз позднее.');
    } finally {
      setLoading(false);
    }
  };

  const currentCity = CITIES.find(c => c.name === selectedCity);
  const availableAirports = currentCity ? currentCity.airports : [];

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    const city = CITIES.find(c => c.name === cityName);
    if (city && city.airports.length > 0) {
      setSelectedAirport(city.airports[0].code);
    }
  };

  const filteredCafes = CAFES.filter(cafe => cafe.airport === selectedAirport);

  return (
    <div className="skyfood-page">
      <header className="sf-header">
        <a href="#hero" className="sf-logo">
          <span className="sf-logo-icon">✈</span>
          <span>Sky<span style={{ color: 'var(--blue)' }}>Food</span></span>
        </a>
        <nav className="sf-nav">
          <a href="#hero">Главная</a>
          <a href="#how">Как это работает</a>
          <a href="#check-section">Проверить ваучер</a>
          <a href="#cafes-list">Где воспользоваться ваучером</a>
          <a href="#rules">Правила использования</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </header>

      <main>
        <section className="sf-hero" id="hero">
          <div className="sf-hero-image"><img src={coffeeImage} alt="Кофе и выпечка SkyFood" /></div>
          <div className="sf-hero-overlay"></div>
          <div className="sf-hero-content">
            <div className="sf-hero-brand">SkyFood —</div>
            <h1>вкусное решение<br />при задержке рейса<span className="sf-heart">♡</span></h1>
            <p>Получите ваучер на воду или питание<br />и наслаждайтесь едой в аэропорту</p>
            <button className="sf-primary-button" onClick={() => document.getElementById('check-section')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="sf-primary-text">Проверить ваучер</span><IconArrow />
            </button>
          </div>
          <div className="sf-plane-decoration">✈</div>
        </section>

        <section className="sf-main-cards">
          <article className="sf-card sf-check-card" id="check-section">
            <div className="sf-card-heading"><span className="sf-heading-icon"><IconSearch /></span><h2>Проверить ваучер</h2></div>
            <p className="sf-card-description">Введите код посадочного талона, чтобы проверить наличие ваучера SkyFood.</p>
            <form onSubmit={handleCheck} className="sf-check-form">
              <input type="text" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Код посадочного талона" />
              <button type="submit" disabled={loading}>{loading ? 'Проверяем...' : 'Проверить'}</button>
            </form>
            
            {error && <div className="sf-error-message"><strong>{error}</strong></div>}
            
            {data && (
              <>
                {data.status === 'Активен' && (
                  <div className="sf-voucher-card">
                    <div className="sf-voucher-header"><span>Ваш ваучер SkyFood</span><span className="sf-voucher-status">{data.status}</span></div>
                    <div className="sf-voucher-row"><span>Пассажир:</span> <strong>{data.passengerName}</strong></div>
                    <div className="sf-voucher-row"><span>Тип ваучера:</span> <strong>{data.voucherType}</strong></div>
                    <div className="sf-voucher-row"><span>Сумма периода:</span> <strong>{data.totalAmount} RUB</strong></div>
                    <div className="sf-voucher-balance">Остаток: <strong>{data.balance} RUB</strong></div>
                    <p className="sf-voucher-instruction">Предъявите посадочный талон сотруднику участвующего в программе кафе.</p>
                  </div>
                )}
                {data.status === 'Не выдан' && (
                  <div className="sf-info-message"><strong>Ваучер пока недоступен</strong><p>По вашему посадочному талону пока нет доступного ваучера SkyFood. Если ваш рейс задержан, проверьте информацию позднее.</p></div>
                )}
                {data.status === 'Закрыт' && (
                  <div className="sf-error-message"><strong>Ваучер больше не действует</strong><p>Ваучер закрыт. Его использование для новых покупок недоступно.</p></div>
                )}
              </>
            )}

            <div className="sf-card-hint">
              <div className="sf-hint-header"><span>ⓘ</span> Где найти код? Посмотрите на посадочный талон:</div>
              <div className="sf-mini-ticket">
                <div className="sf-mini-ticket-header"><span>ПОСАДОЧНЫЙ ТАЛОН</span><span>✈</span></div>
                <div className="sf-mini-ticket-route"><span>SVO</span><svg width="30" height="10" viewBox="0 0 30 10"><path d="M0 5 L25 5 M20 2 L25 5 L20 8" stroke="#2364B5" strokeWidth="1.5" fill="none"/></svg><span>AER</span></div>
                <div className="sf-mini-ticket-code"><span className="sf-mini-ticket-label">Код бронирования:</span><span className="sf-mini-ticket-highlight">TK-849201</span></div>
              </div>
              <p style={{ marginTop: '10px', fontSize: '10px' }}><strong>Тестовые коды:</strong><br/>TK-849201 (активен)<br/>TK-000001 (не выдан)<br/>TK-999999 (закрыт)</p>
            </div>
            <div className="sf-ticket-decoration"><div className="sf-ticket-top">✈</div><div className="sf-ticket-lines"></div></div>
          </article>

          <article className="sf-card sf-types-card">
            <div className="sf-card-heading"><span className="sf-heading-icon"><IconTicket /></span><h2>Типы ваучеров</h2></div>
            <div className="sf-types">
              <div className="sf-type"><div className="sf-type-icon sf-water"><IconWater /></div><div><strong>WATER</strong><p>Ваучер на воду. Предоставляется после достижения порога задержки.</p></div></div>
              <div className="sf-type"><div className="sf-type-icon sf-meal"><IconMeal /></div><div><strong>MEAL</strong><p>Ваучер на питание. Предоставляется при более длительной задержке.</p></div></div>
            </div>
            <div className="sf-types-note"><span><IconRefresh /></span>Возможно пополнение ваучера при продолжительной задержке.</div>
          </article>
        </section>

        <section className="sf-info-section" id="cafes-list">
          <h2 className="sf-info-title">Где воспользоваться ваучером</h2>
          
          <div className="sf-filter-container">
            <div className="sf-filter-group">
              <label>Город:</label>
              <select value={selectedCity} onChange={handleCityChange} className="sf-select">
                {CITIES.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="sf-filter-group">
              <label>Аэропорт:</label>
              <div className="sf-airport-buttons">
                {availableAirports.map(airport => (
                  <button 
                    key={airport.code} 
                    className={selectedAirport === airport.code ? 'active' : ''} 
                    onClick={() => setSelectedAirport(airport.code)}
                  >
                    {airport.code} ({airport.name})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sf-cafes-grid-warm">
            {filteredCafes.map(cafe => (
              <div key={cafe.id} className="sf-cafe-card-warm">
                <h3>{cafe.name}</h3>
                <p><strong>Терминал:</strong> {cafe.terminal}, {cafe.floor} этаж, сектор {cafe.sector}</p>
                {cafe.phone && <p><strong>Телефон:</strong> {cafe.phone}</p>}
                <p><strong>Ваучеры:</strong> {cafe.vouchers}</p>
              </div>
            ))}
            {filteredCafes.length === 0 && <p className="sf-empty-msg">В этом аэропорту пока нет кафе-партнёров.</p>}
          </div>
        </section>

        <section className="sf-how-section" id="how">
          <h2 className="sf-info-title">Как это работает</h2>
          <div className="sf-how-grid">
            <div className="sf-how-step"><div className="sf-how-number">1</div><h3>Задержка рейса</h3><p>Авиакомпания сообщает о задержке. Вам автоматически начисляется ваучер.</p></div>
            <div className="sf-how-step"><div className="sf-how-number">2</div><h3>Проверка билета</h3><p>Введите код посадочного талона, чтобы узнать тип и остаток.</p></div>
            <div className="sf-how-step"><div className="sf-how-number">3</div><h3>Получение питания</h3><p>Предъявите талон в кафе. Сотрудник спишет сумму с ваучера.</p></div>
          </div>
        </section>

        <section className="sf-info-section" id="rules">
          <h2 className="sf-info-title">Правила использования</h2>
          <div className="sf-info-grid">
            <div className="sf-info-item"><strong>1. Условия предоставления</strong><p>Ваучер предоставляется при задержке рейса, если авиакомпания участвует в программе.</p></div>
            <div className="sf-info-item"><strong>2. Виды ваучеров</strong><p>WATER — для воды. MEAL — для питания.</p></div>
            <div className="sf-info-item"><strong>3. Чем отличаются</strong><p>WATER даётся при меньшей задержке, MEAL — при большей.</p></div>
            <div className="sf-info-item"><strong>4. Как проверить</strong><p>Введите код талона в разделе проверки на этой странице.</p></div>
            <div className="sf-info-item"><strong>5. Как воспользоваться</strong><p>Предъявите талон сотруднику кафе. Он спишет сумму.</p></div>
            <div className="sf-info-item"><strong>6. Можно ли использовать несколько раз</strong><p>Да, пока на ваучере есть остаток средств.</p></div>
            <div className="sf-info-item"><strong>7. Когда закрывается</strong><p>При посадке, отмене или вылете рейса.</p></div>
            <div className="sf-info-item"><strong>8. Что можно купить</strong><p>Разрешённые продукты и напитки. Алкоголь и табак нельзя.</p></div>
          </div>
          <p className="sf-info-footer">Размер ваучера зависит от авиакомпании. После закрытия новые покупки невозможны.</p>
        </section>

        <section className="sf-contacts-section" id="contacts">
          <h2 className="sf-info-title">Контактная информация</h2>
          <p>Если у вас возникли вопросы, свяжитесь с нами:</p>
          <div className="sf-contacts-list">
            <div>📧 Email: <a href="mailto:support@skyfood.ru">support@skyfood.ru</a></div>
            <div>📞 Телефон: <a href="tel:88005553535">8 (800) 555-35-35</a></div>
          </div>
        </section>

        <footer className="sf-benefits">
          <div className="sf-benefit"><span><IconShield /></span><p>Удобно и быстро</p></div>
          <div className="sf-benefit"><span><IconCafe /></span><p>Широкий выбор кафе</p></div>
          <div className="sf-benefit"><span><IconHeart /></span><p>Забота о пассажирах</p></div>
          <div className="sf-benefits-copyright">© 2026 SkyFood. Все права защищены.</div>
        </footer>
      </main>
    </div>
  );
}