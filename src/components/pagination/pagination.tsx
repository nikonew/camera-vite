import { useEffect, useState } from 'react';
import PaginationItem from './pagination-item';
import { PAGINATION_CATALOG_COUNT, PER_PAGE_CAMERAS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectSortCameras, selectCurrentPage } from '../../store/selectors/cameras-selectors';
import { changeCurrentPage } from '../../store/slice/cameras-slice';

export default function Pagination (): JSX.Element {
  const paginationCatalog = useAppSelector(selectSortCameras);
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState<number[]>([]);
  const pagesCount = Math.ceil(paginationCatalog.length / PER_PAGE_CAMERAS_COUNT);

  useEffect(() => {

    if(pagesCount >= PAGINATION_CATALOG_COUNT){
      setPages(Array.from({length: PAGINATION_CATALOG_COUNT }, (_, i) => i + 1));
    } else {
      setPages(Array.from({length: pagesCount }, (_, i) => i + 1));
    }

  }, [pagesCount]);


  const handleGoToNextPage = () => {
    const firstIndex = pages[pages.length - 1] + 1;
    dispatch(changeCurrentPage({currentPage: firstIndex}));
    const newPages = [];
    for(let i = firstIndex; i < firstIndex + PAGINATION_CATALOG_COUNT; i++){
      if (i <= pagesCount){
        newPages.push(i);
      }
    }
    setPages(newPages);

  };

  const handlePrevPageClick = () => {
    const lastIndex = pages[0] - 1;
    dispatch(changeCurrentPage({currentPage: lastIndex}));
    const newPages = [];
    for(let i = lastIndex; i > lastIndex - PAGINATION_CATALOG_COUNT; i--){
      if (i <= pagesCount){
        newPages.unshift(i);
      }
    }
    setPages(newPages);

  };

  const handelChangePage = (newPage: number) => {
    if(currentPage !== newPage){
      dispatch(changeCurrentPage({currentPage: newPage}));
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {!pages?.includes(1) ?
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" onClick={handlePrevPageClick}>
      Назад
            </a>
          </li> : '' }
        {pages.map((page) => <PaginationItem key={page} page={page} currentPage={currentPage} onClick={handelChangePage} />)}
        {!pages.includes(pagesCount) ?
          <li className="pagination__item">
            <span className="pagination__link pagination__link--text"
              onClick={handleGoToNextPage}
            >
      Далее
            </span>
          </li> : ''}
      </ul>
    </div>

  );
}
