import { Category, Level, Type } from '../const';

export type TFilteringType = {
    price: number | null;
    priceUp: number | null;
    level: Level[];
    category: Category | null;
    type: Type[];
  };
