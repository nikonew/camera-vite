type StarsProps = {
    rating: number;
    currentRate: number;
}

export default function Stars ({rating, currentRate}: StarsProps) :JSX.Element {
  return (
    <svg width="17" height="16" aria-hidden="true" data-testid="rating-item-container">
      <use xlinkHref={`#icon${rating >= currentRate ? '-full' : ''}-star`}></use>
    </svg>
  );
}
