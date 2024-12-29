import { useCallback, useEffect } from 'react';
import { TCameras } from '../../types/types';
import { useAppDispatch } from '../../hook/hook-store';
import { basketSlice } from '../../store/slice/basket-slice';

function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

type Props = {
  product: TCameras;
  onClose: () => void;
};

export default function AddItemBasket({product, onClose}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(basketSlice.actions.addProduct(product));
    onClose();
  }, [dispatch, onClose, product]);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
      //добавить товар в корзину
      if ((evt.target as HTMLButtonElement)?.className === 'btn btn--purple modal__btn modal__btn--fit-width' && evt.key === 'Enter') {
        evt.preventDefault();
        handleClick();
      }
      //закрыть попап
      if ((evt.target as HTMLButtonElement)?.className === 'cross-btn' && evt.key === 'Enter') {
        evt.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleClick, onClose]);

  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    vendorCode,
    type,
    level,
    price,
  } = product;

  return (
    <div className="modal is-active" data-testid="catalog-modal">
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width="140"
                  height="120"
                  alt={name}
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
                <span className="visually-hidden">Цена:</span>
                {numberWithSpaces(price)}
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => {
                handleClick();
              }}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
                Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

