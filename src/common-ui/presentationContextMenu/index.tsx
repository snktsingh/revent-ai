import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { faker } from '@faker-js/faker';
import { CanvasItem } from '@/interface/storeTypes';
import { ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { StyledContextMenu } from './style';
import useDashboard from '@/pages/dashboard/container';
import { togglePptAlertOpen } from '@/redux/reducers/elements';

interface PresentationCardContextMenuProps {
    anchorPoint: { x: number; y: number };
    isOpen: boolean;
    onClose: () => void;
    presentation: CanvasItem;
    contextMenuRef: any;
}

const PresentationCardContextMenu: React.FC<PresentationCardContextMenuProps> = ({ anchorPoint, isOpen, onClose, presentation, contextMenuRef }) => {
    const dispatch = useAppDispatch();
    const { userPreferences } = useAppSelector( state => state.manageUser);
    const { removePresentation } = useDashboard();

    const handleCopyPresentation = (): void => {
        onClose();
    };
    
    const handleDeletePresentation = () => {
        if(!userPreferences.isPresentationDeleteAlert){
            dispatch(togglePptAlertOpen(true))
        } else {
            removePresentation(presentation.presentationId );
        }
        onClose();
    };

    return (
        isOpen && (
            <StyledContextMenu
                style={{ top: `${anchorPoint.y + 2}px`, left: `${anchorPoint.x + 2}px` }}
                ref={contextMenuRef}
            >
                <MenuItem component={Link} to={presentation && presentation.presentationId ? `/presentation/${presentation.presentationId}-${faker.string.uuid()}` : '/my-presentation'} target="_blank" rel="noopener noreferrer">
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Open in new tab" />
                </MenuItem>

                {/* <MenuItem onClick={handleCopyPresentation}>
                    <ListItemIcon>
                        <ContentCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Copy" />
                </MenuItem> */}
                <MenuItem onClick={handleDeletePresentation}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </StyledContextMenu>
        )
    );
};

export default PresentationCardContextMenu;
