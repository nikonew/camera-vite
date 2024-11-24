import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hook/hook-store';
import { resetFilters } from '../../store/slice/cameras-slice';
import FilterCategory from './filter-category';
import FilterLevel from './filter-level';
import FilterPrice from './filter-price';
import FilterType from './filter-type';

export default function FilterContainer (): JSX.Element {
  const dispatch = useAppDispatch();
  const [isResetFilters, setIsResetFilters] = useState(false);

  const handleFilterReset = () => {
    setIsResetFilters(true);
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (isResetFilters) {
      setIsResetFilters(false);
    }
  }, [isResetFilters]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterPrice resetFilters={isResetFilters}/>
        <FilterCategory/>
        <FilterType/>
        <FilterLevel/>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleFilterReset}
        >
      Сбросить фильтры
        </button>
      </form>
    </div>

  );
}
