import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../app/router/router';

type Props = {
  onClose: () => void;
}


export default function AddItemSuccesBasket ({ onClose }: Props): JSX.Element {


  useEffect(
    () => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.code === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    },
    [onClose]
  );


  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={AppRoute.Catalog}>
          Продолжить покупки
            </Link>
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>
          Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

