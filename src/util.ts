import { SortOrder, SortType, FilteredCategory, FilteredLevel, FilteredType } from './const';
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

export const filterCatalogCategory = (cameras: TCameras[], filterCategory: FilteredCategory| null) => {
  if (!filterCategory) {
    return cameras;
  }

  const filteredCatalog = [...cameras].filter((camera) => camera.category === filterCategory);
  return filteredCatalog;
};

export const filterCatalogType = (cameras: TCameras[], type: FilteredType[]) => {
  if (!type?.length) {
    return cameras;
  }
  const filteredCatalogList = [...cameras].filter((camera) => type.includes(camera.type));
  return filteredCatalogList;
};

export const filterCatalogLevel = (cameras: TCameras[], level: FilteredLevel[]) => {
  if (!level?.length) {
    return cameras;
  }
  const filteredCatalogList = [...cameras].filter((camera) => level.includes(camera.level));
  return filteredCatalogList;
};

export const filterCatalog = (
  cameras: TCameras[],
  category: FilteredCategory | null,
  type: FilteredType[],
  level: FilteredLevel[],
) => {
  const filteredCategory = filterCatalogCategory(cameras, category);
  const filteredType = filterCatalogType(filteredCategory, type);
  const filteredLevel = filterCatalogLevel(filteredType, level);
  return filteredLevel;
};
