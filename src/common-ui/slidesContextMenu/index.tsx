
import React from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CanvasItem } from '@/interface/storeTypes';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { openModal } from '@/redux/reducers/elements';
import { deleteSlide } from '@/redux/reducers/slide';
import { copyCanvasCopy } from '@/redux/reducers/canvas';

interface SlidesContextMenuProps {
  anchorPoint: { x: number; y: number };
  isOpen: boolean;
  onClose: () => void;
  slide: CanvasItem;
}

const SlidesContextMenu: React.FC<SlidesContextMenuProps> = ({ anchorPoint, isOpen, onClose, slide }) => {

  const { enabledElements, isDeleteAlertShow } = useAppSelector(
    state => state.element
  );
  const { canvasList } = useAppSelector( state => state.canvas)
 const dispatch = useAppDispatch();
  const handleCopy = () : void => {
    dispatch(copyCanvasCopy(slide.id));
    onClose();
  };

  const handleDeleteSlide = () => {
    if (isDeleteAlertShow) {
      dispatch(openModal());
    } else {
      if (canvasList && canvasList.length === 1) {
        dispatch(openModal());
        return;
      }
      dispatch(deleteSlide(slide.id));
    }
    onClose();
  };

  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={isOpen ? { top: anchorPoint.y, left: anchorPoint.x } : undefined}
      PaperProps={{ style: { maxHeight: 200, width: '20ch' } }}
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
    </Menu>
  );
};

export default SlidesContextMenu;
