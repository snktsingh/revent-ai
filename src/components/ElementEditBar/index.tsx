import React, { useEffect, useState } from 'react';
import { CheckboxContainer, EditBarContainer, IconButton, SvgContainer } from './style';
import Tooltip from '@mui/material/Tooltip';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styled from 'styled-components';
import { useEditBar } from './container';
import { useTableElement } from '@/pages/canvas/canvasBody/elements/tableElement';
import { TABLE_HEADER } from '@/constants/elementNames';
import { useAppSelector } from '@/redux/store';


interface ElementEditBarProps {
    left: number;
    top: number;
    canvas: fabric.Canvas | null;
}


const ElementEditBar: React.FC<ElementEditBarProps> = ({ left, top, canvas }) => {

    const [position, setPosition] = useState({ l: left, t: top });
    const { enhancementWithAI } = useAppSelector(state => state.apiData);
    const { addTableColumn, addTableRow, removeTableColumn, removeTableRow, removeTableHeader, addTableHeader } = useTableElement();
    const {
        adjustControlsVisibility,
        handleCopyClick,
        deleteObject,
        plusIcon,
        checkElementForAddLevel,
        tableIcons,
        handleAICheckbox,
        aiCheckbox
    } = useEditBar();

    const handleDelete = () => {
        deleteObject(canvas);
    };
    const handleCopy = () => {
        const selectedObjects = canvas?.getActiveObjects();
        if (selectedObjects && selectedObjects.length > 0) {
            handleCopyClick(selectedObjects, canvas);
        }
    };
    const handleAdd = () => {
        checkElementForAddLevel(canvas!);
    };

    const handleAddTableCol = () => {
        addTableColumn(canvas);
    };
    const handleRemoveTableCol = () => {
        removeTableColumn(canvas);
    };
    const handleAddTableRow = () => {
        addTableRow(canvas);
    };
    const handleRemoveTableRow = () => {
        removeTableRow(canvas);
    };
    const handleTableHeader = () => {
        if (canvas) {
            let isHeaderAvailable = false;
            canvas.forEachObject((obj) => {
                if (obj.name?.startsWith(`${TABLE_HEADER}_`)) {
                    isHeaderAvailable = true;
                }
            });

            if (isHeaderAvailable) {
                removeTableHeader(canvas);
            } else {
                addTableHeader(canvas);
            }
        }
    };

    useEffect(() => {
        adjustControlsVisibility(canvas!);
        if (left < 0 && top < 0) {
            left = 100;
            top = -40;
            setPosition({ l: left, t: top });
        } else {
            setPosition({ l: left, t: top });
        }
    }, [canvas?.getActiveObject(), left, top]);


    return (
        <EditBarContainer left={position.l} top={position.t}>
            {!tableIcons && <Tooltip title="Add Level" placement="top">
                <span>
                    <IconButton onClick={handleAdd} disabled={!plusIcon} style={{ color: plusIcon ? '' : '#e0e0e0' }}>
                        <AddOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add/Remove Header" placement="top">
                <span>
                    <IconButton onClick={handleTableHeader} >
                        <SvgContainer>
                            <svg fill="#000000" viewBox="-4 -2 14 14" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3z"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add Row" placement="top">
                <span>
                    <IconButton onClick={handleAddTableRow} >
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="3" y="3" width="18" height="18" rx="0"></rect><line x1="21" y1="9" x2="3" y2="9"></line><line x1="21" y1="15" x2="3" y2="15"></line></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Remove Row" placement="top">
                <span>
                    <IconButton onClick={handleRemoveTableRow}>
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M3 3v3m18-3v3m0 0v4a2 2 0 0 1-2 2H9m12-6H9M3 6v4a2 2 0 0 0 2 2h4M3 6h6m0-3v3m0 0v6m6-9v9m-6 3 3 3m0 0 3 3m-3-3 3-3m-3 3-3 3"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            <IconButton onClick={handleCopy}>
                <SvgContainer>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#080341"></path> </g></svg>
                </SvgContainer>
            </IconButton>
            <IconButton onClick={handleDelete}>
                <SvgContainer>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </SvgContainer>
            </IconButton>
            {tableIcons && <Tooltip title="Remove Column" placement="top">
                <span>
                    <IconButton onClick={handleRemoveTableCol}>
                        <SvgContainer>
                            <svg viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M3 3h3M3 21h3m0 0h4a2 2 0 0 0 2-2V9M6 21V9m0-6h4a2 2 0 0 1 2 2v4M6 3v6M3 9h3m0 0h6m-9 6h9m3-6 3 3m0 0 3 3m-3-3 3-3m-3 3-3 3"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add Column" placement="top">
                <span>
                    <IconButton onClick={handleAddTableCol} >
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="3" y="3" width="18" height="18" rx="0"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            { aiCheckbox && <Tooltip title="Enhancement with AI" placement="top">
            <CheckboxContainer>
                <input type="checkbox"  checked={enhancementWithAI} onChange={handleAICheckbox} />
                <div className="checkmark"></div>
            </CheckboxContainer>
            </Tooltip>}
        </EditBarContainer>
    );
};

export default ElementEditBar;