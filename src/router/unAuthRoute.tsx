import { Route, Routes } from 'react-router-dom';
import { defaultRoutes } from '.';

export default function DefaultRoutes() {
  return (
    <Routes>
      <>
        {defaultRoutes.map(route => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </>
    </Routes>
  );
}
