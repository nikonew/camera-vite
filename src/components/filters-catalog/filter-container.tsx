import FilterPrice from './filter-price';

export default function FilterContainer (): JSX.Element {
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <FilterPrice/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                defaultValue="photocamera"
                //defaultChecked=""
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input type="radio" name="category" defaultValue="videocamera" />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox"
                name="digital"
                //defaultChecked=""
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox"
                name="film"
                //disabled=""
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                // defaultChecked=""
                // disabled=""
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                // defaultChecked=""
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset">
      Сбросить фильтры
        </button>
      </form>
    </div>

  );
}
