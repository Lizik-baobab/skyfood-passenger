
export async function checkTicket(ticketNumber) {
  const code = ticketNumber.trim().toUpperCase();

  if (!code) {
    throw new Error('Введите код посадочного талона');
  }

  const response = await fetch(
    `/api/v1/public/vouchers/check?boardingPassCode=${encodeURIComponent(code)}`
  );

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success !== true) {
    throw new Error(
      result?.error?.message ||
      'Не удалось проверить ваучер'
    );
  }

  const voucher = result.data;

  const statuses = {
    ACTIVE: 'Активен',
    NOT_ISSUED: 'Не выдан',
    CLOSED: 'Закрыт'
  };

  if (!statuses[voucher?.status]) {
    throw new Error('Получен неизвестный статус ваучера');
  }

  return {
    ...voucher,
    status: statuses[voucher.status]
  };
}
