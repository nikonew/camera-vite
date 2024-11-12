import { Link } from 'react-router-dom';
import { AppRoute } from '../../app/router/router';

type breadcrumbsProps = {
  name: string;
}

export default function Breadcrumbs ({name}: breadcrumbsProps):JSX.Element {
  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
            Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
            Каталог
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </span>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
              {name}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
