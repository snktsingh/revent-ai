import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { useDebounce } from '@/hooks/useDebounce';
import { CanvasItem } from '@/interface/storeTypes';
import { IUpdatePptName } from '@/interfaces/pptInterfaces';
import {
  setPresentationTitle,
  updateCanvasList,
} from '@/redux/reducers/canvas';
import { setSelectedTheme } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { togglePresetOpened } from '@/redux/thunk/dashboard';
import {
  setPresentationName,
  updatePptName,
  updateStateLoading,
} from '@/redux/thunk/thunk';
import { FetchUtils } from '@/utils/fetch-utils';
import { debounce } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useCanvasHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openProfileMenu, setOpenProfileMenu] =
    React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [openWarning, setOpenWarning] = React.useState(false);
  const { pptUrl, presentationId, presentationName } = useAppSelector(state => state.thunk);
  const { presentationTitle } = useAppSelector(state => state.canvas);
  const { userDetails } = useAppSelector(state => state.manageUser);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const openShare = Boolean(anchorE2);


  const userLogout = async () => {
    toast.promise(
      async () => {
        const res = await FetchUtils.postRequest(`${ENDPOINT.AUTH.LOGOUT}`, {});
        if (res.status === 200) {
          localStorage.clear();
          setTimeout(() => {
            window.location.replace(`${ROUTES.LOGIN}`);
          }, 2000);
        } else {
          throw new Error('Failed to log in');
        }
      },
      {
        pending: 'Logging out please wait...',
        success: 'Logout Successfully...',
      }
    );
  };

  function getFirstLettersForAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  const handleWarningOpen = () => {
    setOpenWarning(true);
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };
  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleShareClose = () => {
    setAnchorE2(null);
  };

  const handleInputChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    if (presentationName === '' || presentationName === undefined) {
      dispatch(setPresentationName('Untitled-presentation'));
      updatePresentationName({
        presentationId: presentationId,
        name: 'Untitled-presentation',
      });
    } else {
      updatePresentationName({
        presentationId: presentationId,
        name: e.target.value,
      });
    }
  }, 500);

  const updatePresentationName = async (data: IUpdatePptName) => {
    setIsUpdating(true);
    const res = await dispatch(updatePptName(data));
    setUpdateResponse(res.payload);
    setIsUpdating(false);
  };

  const handleGoBack = () => {
    dispatch(updateStateLoading(false));
    navigate(ROUTES.DASHBOARD, { replace: true });
    let canvas: CanvasItem[] = [
      {
        id: 1,
        canvas: {
          version: '5.3.0',
          objects: [],
          background: '#fff',
        },
        notes: '',
        variants: [],
        originalSlideData: {},
        listImages: [],
        slideId: 1,
        presentationId: 1,
        lastVariant : '',
        selectedOriginalCanvas: false,
        slideShape: '',
      },
    ];
    dispatch(updateCanvasList(canvas));
    dispatch(setSelectedTheme(0));
    dispatch(togglePresetOpened(false));
  };

  return {
    userLogout,
    getFirstLettersForAvatar,
    navigate,
    openProfileMenu,
    setOpenProfileMenu,
    anchorE2,
    setAnchorE2,
    openWarning,
    setOpenWarning,
    pptUrl,
    presentationTitle,
    userDetails,
    handleWarningClose,
    handleWarningOpen,
    handleClick,
    handleCloseProfileMenu,
    handleShareClick,
    handleShareClose,
    handleInputChange,
    openShare,
    updatePresentationName,
    presentationId,
    updateResponse,
    handleGoBack,
    isUpdating,
    setIsUpdating,
  };
};
export default useCanvasHeader;
