import React from 'react';
import { useFullScreenHandle } from 'react-full-screen';

const useCanvas = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handle = useFullScreenHandle();

  return { handle, anchorEl, open, handleClick, handleClose };
};
export default useCanvas;
