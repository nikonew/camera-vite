import { useAppDispatch } from '../../../hook/hook-store';
import { basketSlice, TypeBasketProduct } from '../../../store/slice/basket-slice';

type Props = {
  product: TypeBasketProduct;
};

export default function BasketListItem ({ product }: Props):JSX.Element {
  const dispatch = useAppDispatch();

  const {
    previewImgWebp,
    previewImgWebp2x,
    name,
    previewImg,
    previewImg2x,
    vendorCode,
    category,
    level,
    price,
    cnt
  } = product;

  return (
    <li className="basket-item" data-testid="product-card-in-basket">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="140"
            height="120"
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price} ₽
      </p>
      <div className="quantity">
        <button
          onClick={() => {
            dispatch(basketSlice.actions.decrementProduct(product));
          }}
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={(cnt || 0) <= 1}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={cnt}
          onChange={(event) => {
            if (Math.ceil(Number(event.target.value)) > 0 && Math.ceil(Number(event.target.value)) < 100) {
              dispatch(basketSlice.actions.setCountProduct({ ...product, cnt: Math.ceil(Number(event.target.value)) }));
            }
          }}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          onClick={() => {
            dispatch(basketSlice.actions.incrementProduct(product));
          }}
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={(cnt || 0) >= 99}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{`${(price * (cnt || 1))} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>

  );
}
