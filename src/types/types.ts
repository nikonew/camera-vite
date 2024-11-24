import { CATEGORY, LEVEL, TYPE } from '../const';


export type TCameras = {
    'id': number;
    'name': string;
    'vendorCode': string;
    'type': FilteredType;
    'category': FilteredCategory;
    'description': string;
    'level': FilteredLevel;
    'price': number;
    'rating': number;
    'reviewCount': number;
    'previewImg': string;
    'previewImg2x': string;
    'previewImgWebp': string;
    'previewImgWebp2x': string;
    }

export type TReviews = {
    'id': string;
    'createAt': string;
    'cameraId': number;
    'userName': string;
    'advantage': string;
    'disadvantage': string;
    'review': string;
    'rating': number;
}

export type TOrder = {
    camerasIds: number[];
    coupon: string | null;
    tel: string;
  }

export type FilteredCategory = typeof CATEGORY[keyof typeof CATEGORY]
export type FilteredType = typeof TYPE[keyof typeof TYPE]
export type FilteredLevel = typeof LEVEL[keyof typeof LEVEL]
