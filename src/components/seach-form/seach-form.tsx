import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/hook-store';
import { MIN_NUMBER_OF_CHARACTERS } from '../../const';
import { TCameras } from '../../types/types';
import cn from 'classnames';
import { selectCameras } from '../../store/selectors/cameras-selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../app/router/router';


export default function SeachForm ():JSX.Element {
  const camerasSeach = useAppSelector(selectCameras);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState<TCameras[]>([]);
  const [isDropList, setDropList] = useState(false);
  const seachRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDropList &&
      selectedItem >= 0 &&
      selectedItem < searchData.length) {
      document
        .querySelectorAll('.form-search__select-item')[selectedItem].scrollIntoView({
          block: 'nearest'
        });
    }
  }, [isDropList, selectedItem, searchData.length]);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const searchElement = camerasSeach.filter((camera) =>
      camera.name.toLowerCase().includes(query.toLocaleLowerCase()));
    setSearchData(searchElement);
    setDropList(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedItem((prevItem) => (prevItem === -1 ? searchData.length - 1 : prevItem - 1));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedItem((prevItem) => (prevItem === searchData.length - 1 ? -1 : prevItem + 1));
    } else if (event.key === 'Enter' && selectedItem !== -1) {
      event.preventDefault();
      const focusedCamera = searchData[selectedItem];
      navigate(`${AppRoute.Product}/${focusedCamera.id}`);
    }

  };

  const handelReset = () => {
    setQuery('');
    setSearchData([]);
  };

  return (
    <div className={cn('form-search',{ 'list-opened': query.length })} >
      <form ref={seachRef}>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            value={query}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleChangeSearchInput}
          />
        </label>
        {searchData.length !== 0 && query.length >= MIN_NUMBER_OF_CHARACTERS &&
        <ul className="form-search__select-list">
          {searchData.map((camera, index) => (
            <li
              key={camera.id}
              className={`form-search__select-item${
                index === selectedItem ? ' focused' : ''
              }`}
              tabIndex={0}
              onClick={() => navigate(`/cameras/${camera.id}`)}
              onKeyDown={(event) => handleKeyDown(event)}
              ref={(el) => {
                if (index === selectedItem && el) {
                  el.focus();
                }
              }}
            >
              {camera.name}
            </li>
          ))}
        </ul>}
      </form>
      <button className="form-search__reset" type="reset" onClick={handelReset}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>

  );
}
