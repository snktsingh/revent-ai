import { CanvasItem } from '@/interface/storeTypes';
import { setCanvas, setVariantImageAsMain, updateCanvasList } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deletePresentation, fetchPPTList } from '@/redux/thunk/dashboard';
import { useEffect, useState } from 'react';

const useDashboard = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [pptId, setPptId] = useState(0);
  const { pptList } = useAppSelector(state => state.manageDashboard);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const handleOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const removePresentation = async (presentationId: number) => {
    const res = await dispatch(deletePresentation(presentationId));
    dispatch(fetchPPTList());
  };

  const [filteredPpt, setFilteredPpt] = useState([pptList]);

  const filterPresentation = (search: string) => {
    const res = pptList.filter((item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPpt(res);
  };

  function getFirstLettersForAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  useEffect(()=> {
    let canvas : CanvasItem[] = [
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
      }
    ];
    dispatch(setCanvas(canvas[0]));
    dispatch(setVariantImageAsMain(''))
    dispatch(updateCanvasList(canvas));
  },[]);

  return {
    open,
    handleClickOpen,
    handleClose,
    removePresentation,
    setPptId,
    pptId,
    filteredPpt,
    filterPresentation,
    setFilteredPpt,
    getFirstLettersForAvatar,
    handleOpenProfile,
    handleCloseProfileMenu,
    openProfileMenu,
    setOpenProfileMenu
  };
};
export default useDashboard;
