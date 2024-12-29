import { useState } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hook/hook-store';
//import CatalogModalCall from '../../components/catalog-modal-call/catalog-madal-call';
import { TCameras } from '../../types/types';
import SortCatalog from '../../components/sort-catalog/sort-catalog';
import { selectCurrentCameras} from '../../store/selectors/cameras-selectors';
import Spinner from '../../components/spinner-coponent/spinner';
import Pagination from '../../components/pagination/pagination';
import FilterContainer from '../../components/filters-catalog/filter-container';
import AddItemBasket from '../../components/catalog-modal/add-item-basket';
import AddItemSuccesBasket from '../../components/catalog-modal/add-item-success-basket';


export default function Catalog () :JSX.Element {
  const [isMounted, setMounted] = useState(false);
  const [isModalSuccess , setIsisModalSuccess] = useState(false);
  const [clickCamera, setClickCamera] = useState<TCameras['id'] | null>(null);

  const currentCameras = useAppSelector(selectCurrentCameras);
  const selectCamera = clickCamera ? currentCameras.find((currentCamera)=> currentCamera.id === clickCamera) ?? null : null;

  const handleModalOpen = (cameraId: TCameras['id']) => {
    setMounted(true);
    setClickCamera(cameraId);
    document.body.classList.add('scroll-lock');
  };

  const handleModalClose = () => {
    setMounted(false);
    document.body.classList.remove('scroll-lock');
  };


  const handleModalSuccessClose = () => {
    setIsisModalSuccess(false);
    document.body.classList.remove('scroll-lock');
  };


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <Banner/>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" hidden/>
                  <FilterContainer/>
                </div>
                <div className="catalog__content">
                  <SortCatalog/>
                  <div className="cards catalog__cards">
                    {currentCameras.length !== 0 ? currentCameras.map((camera) => (<Card key={camera.id} camera={camera} onClick={handleModalOpen}/>)) : <Spinner/>}
                  </div>
                  <Pagination/>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isMounted && selectCamera && <AddItemBasket onClose={handleModalClose} product={selectCamera}/>}
        {isModalSuccess && (<AddItemSuccesBasket onClose={handleModalSuccessClose}/>)}
      </main>
      <Footer/>
    </div>
  );
}
