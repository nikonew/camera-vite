export const formatDateOption = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
  };

  return date.toLocaleDateString('ru-RU', options);
};

export const scrollToTop = (behavior: ScrollBehavior = 'auto') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};
