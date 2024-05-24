import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/homepage';
import { authRoutes } from '.';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { getUserCredit, getUserDetails, getUserPreferences } from '@/redux/thunk/user';

export default function AppRoutes() {

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getUserDetails()).then(() => {
       dispatch(getUserPreferences())
    });
    dispatch(getUserCredit())
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
