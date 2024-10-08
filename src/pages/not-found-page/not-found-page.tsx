import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

export default function NotFoundPage (): JSX.Element {
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--index">
        <div className="container">
          <h1>404 Page not found</h1>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </main>
    </div>
  );
}
