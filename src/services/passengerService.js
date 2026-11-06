const MOCK_DATA = {
  '555-1234567890': {
    passengerName: 'Иванов Иван Иванович',
    voucherType: 'MEAL',
    totalAmount: 1000,
    balance: 750,
    status: 'Активен',
    currency: 'RUB',
  },
  '555-0000000001': {
    passengerName: 'Петров Петр Петрович',
    voucherType: 'WATER',
    totalAmount: 0,
    balance: 0,
    status: 'Не выдан',
    currency: 'RUB',
  },
  '555-9999999999': {
    passengerName: 'Сидоров Сидор Сидорович',
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