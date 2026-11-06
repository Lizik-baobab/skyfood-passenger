import { useState } from 'react';
import { checkTicket } from '../services/passengerService';
import coffeeImage from '../assets/coffee.png';

// --- Иконки ---
const IconSearch = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const IconTicket = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>);
const IconWater = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>);
const IconMeal = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>);
const IconRefresh = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>);
const IconShield = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const IconCafe = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>);
const IconHeart = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const IconArrow = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const IconArrowUpRight = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>);
const IconMapPin = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const IconMail = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const IconPhone = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const IconClock = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const IconBag = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>);
const IconHelp = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);

const CAFES = [
  { id: 1, name: 'АэроКафе', airport: 'SVO', terminal: 'B', floor: '2', sector: '3', zone: 'После досмотра · у выхода 12', category: 'Кофе и выпечка', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Coffee Point', airport: 'SVO', terminal: 'C', floor: '1', sector: '2', zone: 'Общая зона · уровень вылета', category: 'Сэндвичи и перекусы', img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Terminal Bistro', airport: 'SVO', terminal: 'D', floor: '3', sector: '1', zone: 'После досмотра · у выхода 18', category: 'Горячие блюда', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Волга Кафе', airport: 'KZN', terminal: '1', floor: '2', sector: 'B', zone: 'Центральная зона', category: 'Национальная кухня', img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Coffee House', airport: 'KZN', terminal: '1', floor: '1', sector: 'A', zone: 'Зона прилета', category: 'Кофе и десерты', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Airport Food', airport: 'KZN', terminal: '1', floor: '3', sector: 'C', zone: 'Зона вылета', category: 'Фастфуд', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Пулково Кафе', airport: 'LED', terminal: '1', floor: '3', sector: 'A', zone: 'После досмотра', category: 'Завтраки', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 8, name: 'Coffee Point', airport: 'LED', terminal: '1', floor: '1', sector: 'B', zone: 'Зона прилета', category: 'Кофе с собой', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 9, name: 'Terminal Bistro', airport: 'LED', terminal: '1', floor: '2', sector: 'C', zone: 'Общая зона', category: 'Горячие блюда', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
];

const CITIES = [
  { name: 'Москва', airports: [{ code: 'SVO', name: 'Шереметьево' }] },
  { name: 'Казань', airports: [{ code: 'KZN', name: 'Казань' }] },
  { name: 'Санкт-Петербург', airports: [{ code: 'LED', name: 'Пулково' }] },
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
    setLoading(true); setError(''); setData(null);
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
    if (city && city.airports.length > 0) setSelectedAirport(city.airports[0].code);
  };

  const filteredCafes = CAFES.filter(cafe => cafe.airport === selectedAirport);

  return (
    <div className="skyfood-page">
      <header className="sf-header">
        <a href="#hero" className="sf-logo"><span className="sf-logo-icon">✈</span> <span>Sky<span style={{ color: 'var(--blue)' }}>Food</span></span></a>
        <nav className="sf-nav">
          <a href="#hero">Главная</a><a href="#how">Как работает</a><a href="#check-section">Проверить</a>
          <a href="#cafes-list">Где воспользоваться</a><a href="#rules">Правила</a><a href="#contacts">Контакты</a>
        </nav>
      </header>

      <main>
        {/* ГЛАВНЫЙ ЭКРАН (КАРТИНКА НА ВЕСЬ БЛОК С ГРАДИЕНТОМ) */}
        <section className="sf-hero" id="hero">
          <div className="sf-hero-image">
            <img src={coffeeImage} alt="Кофе и круассан" />
          </div>
          <div className="sf-hero-overlay"></div>
          <div className="sf-hero-content">
            <div className="sf-badge">✈ ЧУТЬ БОЛЬШЕ ЗАБОТЫ В ПУТИ</div>
            <h1>SkyFood — вкусное решение при задержке рейса</h1>
            <p>Пусть ожидание станет приятнее. Проверьте ваучер и обменяйте его на воду или обед в аэропорту.</p>
            <button className="sf-primary-button" onClick={() => document.getElementById('check-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Проверить ваучер <IconArrow />
            </button>
            <div className="sf-hero-note">⚙ Без регистрации - код с посадочного талона</div>
          </div>
        </section>

        <section className="sf-main-cards">
          <article className="sf-card sf-check-card" id="check-section">
            <div className="sf-card-heading">
              <span className="sf-heading-icon"><IconSearch /></span>
              <h2>Проверить ваучер</h2>
            </div>

            <form onSubmit={handleCheck} className="sf-check-form">
              <input 
  type="text" 
  value={ticket} 
  onChange={(e) => {
    setTicket(e.target.value);
    if (e.target.value === '') {
      setData(null);
      setError('');
    }
  }} 
  placeholder="Код талона" 
/>
              <button type="submit" disabled={loading}>{loading ? 'Проверяем...' : 'Проверить'}</button>
            </form>
            
            {error && <div className="sf-error-message"><strong>{error}</strong></div>}
            
                        {data && (
              <>
                {data.status === 'Активен' && (
                  <div className="sf-voucher-card">
                    <div className="sf-voucher-header">
                      <span>Ваш ваучер SkyFood</span>
                      <span className="sf-voucher-status">{data.status}</span>
                    </div>
                    <div className="sf-voucher-body">
                      <div className="sf-voucher-field"><span className="sf-field-label">Пассажир:</span><span className="sf-field-value">{data.passengerName}</span></div>
                      <div className="sf-voucher-field"><span className="sf-field-label">Тип ваучера:</span><span className="sf-field-value">{data.voucherType}</span></div>
                      <div className="sf-voucher-field"><span className="sf-field-label">Сумма текущего периода:</span><span className="sf-field-value">{data.totalAmount} {data.currency}</span></div>
                      <div className="sf-voucher-field"><span className="sf-field-label">Статус:</span><span className="sf-field-value">{data.status}</span></div>
                    </div>
                    <div className="sf-voucher-balance-block">
                      <span className="sf-balance-label">Доступный остаток:</span>
                      <span className="sf-balance-value">{data.balance} {data.currency}</span>
                    </div>
                    <div className="sf-voucher-instruction">
                      <p>Предъявите посадочный талон сотруднику участвующего в программе кафе. Сотрудник проверит ваш ваучер и поможет оформить покупку.</p>
                    </div>
                  </div>
                )}
                
                {data.status === 'Не выдан' && (
                  <div className="sf-info-message">
                    <h3>Ваучер пока недоступен</h3>
                    <p>По вашему посадочному талону пока нет доступного ваучера SkyFood. Если ваш рейс задержан, проверьте информацию позднее.</p>
                  </div>
                )}

                {data.status === 'Закрыт' && (
                  <div className="sf-error-message">
                    <h3>Ваучер больше не действует</h3>
                    <p>Ваучер закрыт. Его использование для новых покупок недоступно.</p>
                  </div>
                )}
              </>
            )}

            <div className="sf-hint-container">
              <div className="sf-hint-left">
                <div className="sf-mini-ticket-ui">
                  <div className="sf-mt-top"><span>BOARDING PASS</span><span>✈</span></div>
                  <div className="sf-mt-route"><span>SVO</span> <span>→</span> <span>LED</span></div>
                  <div className="sf-mt-gate">GATE 12 · SEAT 18A</div>
                </div>
                
                <div className="sf-hint-code">
                  <span className="sf-hint-label">КОД ТАЛОНА</span>
                  <span className="sf-hint-value">TK-XXXXXX</span>
                  <div className="sf-barcode"></div>
                </div>
              </div>

              <div className="sf-hint-right">
                <h4>Где найти код?</h4>
                <p>Введите 6 символов с талона — как в выделенной части образца.</p>
                <p className="sf-hint-example"><IconTicket /> Пример: TK-849201 - латиницей</p>
                <div className="sf-test-codes">
                  <strong>Тестовые коды (латиницей):</strong>
                  <span>TK-849201 (активен)</span>
                  <span>TK-000001 (не выдан)</span>
                  <span>TK-999999 (закрыт)</span>
                </div>
              </div>
            </div>

            <div className="sf-bottom-note">
              <IconTicket /> Если ваучер выдан для вашего рейса, здесь появятся его условия и срок действия.
            </div>
          </article>

          <article className="sf-card sf-types-card">
            <div className="sf-card-heading"><h2>Типы ваучеров</h2></div>
            <div className="sf-types">
              <div className="sf-type"><div className="sf-type-icon sf-water"><IconWater /></div><div><strong>WATER</strong><p>Питьевая вода</p></div></div>
              <div className="sf-type"><div className="sf-type-icon sf-meal"><IconMeal /></div><div><strong>MEAL</strong><p>Обед или перекус</p></div></div>
            </div>
            <div className="sf-types-note"><span><IconRefresh /></span>Возможно пополнение ваучера при продолжительной задержке.</div>
          </article>
        </section>

        {/* КАФЕ */}
        <section className="sf-info-section" id="cafes-list">
          <div className="sf-section-label">ГДЕ ПОЛУЧИТЬ</div>
          <h2 className="sf-info-title">Где воспользоваться ваучером</h2>
          <p className="sf-info-subtitle">Выберите аэропорт и удобное кафе для вашей паузы.</p>
          
          <div className="sf-filter-bar">
            <div className="sf-filter-select">
              <IconMapPin /> 
              <select value={selectedCity} onChange={handleCityChange}>
                {CITIES.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
              </select>
            </div>
            <div className="sf-airport-buttons">
              {availableAirports.map(airport => (
                <button key={airport.code} className={selectedAirport === airport.code ? 'active' : ''} onClick={() => setSelectedAirport(airport.code)}>
                  {airport.code}
                </button>
              ))}
            </div>
            <div className="sf-filter-count">{filteredCafes.length} кафе</div>
          </div>

          <div className="sf-cafes-grid-new">
            {filteredCafes.map(cafe => (
              <div key={cafe.id} className="sf-cafe-new-card">
                <div className="sf-cafe-new-image">
                  <img src={cafe.img} alt={cafe.name} />
                  <span className="sf-cafe-new-tag">{cafe.category}</span>
                </div>
                <div className="sf-cafe-new-content">
                  <div className="sf-cafe-new-header">
                    <h3>{cafe.name}</h3>
                    <a href="#rules" className="sf-cafe-new-arrow"><IconArrowUpRight /></a>
                  </div>
                  <p className="sf-cafe-new-location"><IconMapPin /> {cafe.airport} · Терминал {cafe.terminal}</p>
                  <p className="sf-cafe-new-zone">{cafe.zone}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="sf-info-footer" style={{ marginTop: '20px' }}>
            ⓘ Кафе и расположение показаны для примера. Доступные точки будут указаны после проверки ваучера.
          </div>
        </section>

        {/* КАК ЭТО РАБОТАЕТ */}
        <section className="sf-how-section" id="how">
          <div className="sf-section-label">ВСЁ ПРОСТО</div>
          <h2 className="sf-info-title">Как это работает</h2>
          <div className="sf-how-grid">
            <div className="sf-how-step"><div className="sf-how-number">1</div><h3>Проверьте ваучер</h3><p>Введите код с посадочного талона. Узнайте тип ваучера и до какого времени он действует.</p></div>
            <div className="sf-how-step"><div className="sf-how-number">2</div><h3>Выберите кафе</h3><p>Найдите подходящее заведение в вашем терминале. Уточните, находится ли оно после досмотра.</p></div>
            <div className="sf-how-step"><div className="sf-how-number">3</div><h3>Наслаждайтесь паузой</h3><p>Покажите ваучер сотруднику перед заказом. Возьмите воду или перекус и отдохните.</p></div>
          </div>
        </section>

        {/* ПРАВИЛА */}
        <section className="sf-info-section" id="rules">
          <div className="sf-section-label">ПОЛЕЗНО ЗНАТЬ ЗАРАНЕЕ</div>
          <h2 className="sf-info-title">Правила использования</h2>
          <p className="sf-info-subtitle">Немного деталей, чтобы всё прошло легко. Точные условия указаны в вашем ваучере.</p>
          <div className="sf-info-grid">
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconTicket /></div><div><strong>При каких условиях предоставляется</strong><p>Ваучер предоставляется пассажирам при задержке рейса, если авиакомпания участвует в программе SkyFood.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconRefresh /></div><div><strong>Какие виды существуют</strong><p>Программа предусматривает два типа: WATER (вода) и MEAL (питание).</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconWater /></div><div><strong>Чем отличаются WATER и MEAL</strong><p>WATER предоставляется при меньшем времени задержки и предназначен для покупки воды. MEAL — при более длительном ожидании, для питания.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconSearch /></div><div><strong>Как проверить наличие</strong><p>Введите код посадочного талона в разделе «Проверить ваучер» на этой странице.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconMeal /></div><div><strong>Как воспользоваться в кафе</strong><p>Предъявите посадочный талон сотруднику кафе-партнёра. Он проверит ваучер и поможет оформить заказ.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconShield /></div><div><strong>Можно ли использовать несколько раз</strong><p>Да, ваучер можно использовать до тех пор, пока на нём есть остаток средств.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconClock /></div><div><strong>Когда ваучер перестаёт действовать</strong><p>При начале посадки, отмене или вылете рейса ваучер закрывается. После закрытия новые покупки невозможны.</p></div></div>
            <div className="sf-rule-item"><div className="sf-rule-icon"><IconBag /></div><div><strong>Что можно купить</strong><p>Разрешённые продукты и напитки. Спиртные напитки и табачные изделия приобрести нельзя.</p></div></div>
          </div>
          <div className="sf-info-footer" style={{ marginTop: '20px' }}>
            <strong>Особое внимание:</strong> Размер ваучера зависит от авиакомпании. Список разрешённых товаров зависит от типа ваучера. При начале посадки, отмене или вылете рейса ваучер закрывается. После закрытия ваучера новые покупки невозможны.
          </div>
        </section>

                {/* КОНТАКТЫ И ФУТЕР (ОБЪЕДИНЕНЫ) */}
        <section className="sf-footer-section" id="contacts">
          <div className="sf-contacts-grid">
            <div>
              <h2 className="sf-info-title">Контакты</h2>
              <p>Нужна помощь с ваучером? Мы рядом, чтобы ваша пауза в аэропорту прошла спокойнее.</p>
            </div>
            <div className="sf-contact-block">
              <IconMail />
              <div>
                <strong>support@skyfood.example</strong>
                <span>Для вопросов о ваучерах</span>
              </div>
            </div>
            <div className="sf-contact-block">
              <IconPhone />
              <div>
                <strong>8 800 000-00-00</strong>
                <span>Ежедневно · 08:00–22:00 МСК</span>
              </div>
            </div>
          </div>

          <div className="sf-footer-bar">
            <div className="sf-footer-left">© 2026 SkyFood. С заботой о пути.</div>
            <div className="sf-footer-right">
              <span><IconShield /> Бережно к данным</span>
              <span><IconCafe /> Время для паузы</span>
              <span><IconHeart /> Забота в деталях</span>
            </div>
          </div>
          
          <div className="sf-footer-legal">
            Иллюстративный макет сервиса. Контакты и заведения приведены в качестве примера; партнёрства с авиакомпаниями не заявляются.
          </div>
        </section>
      </main>
    </div>
  );
}