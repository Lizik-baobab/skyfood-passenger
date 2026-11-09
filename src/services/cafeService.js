
export async function getCafes() {
  const response = await fetch(
    '/api/v1/public/cafes?page=0&size=100'
  );

  if (!response.ok) {
    throw new Error('Не удалось загрузить список кафе');
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data?.items)) {
    throw new Error('Некорректный ответ сервера');
  }

  return result.data.items;
}
