import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createPresentation } from '@/redux/thunk/thunk';
import { getUserDetails } from '@/redux/thunk/user';
import React, { useEffect } from 'react';
import { useFullScreenHandle } from 'react-full-screen';

const useCanvas = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isCreating, presentationId } = useAppSelector(state => state.thunk);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handle = useFullScreenHandle();

  return {
    handle,
    anchorEl,
    open,
    handleClick,
    handleClose,
    isCreating,
  };
};
export default useCanvas;
