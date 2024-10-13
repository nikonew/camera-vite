import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import SimilarItem from './product-similar-item';
import { useEffect } from 'react';
import { fetchAllSimilar } from '../../store/thunk/thunk';
import Spinner from '../spinner-coponent/spinner';
import { similarProductSelectors } from '../../store/slice/similar-slice';


export default function ProductSimilarContainer ():JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const similarId = id?.trim() ?? '';
  const similar = useAppSelector(similarProductSelectors.similarProduct);


  useEffect (() => {
    dispatch(fetchAllSimilar(similarId));
  }, [dispatch, similarId]);


  if (!similarId) {
    return <Spinner/>;
  }


  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similar.map((item) => (
              <SimilarItem key={item.id} item={item}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
