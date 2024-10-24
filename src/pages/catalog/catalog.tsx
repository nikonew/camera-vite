import { useState } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hook/hook-store';
import { camerasSelectors } from '../../store/slice/cameras-slice';
import CatalogModalCall from '../../components/catalog-modal-call/catalog-madal-call';
import { TCameras } from '../../types/types';


export default function Catalog () :JSX.Element {
  const [isMounted, setMounted] = useState(false);
  const [clickCamera, setClickCamera] = useState<TCameras['id'] | null>(null);

  const cameras = useAppSelector(camerasSelectors.cameras);
  const selectCamera = clickCamera ? cameras.find((currentCamera)=> currentCamera.id === clickCamera) ?? null : null;


  const handleModalOpen = (cameraId: TCameras['id']) => {
    setMounted(true);
    setClickCamera(cameraId);
  };

  const handleModalClose = () => {
    setMounted(false);
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
                  <img src="img/banner.png" />
                </div>
                <div className="catalog__content">
                  <div className="cards catalog__cards">
                    {cameras.map((camera) => (<Card key={camera.id} camera={camera} onClick={handleModalOpen }/>))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isMounted && <CatalogModalCall onClose={handleModalClose} camera={selectCamera} />}
      </main>
      <Footer/>
    </div>
  );
}
