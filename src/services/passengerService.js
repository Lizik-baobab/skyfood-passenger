const MOCK_DATA = {
  // Активный ваучер
  'BP-1001-01': {
    passengerName: 'Александр Иванов',
    voucherType: 'MEAL',
    totalAmount: 1000,
    balance: 750,
    status: 'Активен',
    currency: 'RUB',
  },
  // Билет найден, ваучер не выдан
  'BP-1001-02': {
    passengerName: 'Мария Петрова',
    voucherType: 'WATER',
    totalAmount: 0,
    balance: 0,
    status: 'Не выдан',
    currency: 'RUB',
  },
  // Ваучер закрыт
  'BP-1001-03': {
    passengerName: 'Дмитрий Смирнов',
    voucherType: 'MEAL',
    totalAmount: 1000,
    balance: 0,
    status: 'Закрыт',
    currency: 'RUB',
  },
};

export async function checkTicket(ticketNumber) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const data = MOCK_DATA[ticketNumber];

  if (!data) {
    throw new Error('Посадочный талон не найден. Проверьте правильность введённого кода.');
  }

  return data;
}