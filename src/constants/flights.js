export const STATUS = {
  SCHEDULED: 'SCHEDULED',
  DELAYED: 'DELAYED',
};

export const STATUS_LABELS = {
  [STATUS.SCHEDULED]: 'По расписанию',
  [STATUS.DELAYED]: 'Задержан',
};

export const STATUS_CLASS = {
  [STATUS.SCHEDULED]: 'status--ok',
  [STATUS.DELAYED]: 'status--warn',
};