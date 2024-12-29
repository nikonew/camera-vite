import BasketProductsContainer from '../../components/basket-components/basket-products-container/basket-products-container';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hook/hook-store';

export default function Basket ():JSX.Element {

  const stateBasketProducts = useAppSelector((state) => state.basket.basketProducts);


  return (
    <div className="wrapper">
      <Header/>
      <section className="basket">
        <div className="container">
          <h1 className="title title--h2">Корзина</h1>
          <ul className="basket__list">
            {stateBasketProducts &&
                  (<BasketProductsContainer products={stateBasketProducts} />)}
          </ul>
          <div className="basket__summary">
            <div className="basket__promo">
              <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
              <div className="basket-form">
                <form action="#">
                  <div className="custom-input">
                    <label><span className="custom-input__label">Промокод</span>
                      <input type="text" name="promo" placeholder="Введите промокод"></input>
                    </label>
                    <p className="custom-input__error">Промокод неверный</p>
                    <p className="custom-input__success">Промокод принят!</p>
                  </div>
                  <button className="btn" type="submit">Применить
                  </button>
                </form>
              </div>
            </div>
            <div className="basket__summary-order">
              <p className="basket__summary-item">
                <span className="basket__summary-text">Всего:</span>
                <span className="basket__summary-value">111 390 ₽</span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text">Скидка:</span>
                <span className="basket__summary-value basket__summary-value--bonus">
            0 ₽
                </span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text basket__summary-text--total">
            К оплате:
                </span>
                <span className="basket__summary-value basket__summary-value--total">
            111 390 ₽
                </span>
              </p>
              <button className="btn btn--purple" type="submit">
          Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
