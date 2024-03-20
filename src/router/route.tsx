import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/homepage';
import { authRoutes } from '.';

export default function AppRoutes() {
  return (
    <Routes>
      <>
        {authRoutes.map(route => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </>
    </Routes>
  );
}
