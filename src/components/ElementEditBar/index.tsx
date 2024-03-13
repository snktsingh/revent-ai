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
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="#000000" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></g></svg>
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