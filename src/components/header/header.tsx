import { Link } from 'react-router-dom';
import SeachForm from '../seach-form/seach-form';
import { AppRoute } from '../../app/router/router';
import { useAppSelector } from '../../hook/hook-store';

export default function Header ():JSX.Element {

  const stateBasketProducts = useAppSelector((state) => state.basket.basketProducts);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to='/'
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>
              Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to=''>
              Гарантии
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to=''>
              Доставка
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to=''>
              О компании
              </Link>
            </li>
          </ul>
        </nav>
        <SeachForm/>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"/>
          </svg>
          {stateBasketProducts.length === 0 ? '' :
            <span className="header__basket-count">{stateBasketProducts.length}</span>}
        </Link>
      </div>
    </header>
  );
}
