import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Rate from '../../components/rate-product-card/rate/rate';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import { fetchProduct } from '../../store/thunk/thunk';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import { productSelectors } from '../../store/slice/product-slice';
import Spinner from '../../components/spinner-coponent/spinner';
import ArrowToTop from '../../components/arrow-to-top/arrow-to-top';
import ReviewsContainer from '../../components/reviews-container/reviews-container';
import ProductTubs from '../../components/product-tubs/product-tubs';
import ProductSimilarContainer from '../../components/product-similar/product-similar-container';


export default function ProductPage () :JSX.Element {
  const dispatch = useAppDispatch();
  const productPage = useAppSelector(productSelectors.camera);

  const {id} = useParams();
  const productId = id?.trim() ?? '';

  useEffect (() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (productId === '') {
    return <NotFoundPage/>;
  }

  if (!productPage) {
    return <Spinner/>;
  }

  const {name,
    rating,
    level,
    previewImgWebp, previewImgWebp2x, previewImg,
    previewImg2x, reviewCount, price, vendorCode,
    category, type, description} = productPage;


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs name={name}/>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`/${previewImg}`}
                      srcSet={`/${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <Rate rating={rating}/>
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                Добавить в корзину
                  </button>
                  <ProductTubs vendorCode= {vendorCode} category={category} type={type} level={level} description={description}/>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <ProductSimilarContainer/>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
                </div>
                <ReviewsContainer/>
              </div>
            </section>
          </div>
        </div>
      </main>
      <ArrowToTop/>
      <Footer/>
    </div>
  );
}
