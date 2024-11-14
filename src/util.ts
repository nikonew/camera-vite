import { SortOrder, SortType } from './const';
import { TCameras } from './types/types';

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

export const getSortCatalog = (type: SortType, cameras: TCameras[], order: SortOrder) => {
  switch (type) {
    case SortType.Price:
      if (order === SortOrder.Up) {
        return cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.price - cameraA.price);
    case SortType.Popular:
      if (order === SortOrder.Up) {
        return cameras.slice().sort((cameraA, cameraB) => cameraA.rating - cameraB.rating);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.rating - cameraA.rating);
    default:
      return cameras;
  }
};
