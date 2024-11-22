import { CATEGORY, FilteredCategory } from '../../const';
import { changeCategory } from '../../store/slice/cameras-slice';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectFilterCategory } from '../../store/selectors/cameras-selectors';


export default function FilterCategory ():JSX.Element {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectFilterCategory);

  const handleInputCategoryClick = (category: FilteredCategory) => {
    dispatch(changeCategory({category}));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.entries(CATEGORY).map(([category, value]) => (
        <div className="custom-radio catalog-filter__item" key={category}>
          <label>
            <input
              type="radio"
              name={category.toLowerCase()}
              checked={currentCategory === value}
              onChange={() => handleInputCategoryClick(value)}
              tabIndex={0}
            />
            <span className="custom-radio__icon"></span>
            <span className="custom-radio__label">{value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
