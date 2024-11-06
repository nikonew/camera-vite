import { Link } from 'react-router-dom';

export default function ArrowToTop ():JSX.Element {
  const handleArrowClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      className="up-btn"
      to="#header"
      onClick={handleArrowClick}
      data-testid="arrow-container"
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}
