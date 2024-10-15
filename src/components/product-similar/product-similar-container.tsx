import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/hook-store';
import SimilarItem from './product-similar-item';
import { useEffect } from 'react';
import { fetchAllSimilar } from '../../store/thunk/thunk';
import Spinner from '../spinner-coponent/spinner';
import { similarProductSelectors } from '../../store/slice/similar-slice';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './product-similar.css';
import { Navigation } from 'swiper/modules';

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
            <button className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              style={{pointerEvents: 'auto'}}
              disabled
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
            >
              {similar.map((item) => (
                <SwiperSlide key={item.id}>
                  <SimilarItem key={item.id} item={item}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            style={{pointerEvents: 'auto'}}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}
