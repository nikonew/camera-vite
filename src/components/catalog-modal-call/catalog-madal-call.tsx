import { TCameras } from '../../types/types';
import ModalPhoneInput from './modal-phone-input';

type CatalogModalCallProps = {
  camera: TCameras | null;
  onClose: () => void;
}

export default function CatalogModalCall ({camera, onClose}: CatalogModalCallProps):JSX.Element | null {

  if (!camera) {
    return null;
  }

  const {name, vendorCode, level, type, price, previewImgWebp2x,previewImgWebp, previewImg2x, previewImg} = camera;

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt="Фотоаппарат «Орлёнок»"
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{price} ₽
              </p>
            </div>
          </div>
          <ModalPhoneInput/>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}
