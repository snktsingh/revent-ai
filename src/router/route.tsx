import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/homepage';
import { authRoutes } from '.';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { getUserCredit, getUserDetails, getUserPreferences } from '@/redux/thunk/user';
import { getAllThemes } from '@/redux/thunk/thunk';

export default function AppRoutes() {

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getUserDetails()).then(() => {
       dispatch(getUserPreferences())
    });
    dispatch(getUserCredit());
    dispatch(getAllThemes());
  }, [])


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
