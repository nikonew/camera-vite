import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from '../pages/catalog/catalog';
import { AppRoute } from './router/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../hook/hook-store';
import { fetchAllCameras } from '../store/thunk/thunk';


export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect (() => {
    dispatch(fetchAllCameras());
  });


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={
            <Catalog/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
