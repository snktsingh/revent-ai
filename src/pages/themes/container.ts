import {
  setSelectedDocFile,
  setSelectedTheme,
  setThemeId,
} from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  createPresentation,
  getAllThemes,
  updatePptName,
} from '@/redux/thunk/thunk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faker } from '@faker-js/faker';
import { Token, isAuth } from '@/utils/localStorage/data';
import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';

const useStartTheme = () => {
  const thunk = useAppSelector(state => state.thunk);
  const { selectedThemeId, selectedDocFile, themeId } = useAppSelector(
    state => state.slideTheme
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreatePPT = async () => {
    const res = await dispatch(createPresentation());
    const data = res.payload;
    if (data.message === 'SUCCESS') {
      navigate(`/presentation/${data.presentationId}-${faker.string.uuid()}`);
    } else {
      toast.error('Failed to create presentation !');
    }
  };

  const handleGenerate = async (themeId: number) => {
    if (selectedDocFile) {
      if (isAuth && Token) {
        try {
          const docData = new FormData();
          if (themeId && selectedDocFile) {
            docData.append('file', selectedDocFile);
            docData.append('themeId', themeId);
          }
          const res = await FetchUtils.postRequest(
            `${ENDPOINT.PPT.CREATE_DOC_PPT}`,
            docData
          );
          toast.success(
            'Your Presentation is under creation, Please visit the dashboard to see the status.'
          );
          dispatch(setSelectedDocFile(null));
          setTimeout(() => {
            navigate('/my-presentations');
          }, 1000);
        } catch (error: any) {
          toast.error(error.message);
        }
      } else {
        toast.warning('Please login to Generate');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } else {
      if (themeId === null) {
        toast.warning('Please select at least one theme !');
      } else {
        dispatch(setSelectedTheme(themeId));
        dispatch(setThemeId(themeId));
        handleCreatePPT();
      }
    }
  };

  // useEffect(() => {
  //   dispatch(getAllThemes());
  // }, []);

  return {
    thunk,
    selectedThemeId,
    navigate,
    dispatch,
    handleGenerate,
  };
};
export default useStartTheme;
