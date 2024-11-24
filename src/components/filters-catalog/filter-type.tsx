import { CATEGORY, TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectFilterCategory, selectFilterType } from '../../store/selectors/cameras-selectors';
import { changeType } from '../../store/slice/cameras-slice';
import { FilteredType } from '../../types/types';

export default function FilterType ():JSX.Element {
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(selectFilterType);
  const category = useAppSelector(selectFilterCategory);

  const handleInputTypeClick = (type: FilteredType) => {
    dispatch(changeType(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(TYPE).map((type) =>(
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input type="checkbox"
              name={type.toLowerCase()}
              checked={currentType.includes(type)}
              onChange={() => handleInputTypeClick(type)}
              disabled={category === CATEGORY.VideoCamera && (type === TYPE.Snapshot || type === TYPE.Film)}
              tabIndex={0}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
