import { Link } from 'react-router-dom';
import { TCameras } from '../../types/types';
import Rate from '../rate-product-card/rate/rate';
import { AppRoute } from '../../app/router/router';

type CameraCardProps = {
  camera: TCameras;
}

export default function Card ({camera}: CameraCardProps):JSX.Element {
  const {id, name, price, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, reviewCount, rating} = camera;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rate rating={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
