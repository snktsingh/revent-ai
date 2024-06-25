import { isPresentationDeleteAlert } from '@/constants/userPreferences';
import { CanvasItem } from '@/interface/storeTypes';
import {
  setCanvas,
  setVariantImageAsMain,
  updateCanvasList,
} from '@/redux/reducers/canvas';
import { togglePptAlertOpen } from '@/redux/reducers/elements';
import { setSelectedTheme } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  deletePresentation,
  fetchPPTList,
  fetchPresetsById,
  togglePresetOpened,
} from '@/redux/thunk/dashboard';
import { setUserPreferences } from '@/redux/thunk/user';
import React, { useEffect, useState } from 'react';

const useDashboard = () => {
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState(false);
  const [pptId, setPptId] = useState(0);
  const { pptList } = useAppSelector(state => state.manageDashboard);
  const { isDeletePptAlertOpen } = useAppSelector(state => state.element);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const { userPreferences } = useAppSelector(state => state.manageUser);
  const handleOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };
  const handleDeletePpt = (pptId: number) => {
    if (userPreferences.isPresentationDeleteAlert) {
      dispatch(togglePptAlertOpen(true));
    }
  };
  const handleClose = () => {
    dispatch(togglePptAlertOpen(false));
  };

  const removePresentation = async (presentationId: number) => {
    const res = await dispatch(deletePresentation(presentationId));
    dispatch(fetchPPTList(0));
  };

  const fetchPreset = async (presetId: number) => {
    const res = await dispatch(fetchPresetsById(presetId));
    const presetList = res.payload;
     dispatch(updateCanvasList(presetList));
    dispatch(setCanvas(presetList[0]));

  };

  function getFirstLettersForAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  useEffect(() => {
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
        lastVariant: '',
        selectedOriginalCanvas: false,
        slideShape: '',
      },
    ];
    dispatch(setCanvas(canvas[0]));
    dispatch(setVariantImageAsMain(''));
    dispatch(updateCanvasList(canvas));
    dispatch(setSelectedTheme(0));
    dispatch(togglePresetOpened(false));
  }, []);

  const handlePptDelCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUserPreferences({
        key: isPresentationDeleteAlert,
        value: e.target.checked,
      })
    );
  };

  return {
    isDeletePptAlertOpen,
    handleDeletePpt,
    handleClose,
    removePresentation,
    setPptId,
    pptId,
    getFirstLettersForAvatar,
    handleOpenProfile,
    handleCloseProfileMenu,
    openProfileMenu,
    setOpenProfileMenu,
    handlePptDelCheckBox,
    fetchPreset,
  };
};
export default useDashboard;
