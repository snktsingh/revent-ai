import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { IUpdatePptName } from '@/interfaces/pptInterfaces';
import { setPresentationTitle } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updatePptName } from '@/redux/thunk/thunk';
import { FetchUtils } from '@/utils/fetch-utils';
import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useCanvasHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openProfileMenu, setOpenProfileMenu] =
    React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [openWarning, setOpenWarning] = React.useState(false);
  const { pptUrl, presentationId } = useAppSelector(state => state.thunk);
  const { presentationTitle } = useAppSelector(state => state.canvas);
  const { userDetails } = useAppSelector(state => state.manageUser);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPresentationTitle(e.target.value));
  };

  const updatePresentationName = async (data: IUpdatePptName) => {
    const res = await dispatch(updatePptName(data));
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
  };
};
export default useCanvasHeader;
