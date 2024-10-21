import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { reviewsSelectors } from '../../store/slice/reviews-slice';
import ReviewList from './reviews-list';
import { REVIEW_COUNT } from '../../const';
import { fetchAllReviews } from '../../store/thunk/thunk';
import { useParams } from 'react-router-dom';


export default function ReviewsContainer ():JSX.Element {
  const [clickToButton, setClickToButton] = useState(REVIEW_COUNT);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(reviewsSelectors.reviews);
  const {id} = useParams();
  const productId = id?.trim() ?? '';

  useEffect (() => {
    dispatch(fetchAllReviews(productId));
  }, [dispatch, productId]);


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
