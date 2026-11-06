import { useState } from 'react';
import { checkTicket } from '../services/passengerService';
import coffeeImage from '../assets/coffee.png';
import cafeImage from '../assets/cafe.png';

// --- ЖИРНЫЕ SVG иконки ---
const IconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const IconTicket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path>
  </svg>
);
const IconPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const IconWater = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);
const IconMeal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);
const IconRefresh = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
const IconCafe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);
const IconHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function PassengerScreen() {
  const [ticket, setTicket] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError(err?.message || 'Не удалось проверить ваучер. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToCheck = () => {
    document.getElementById('check-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="skyfood-page">
      {/* ШАПКА */}
      <header className="sf-header">
        {/* Исправленный логотип без пробела */}
        <a href="#hero" className="sf-logo">
          <span className="sf-logo-icon">✈</span>
          <span>Sky<span style={{ color: 'var(--blue)' }}>Food</span></span>
        </a>
        
        <nav className="sf-nav">
          <a href="#hero">Главная</a>
          <a href="#how">Как это работает</a>
          <a href="#check-section">Проверить ваучер</a>
          <a href="#cafes">Кафе-партнёры</a>
          <a href="#rules">Правила использования</a>
          <a href="#check-section" style={{ fontWeight: '900', color: 'var(--navy)' }}>Контакты</a>
        </nav>
      </header>

      {/* ГЛАВНЫЙ ЭКРАН */}
      <main>
        <section className="sf-hero" id="hero">
          <div className="sf-hero-image">
            <img src={coffeeImage} alt="Кофе и выпечка SkyFood" />
          </div>
          <div className="sf-hero-overlay"></div>
          <div className="sf-hero-content">
            <div className="sf-hero-brand">SkyFood —</div>
            <h1>вкусное решение<br />при задержке рейса<span className="sf-heart">♡</span></h1>
            <p>Получите ваучер на воду или питание<br />и наслаждайтесь едой в аэропорту</p>
            
            {/* Увеличенная кнопка */}
            <button className="sf-primary-button" onClick={scrollToCheck}>
              <span className="sf-primary-text">Проверить ваучер</span>
              <IconArrow />
            </button>

          </div>
          <div className="sf-plane-decoration">✈</div>
        </section>

        {/* ТРИ КАРТОЧКИ */}
        <section className="sf-main-cards">
          {/* Проверка ваучера */}
          <article className="sf-card sf-check-card" id="check-section">
            <div className="sf-card-heading">
              <span className="sf-heading-icon"><IconSearch /></span>
              <h2>Проверить ваучер</h2>
            </div>
            <p className="sf-card-description">Введите код посадочного талона,<br />чтобы проверить наличие ваучера SkyFood.</p>
            <form onSubmit={handleCheck} className="sf-check-form">
              <input type="text" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Код посадочного талона" />
              <button type="submit" disabled={loading}>{loading ? 'Проверяем...' : 'Проверить'}</button>
            </form>
            {error && <div className="sf-error">{error}</div>}
            {data && <div className="sf-result"><strong>Результат:</strong><pre>{JSON.stringify(data, null, 2)}</pre></div>}
            <div className="sf-card-hint"><span>ⓘ</span> Где найти код? Посмотрите на посадочный талон.</div>
            <div className="sf-ticket-decoration">
              <div className="sf-ticket-top">✈</div>
              <div className="sf-ticket-lines"></div>
            </div>
          </article>

          {/* Типы ваучеров */}
          <article className="sf-card sf-types-card" id="how">
            <div className="sf-card-heading">
              <span className="sf-heading-icon"><IconTicket /></span>
              <h2>Типы ваучеров</h2>
            </div>
            <div className="sf-types">
              <div className="sf-type">
                <div className="sf-type-icon sf-water"><IconWater /></div>
                <div>
                  <strong>WATER</strong>
                  <p>Ваучер на воду.<br />Предоставляется<br />при задержке рейса.</p>
                </div>
              </div>
              <div className="sf-type">
                <div className="sf-type-icon sf-meal"><IconMeal /></div>
                <div>
                  <strong>MEAL</strong>
                  <p>Ваучер на питание.<br />Предоставляется<br />при более длительной<br />задержке.</p>
                </div>
              </div>
            </div>
            <div className="sf-types-note">
              <span><IconRefresh /></span>
              Возможно пополнение ваучера<br />при продолжительной задержке.
            </div>
          </article>

          {/* Кафе */}
          <article className="sf-card sf-cafe-card" id="cafes">
            <div className="sf-cafe-content">
              <div className="sf-card-heading">
                <span className="sf-heading-icon"><IconPin /></span>
                <h2>Где воспользоваться ваучером</h2>
              </div>
              <p>Список кафе-партнёров<br />в аэропорту</p>
              <a href="#rules" className="sf-cafe-button">
                Посмотреть кафе <IconArrow />
              </a>
            </div>
            <div className="sf-cafe-photo">
              <img src={cafeImage} alt="Кафе-партнёр SkyFood" />
            </div>
          </article>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="sf-benefits" id="rules">
          <div className="sf-benefit">
            <span><IconShield /></span>
            <p>Удобно<br />и быстро</p>
          </div>
          <div className="sf-benefit">
            <span><IconCafe /></span>
            <p>Широкий выбор<br />кафе</p>
          </div>
          <div className="sf-benefit">
            <span><IconHeart /></span>
            <p>Забота о пассажирах</p>
          </div>
          <div className="sf-benefits-plane">
            <svg width="380" height="70" viewBox="0 0 380 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 50 Q 120 10, 220 40 T 340 20" stroke="#4386D0" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" fill="none" />
              <g transform="translate(330, 5) rotate(15)">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#4386D0" />
              </g>
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}