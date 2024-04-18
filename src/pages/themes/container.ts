import { setSelectedTheme, setThemeId } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  createPresentation,
  getAllThemes,
  updatePptName,
} from '@/redux/thunk/thunk';
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
      navigate(`/canvas/${data.presentationId}-Untitled-Presentation`);
    } else {
      toast.error('Failed to create presentation !');
    }
  };

  const handleGenerate = (themeId : number) => {
    if (themeId === null) {
      toast.warning('Please select at least one theme !');
    } else {
      dispatch(setSelectedTheme(themeId));
      dispatch(setThemeId(themeId));
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
