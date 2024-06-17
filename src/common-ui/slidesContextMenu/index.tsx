
import React from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CanvasItem } from '@/interface/storeTypes';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { openModal } from '@/redux/reducers/elements';
import { copyCanvasCopy, deleteSlide, setActiveSlideId, setCanvas, updateCanvasList } from '@/redux/reducers/canvas';
import { StyledContextMenu } from './style';
import { addNewSlideApi, deleteSlideApi } from '@/redux/thunk/slidesThunk';

interface SlidesContextMenuProps {
  anchorPoint: { x: number; y: number };
  isOpen: boolean;
  onClose: () => void;
  slide: CanvasItem;
  contextMenuRef: any;
}

const SlidesContextMenu: React.FC<SlidesContextMenuProps> = ({ anchorPoint, isOpen, onClose, slide, contextMenuRef }) => {

  const { enabledElements, isDeleteAlertShow } = useAppSelector(
    state => state.element
  );
  const { canvasList } = useAppSelector(state => state.canvas)
  const { userPreferences } = useAppSelector(state => state.manageUser)
  const dispatch = useAppDispatch();
  const handleCopy = (): void => {
    dispatch(copyCanvasCopy(slide.id));
    onClose();
  };

  const handleDeleteSlide = () => {
    if (!userPreferences.isSlideDeleteAlert) {
      dispatch(openModal());
    } else {

      const newSlide: CanvasItem = {
        id: 1,
        canvas: {
          "version": "5.3.0",
          "objects": [],
          "background": "#fff"
        },
        notes: '',
        variants: [],
        originalSlideData: {},
        listImages: [],
        slideId: 1,
        presentationId: 1,
        lastVariant: '',
        selectedOriginalCanvas: false,
      }
      if (canvasList && canvasList.length == 1) {
        dispatch(deleteSlideApi({pId : slide.presentationId,slideID : slide.slideId})).then((res: any) => {
          if (res.payload.status >= 200 && res.payload.status < 300) {
            dispatch(addNewSlideApi({pId : slide.presentationId, slideNo : 1})).then((response: any) => {
              if (response.payload.status >= 200 && response.payload.status < 300) {
                const slideNew : CanvasItem = {...newSlide, presentationId : slide.presentationId, slideId : response.payload.data.slideId}
                dispatch(setCanvas(slideNew));
                dispatch(setActiveSlideId(1));
                dispatch(updateCanvasList([slideNew]))
              }
              return;
            });
            const slideNew : CanvasItem = {...newSlide, presentationId : slide.presentationId}
            dispatch(setCanvas(slideNew));
            dispatch(setActiveSlideId(1));
            dispatch(updateCanvasList([slideNew]))

          }
        })
      }

      if (canvasList && canvasList.length > 1) {
        dispatch(deleteSlideApi({pId : slide.presentationId,slideID : slide.slideId})).then((res: any) => {
          if (res.payload.status >= 200 && res.payload.status < 300) {
            dispatch(deleteSlide(slide.id));
          }
        })
      }
    }
    onClose();
  };

  return (
    isOpen && (<StyledContextMenu
      style={{ top: `${anchorPoint.y + 2}px`, left: `${anchorPoint.x + 2}px` }}
      ref={contextMenuRef}
    >
      <MenuItem onClick={handleCopy}>
        <ListItemIcon>
          <ContentCopyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Copy" />
      </MenuItem>
      {/* <MenuItem onClick={handleCopy}>
        <ListItemIcon>
          <ContentCutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Cut" />
      </MenuItem> */}
      <MenuItem onClick={handleDeleteSlide}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </StyledContextMenu>)
  );
};

export default SlidesContextMenu;
