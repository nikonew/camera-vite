import { FilteredLevel, LEVEL } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectFilterLevel } from '../../store/selectors/cameras-selectors';
import { changeLevel } from '../../store/slice/cameras-slice';

export default function FilterLevel ():JSX.Element {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(selectFilterLevel);

  const handleInputLevelClick = (level: FilteredLevel) => {
    dispatch(changeLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.entries(LEVEL).map(([level, value]) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input
              type="checkbox"
              name={level.toLowerCase()}
              checked={currentLevel.includes(value)}
              onChange={() => handleInputLevelClick(value)}
              tabIndex={0}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{value}</span>
          </label>
        </div>
      ))}

    </fieldset>
  );
}
