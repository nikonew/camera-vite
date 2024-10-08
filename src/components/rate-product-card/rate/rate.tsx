import { RATING } from '../../../const';
import Stars from '../stars/stars';

type RateProps = {
    rating: number;
}

export default function Rate ({rating}: RateProps) :JSX.Element {
  return (
    <>
      {RATING.map((item)=><Stars rating={rating} currentRate={item} key={item}/>)}
    </>
  );
}
