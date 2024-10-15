import { useCallback, useState } from 'react';
import { TCameras } from '../../types/types';

type ProductTabsProps = Pick<TCameras, 'vendorCode' | 'category' | 'type' | 'level' | 'description'>;

export default function ProductTubs ({vendorCode, category, type, level, description}: ProductTabsProps):JSX.Element {
  const [isClickDescription, setIsClickDescription] = useState(false);
  const [isClickCharacteristics, setIsClickCharacteristics] = useState(false);

  const clickCharacteristics = useCallback(() => {
    setIsClickDescription(false);
    setIsClickCharacteristics(true);
  }, []);

  const clickDescription = useCallback(() => {
    setIsClickDescription(true);
    setIsClickCharacteristics(false);
  }, []);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${isClickCharacteristics ? 'is-active' : ''}`}
          type="button"
          onClick = {clickCharacteristics}
        >
        Характеристики
        </button>
        <button className={`tabs__control ${isClickDescription ? 'is-active' : ''}`}
          type="button"
          onClick={clickDescription}
        >
        Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${isClickCharacteristics ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${isClickDescription ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description.split('.')[0]}.</p>
            {description.split('.').length > 1 && <p>{description.split('.').slice(1).join('.')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
