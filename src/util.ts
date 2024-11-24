import { SortOrder, SortType } from './const';
import { FilteredCategory, FilteredLevel, FilteredType, TCameras } from './types/types';

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

  const filteredCatalogCategory = [...cameras].filter((camera) => camera.category === filterCategory);
  return filteredCatalogCategory;
};

export const filterCatalogType = (cameras: TCameras[], type: FilteredType[]) => {
  if (!type?.length) {
    return cameras;
  }
  const filteredCatalogType = [...cameras].filter((camera) => type.includes(camera.type));
  return filteredCatalogType;
};

export const filterCatalogLevel = (cameras: TCameras[], level: FilteredLevel[]) => {
  if (!level?.length) {
    return cameras;
  }
  const filteredCatalogLevel = [...cameras].filter((camera) => level.includes(camera.level));
  return filteredCatalogLevel;
};

export const filterCatalogPrice = (cameras: TCameras[], priceMin: number, priceMax: number) => {
  if (!priceMin && !priceMax) {
    return cameras;
  }
  if (!priceMax) {
    priceMax = Infinity;
  }
  const filteredCatalogPrice = [...cameras].filter((camera) => camera.price >= priceMin && camera.price <= priceMax);
  return filteredCatalogPrice;
};

export const filterCatalog = (
  cameras: TCameras[],
  category: FilteredCategory | null,
  type: FilteredType[],
  level: FilteredLevel[],
  priceMin: number,
  priceMax: number
) => {
  const filteredCategory = filterCatalogCategory(cameras, category);
  const filteredType = filterCatalogType(filteredCategory, type);
  const filteredLevel = filterCatalogLevel(filteredType, level);
  const filteredPrice = filterCatalogPrice(filteredLevel, priceMin, priceMax);
  return filteredPrice;
};

export const getPriceMin = (cameras: TCameras[]) => {
  if(!cameras.length) {
    return 0;
  }
  const sortPriceMin = [...cameras].sort((a, b) => a.price - b.price);
  return sortPriceMin[0].price;
};

export const getPriceMax = (cameras: TCameras[]) => {
  if(!cameras.length) {
    return 0;
  }
  const sortPriceMax = [...cameras].sort((a, b) => b.price - a.price);
  return sortPriceMax[0].price;
};
