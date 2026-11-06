import { STATUS } from '../constants/flights';

const MOCK_DB = {
  'TK-849201': { flightNumber: 'SU1234', status: STATUS.DELAYED, voucherAmount: 500, balance: 500 },
  '1234567890': { flightNumber: 'SU1550', status: STATUS.SCHEDULED, voucherAmount: 0, balance: 0 },
  '5555555555': { flightNumber: 'SU2045', status: STATUS.DELAYED, voucherAmount: 800, balance: 800 },
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function checkTicket(ticketNumber) {
  await wait(600);
  const data = MOCK_DB[ticketNumber];
  if (!data) throw new Error('Билет не найден. Проверьте номер.');
  return { ...data };
}