import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/hook-store';
import { camerasSelectors } from '../../store/slice/cameras-slice';
import { Link} from 'react-router-dom';
import { MIN_NUMBER_OF_CHARACTERS_SEACH } from '../../const';
import { TCameras } from '../../types/types';
import cn from 'classnames';
import { AppRoute } from '../../app/router/router';


export default function SeachForm ():JSX.Element {
  const cameras = useAppSelector(camerasSelectors.cameras);

  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState<TCameras[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const searchElement = cameras.filter((camera) =>
      camera.name.toLowerCase().includes(query.toLocaleLowerCase()));
    setSearchData(searchElement);
  };


  useEffect(() => {
    const focusableElements = inputRef.current?.querySelectorAll<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"])'
    );


    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (!focusableElements || focusableElements.length === 0) {
        return;
      }


      if (event.key === 'Tab' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, []);


  const handelReset = () => {
    setQuery('');
    setSearchData([]);
  };

  return (
    <div className={cn('form-search',{ 'list-opened': query.length })} ref={inputRef} >
      <form >
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
        {searchData.length !== 0 && query.length >= MIN_NUMBER_OF_CHARACTERS_SEACH &&
        <ul className="form-search__select-list">
          {searchData.map((camera) => (
            <Link to={`${AppRoute.Product}/${camera.id}`} key={camera.id}>
              <li
                className="form-search__select-item"
                tabIndex={-1}
              >
                {camera.name}
              </li>
            </Link>
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
