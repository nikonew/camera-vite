import { TReviews } from '../../types/types';
import { formatDateOption } from '../../util';
import Rate from '../rate-product-card/rate/rate';


type ReviewListProps = {
    reviewProps: TReviews;
}

export default function ReviewList ({reviewProps}: ReviewListProps):JSX.Element {
  const {userName, createAt, advantage, disadvantage, rating, review} = reviewProps;

  return(
    <ul className="review-block__list">
      <li className="review-card">
        <div className="review-card__head">
          <p className="title title--h4">{userName} </p>
          <time className="review-card__data" dateTime="2021-12-30">
            {formatDateOption(createAt)}
          </time>
        </div>
        <div className="rate review-card__rate">
          <Rate rating={rating}/>
          <p className="visually-hidden">Оценка: {rating}</p>
        </div>
        <ul className="review-card__list">
          <li className="item-list">
            <span className="item-list__title">Достоинства:</span>
            <p className="item-list__text">{advantage}</p>
          </li>
          <li className="item-list">
            <span className="item-list__title">Недостатки:</span>
            <p className="item-list__text">{disadvantage}</p>
          </li>
          <li className="item-list">
            <span className="item-list__title">Комментарий:</span>
            <p className="item-list__text">
              {review}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  );
}
