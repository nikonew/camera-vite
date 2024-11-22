import FilterCategory from './filter-category';
import FilterLevel from './filter-level';
import FilterPrice from './filter-price';
import FilterType from './filter-type';

export default function FilterContainer (): JSX.Element {


  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterPrice/>
        <FilterCategory/>
        <FilterType/>
        <FilterLevel/>
        <button className="btn catalog-filter__reset-btn" type="reset">
      Сбросить фильтры
        </button>
      </form>
    </div>

  );
}
