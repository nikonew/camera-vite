import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { selectCameras, selectFilteringCameras, selectFilterPriceMax, selectFilterPriceMin } from '../../store/selectors/cameras-selectors';
import { changePriceMax, changePriceMin } from '../../store/slice/cameras-slice';
import { getPriceMax, getPriceMin } from '../../util';

type FilterPriceProps = {
  resetFilters: boolean;
};

export default function FilterPrice ({resetFilters}: FilterPriceProps):JSX.Element {
  const dispatch = useAppDispatch();
  const currentPriceMin = useAppSelector(selectFilterPriceMin);
  const currentPriceMax = useAppSelector(selectFilterPriceMax);
  const cameras = useAppSelector(selectCameras);
  const filteredCatalogList = useAppSelector(selectFilteringCameras);

  const[priceMin, setPriceMin] = useState(0 || currentPriceMin);
  const [priceMax, setPriceMax] = useState(0 || currentPriceMax);

  const priceMinAll = getPriceMin(cameras);
  const priceMaxAll = getPriceMax(cameras);
  const priceMinFiltered = getPriceMin(filteredCatalogList);
  const priceMaxFiltered = getPriceMax(filteredCatalogList);

  useEffect (() => {
    if (resetFilters) {
      setPriceMin(0);
      setPriceMax(0);
    }
  }, [resetFilters]);

  const checkPriceMin = () => {
    if (!priceMin) {
      setPriceMin(0);
      dispatch(changePriceMin(0));
      return;
    }
    if (priceMin < priceMinFiltered) {
      setPriceMin(priceMinFiltered);
      dispatch(changePriceMin(priceMinFiltered));
      return;
    }
    if (priceMin > priceMaxFiltered) {
      setPriceMin(priceMaxFiltered);
      dispatch(changePriceMin(priceMaxFiltered));
      return;
    }
    dispatch(changePriceMin(priceMin));
  };

  const checkPriceMax = () => {
    if (!priceMax) {
      setPriceMax(0);
      dispatch(changePriceMax(0));
      return;
    }
    if (priceMax > priceMaxFiltered) {
      setPriceMax(priceMaxFiltered);
      dispatch(changePriceMax(priceMaxFiltered));
      return;
    }
    if (priceMax < priceMin) {
      setPriceMax(priceMin);
      dispatch(changePriceMax(priceMin));
      return;
    }
    dispatch(changePriceMax(priceMax));
  };

  const handleChangePriceMin = (event: ChangeEvent<HTMLInputElement>) => {
    const price = Number(event.target.value.replaceAll('-', ''));
    if (event.target.value === '') {
      setPriceMin(priceMinAll);
      dispatch(changePriceMin(0));
    }
    setPriceMin(price);
  };

  const handleChangePriceMax = (event: ChangeEvent<HTMLInputElement>) => {
    const price = Number(event.target.value.replaceAll('-', ''));
    if (event.target.value === '') {
      setPriceMax(priceMaxAll);
      dispatch(changePriceMax(0));
    }
    setPriceMax(price);
  };

  const handleBlurPriceMin = () => {
    checkPriceMin();
  };

  const handleBlurPriceMax = () => {
    checkPriceMax();
  };

  const handleInputPriceMinKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      checkPriceMin();
    }
  };

  const handleInputPriceMaxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      checkPriceMax();
    }
  };


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              onChange={handleChangePriceMin}
              onBlur={handleBlurPriceMin}
              onKeyDown={handleInputPriceMinKeyDown}
              value={priceMin || ''}
              min={Number.MIN_VALUE}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              onChange={handleChangePriceMax}
              onBlur={handleBlurPriceMax}
              onKeyDown={handleInputPriceMaxKeyDown}
              value={priceMax || ''}
              //min={Number.MIN_VALUE}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
