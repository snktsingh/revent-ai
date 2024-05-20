
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';

interface PresentationCardContextMenuProps {
    anchorPoint: { x: number; y: number };
    isOpen: boolean;
    onClose: () => void;
    presentation: CanvasItem;
}

const PresentationCardContextMenu: React.FC<PresentationCardContextMenuProps> = ({ anchorPoint, isOpen, onClose, presentation }) => {


    const dispatch = useAppDispatch();
    const handleCopyPresentation = (): void => {
        console.log({ presentation });
        onClose()

    };

    const handleDeletePresentation = () => {
        onClose()
    };

    //   const handleOpenPresentationInNewTab = () => {
    //     openInNewTab()
    //     onClose()
    //   };

    //   const openInNewTab = (url) => {
    //     const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    //     if (newWindow) newWindow.opener = null;
    //   };
    return (
        <Menu
            open={isOpen}
            onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={isOpen ? { top: anchorPoint.y + 2, left: anchorPoint.x + 2 } : undefined}
            PaperProps={{ style: { maxHeight: 200, width: '20ch' } }}
        >
            <MenuItem component={Link} to={`/presentation/${presentation.presentationId}-${faker.string.uuid()}`} target="_blank" rel="noopener noreferrer">
                <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Open in new tab" />
            </MenuItem>

            <MenuItem onClick={handleCopyPresentation}>
                <ListItemIcon>
                    <ContentCopyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Copy" />
            </MenuItem>
            <MenuItem onClick={handleDeletePresentation}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </MenuItem>
        </Menu>
    );
};

export default PresentationCardContextMenu;
