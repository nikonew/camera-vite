export const formatDateOption = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
  };

  return date.toLocaleDateString('ru-RU', options);
};

