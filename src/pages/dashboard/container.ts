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
  deletePresentationInPPtList,
  fetchPPTList,
  fetchPresetsById,
  setDeletedStatus,
  setListPageNumber,
  togglePresetOpened,
} from '@/redux/thunk/dashboard';
import { setUserPreferences } from '@/redux/thunk/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useDashboard = () => {
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState(false);
  const [pptId, setPptId] = useState(0);
  const { pptList, listPageNumber } = useAppSelector(
    state => state.manageDashboard
  );
  const { isDeletePptAlertOpen } = useAppSelector(state => state.element);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const { userPreferences } = useAppSelector(state => state.manageUser);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
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
    const res = await dispatch(deletePresentation(presentationId)).then(
      (res: any) => {
        if (res.payload.status >= 200) {
          dispatch(deletePresentationInPPtList(presentationId));
          toast.success('Presentation deleted successfully');
          dispatch(setDeletedStatus(true));
        }
      }
    );
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

  const fetchPresentationList = async (pageNumber: number) => {
    const res = await dispatch(fetchPPTList(1));
    if (listPageNumber === 1) {
      setFileList(res.payload);
    } else {
      setFileList(prevHistory => [...prevHistory, ...res.payload]);
    }
  };

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
        useAI: false,
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
    fetchPresentationList,
    fileList,
    isDeleted,
  };
};
export default useDashboard;
