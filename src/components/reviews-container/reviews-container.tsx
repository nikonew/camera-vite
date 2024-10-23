import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { reviewsSelectors } from '../../store/slice/reviews-slice';
import ReviewList from './reviews-list';
import { REVIEW_COUNT } from '../../const';
import { fetchAllReviews } from '../../store/thunk/thunk';
import { useParams } from 'react-router-dom';


export default function ReviewsContainer ():JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(reviewsSelectors.reviews);
  const [clickToButton, setClickToButton] = useState(REVIEW_COUNT);
  const {id} = useParams();
  const productId = id?.trim() ?? '';

  useEffect (() => {
    dispatch(fetchAllReviews(productId));
  }, [dispatch, productId]);


  const handleClickToButton = () => {
    setClickToButton(clickToButton + REVIEW_COUNT);
  };


  const sortReviewsByDate = reviews && [...reviews].sort((a,b)=> Date.parse(b.createAt) - Date.parse(a.createAt));

  return (
    <>
      {reviews.length > 0 ? sortReviewsByDate.slice(0,clickToButton).map((review) => <ReviewList key={review.id} reviewProps={review}/>) : <li className="review-card">Ваш отзыв будет первым</li>}
      <div className="review-block__buttons">
        { sortReviewsByDate.length > clickToButton && (
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
