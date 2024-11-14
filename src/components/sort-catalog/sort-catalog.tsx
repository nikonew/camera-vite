import { useMemo } from 'react';
import { SortOrder, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectSortOrder, selectSortType } from '../../store/selectors/cameras-selectors';
import { changeSortOrder, changeSortType } from '../../store/slice/cameras-slice';


export default function SortCatalog ():JSX.Element {
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector(selectSortType);
  const currentSortOrder = useAppSelector(selectSortOrder);


  const handlerSortTypeChange = useMemo(() => (type: SortType) => {
    dispatch(changeSortType({sortType: type}));
  }, [dispatch]);

  const handlerSortOrderChange = useMemo(() => (order: SortOrder) => {
    dispatch(changeSortOrder({sortOrder: order}));
  }, [dispatch]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {(Object.keys(SortType) as Array<keyof typeof SortType>).map((type) => (
              <div className="catalog-sort__btn-text" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="sort"
                  checked={currentSortType === SortType[type]}
                  onChange={() => handlerSortTypeChange(SortType[type])}
                />
                <label htmlFor={type}>{SortType[type]}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {(Object.keys(SortOrder) as Array<keyof typeof SortOrder>).map((order) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${order.toString().toLowerCase()}`} key={order}>
                <input
                  type='radio'
                  id={order.toString().toLowerCase()}
                  name='sort-icon'
                  aria-label={SortOrder[order]}
                  onChange={() => handlerSortOrderChange(SortOrder[order])}
                  checked={currentSortOrder === SortOrder[order]}
                />
                <label htmlFor={order.toString().toLowerCase()}>
                  <svg width={16} height={14} aria-hidden='true'>
                    <use xlinkHref='#icon-sort'/>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>

  );
}
