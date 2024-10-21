export type TCameras = {
    'id': number;
    'name': string;
    'vendorCode': string;
    'type': string;
    'category': string;
    'description': string;
    'level': string;
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
