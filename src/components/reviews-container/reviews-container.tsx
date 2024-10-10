import { useAppSelector } from '../../hook/hook-store';
import { reviewsSelectors } from '../../store/slice/reviews-slice';
import ReviewList from './reviews-list';

export default function ReviewsContainer ():JSX.Element {
  const reviews = useAppSelector(reviewsSelectors.reviews);
  return (
    <>
      {reviews.slice(0,3).map((review) => (<ReviewList key={review.id} reviewProps={review}/>))}
    </>

  );
}
