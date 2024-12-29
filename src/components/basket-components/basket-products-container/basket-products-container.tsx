import { TypeBasketProduct } from '../../../store/slice/basket-slice';
import BasketListItem from '../basket-list-item/basket-list-item';

type Props = {
  products: TypeBasketProduct[];
};

export default function BasketProductsContainer ({ products }: Props): JSX.Element {
  return (
    <>
      {products.map((product) => (
        <BasketListItem key={product.id} product={product} />
      ))}
    </>
  );
}
