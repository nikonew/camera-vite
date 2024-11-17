type PaginationPageProps = {
  page: number;
currentPage: number;
onClick: (page: number) => void;
}
export default function PaginationItem ({page, currentPage, onClick}: PaginationPageProps): JSX.Element {

  return (
    <li className="pagination__item">
      <span className={`pagination__link${currentPage === page ? ' pagination__link--active' : ''}`} onClick={() => onClick(page)}>
        {page}
      </span>
    </li>
  );
}
