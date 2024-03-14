import React, { useEffect, useState } from 'react';
import { EditBarContainer, IconButton, SvgContainer } from './style';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styled from 'styled-components';
import { useEditBar } from './container';


interface ElementEditBarProps {
    left: number;
    top: number;
    canvas: fabric.Canvas | null;
}


const ElementEditBar: React.FC<ElementEditBarProps> = ({ left, top, canvas }) => {

    const { 
        adjustControlsVisibility, 
        handleCopyClick, 
        deleteObject, 
        plusIcon, 
        checkElementForAddLevel 
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

    useEffect(() => {
        adjustControlsVisibility(canvas!);
    }, [canvas?.getActiveObject()]);

    
    return (
        <EditBarContainer left={left} top={top}>
            <IconButton onClick={handleAdd} disabled={!plusIcon} style={{color : plusIcon? '' : '#e0e0e0'}}>
                <AddOutlinedIcon />
            </IconButton>
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
        </EditBarContainer>
    );
};

export default ElementEditBar;