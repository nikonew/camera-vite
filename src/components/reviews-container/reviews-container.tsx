import { useState } from 'react';
import { useAppSelector } from '../../hook/hook-store';
import { reviewsSelectors } from '../../store/slice/reviews-slice';
import ReviewList from './reviews-list';
import { REVIEW_COUNT } from '../../const';

export default function ReviewsContainer ():JSX.Element {
  const [clickToButton, setClickToButton] = useState(REVIEW_COUNT);
  const reviews = useAppSelector(reviewsSelectors.reviews);

  const handleClickToButton = () => {
    setClickToButton(clickToButton + 3);
  };


  //const sortReviewsByDate = [...reviews].sort((a,b)=> new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  const reviewLenght = reviews.length;

  return (
    <>
      {reviews.slice(0,clickToButton).map((review) => (<ReviewList key={review.id} reviewProps={review}/>))}
      <div className="review-block__buttons">
        { reviewLenght > clickToButton && (
          <button className="btn btn--purple"
            type="button"
            onClick={handleClickToButton}
          >
    Показать больше отзывов
          </button>
        )}
      </div>
    </>

  );
}
