export const enum RequestStatus {Idle, Loading, Success, Failed}

export const RATING = [1,2,3,4,5];

export const REVIEW_COUNT = 3;

export const MIN_NUMBER_OF_CHARACTERS = 3;

export const START_PAGE = 1;

export const PAGINATION_CATALOG_COUNT = 3;

export const PER_PAGE_CAMERAS_COUNT = 9;

export enum SortType {
    Price = 'по цене',
    Popular = 'по популярности',
  }

export enum SortOrder {
    Up = 'по возрастанию',
    Down = 'по убыванию',
  }

export const CATEGORY = {
  PhotoCamera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
} as const;

export type FilteredCategory = typeof CATEGORY[keyof typeof CATEGORY]

export const TYPE = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Collection: 'Коллекционная',
} as const;
export type FilteredType = typeof TYPE[keyof typeof TYPE]

export const LEVEL = {
  Zero: 'Нулевой',
  NonProfessional: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export type FilteredLevel = typeof LEVEL[keyof typeof LEVEL]


