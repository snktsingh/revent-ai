import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createPresentation, getAllThemes } from '@/redux/thunk/thunk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useStartTheme = () => {
  const thunk = useAppSelector(state => state.thunk);
  const { selectedThemeId } = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreatePPT = async () => {
    const res = await dispatch(createPresentation());
    const data = res.payload;
    if (data.message === 'SUCCESS') {
      navigate('/canvas');
      toast.success('Presentation Initialized !');
    } else {
      toast.error('Failed to create presentation !');
    }
  };

  const handleGenerate = () => {
    if (selectedThemeId === '' || selectedThemeId === null) {
      toast.warning('Please select at least one theme !');
    } else {
      handleCreatePPT();
    }
  };

  useEffect(() => {
    dispatch(getAllThemes());
  }, []);

  return {
    thunk,
    selectedThemeId,
    navigate,
    dispatch,
    handleGenerate,
  };
};
export default useStartTheme;
