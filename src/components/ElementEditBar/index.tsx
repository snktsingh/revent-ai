import React, { useEffect, useState } from 'react';
import { CheckboxContainer, EditBarContainer, IconButton, SvgContainer } from './style';
import Tooltip from '@mui/material/Tooltip';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styled from 'styled-components';
import { useEditBar } from './container';
import { useTableElement } from '@/pages/canvas/canvasBody/elements/tableElement';
import { IMAGE, LIST_MAIN, QUOTE_IMG, QUOTE_IMG_CONTAINER, TABLE_HEADER } from '@/constants/elementNames';
import { useAppSelector } from '@/redux/store';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRemoveLevels } from '@/pages/canvas/canvasBody/events/removeLevels';

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
        aiCheckbox,
        imgChangeICon,
        addListImage,
        handleQuoteImage,
        levelIcons,
        handleChangeImageElement,
        addClientListImage,
        minusIcon
    } = useEditBar();
    const { handleRemovingLastLevel } = useRemoveLevels();
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

    const handleChangeImage = () => {
        const object = canvas?.getActiveObject();
        if (canvas && object?.name?.startsWith(LIST_MAIN)) {
            addListImage(canvas);
        } else if (canvas && object?.name?.startsWith(QUOTE_IMG)){
            handleQuoteImage(canvas)
        } else if (canvas && object?.name?.startsWith(IMAGE)){
            handleChangeImageElement(canvas)
        }
    }

    useEffect(() => {
        adjustControlsVisibility(canvas!);
        const activeElement = canvas?.getActiveObject();
        

        if (left < 0 && top < 0) {
            left = 150;
            top = -40;
            setPosition({ l: left, t: top });
        } else if (activeElement && 
            (activeElement.name?.startsWith(LIST_MAIN) ||
            activeElement.name?.startsWith(QUOTE_IMG) ||
            activeElement.name?.startsWith(IMAGE)
        )
        ) {
            setPosition({ l: left - 22, t: top });
        }
         else {
            setPosition({ l: left, t: top });
        }


    }, [canvas?.getActiveObject(), left, top]);

    useEffect(() => { }, [plusIcon]);


    return (
        <EditBarContainer left={position.l} top={position.t}>
            {(!tableIcons && !levelIcons) && <Tooltip title="Add Level" placement="top">
                <span>
                    <IconButton onClick={handleAdd} disabled={!plusIcon} style={{ color: plusIcon ? '' : '#e0e0e0' }}>
                        <AddOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>}
            {imgChangeICon && <Tooltip title="Change Image" placement="top">
                <span>
                    <IconButton onClick={handleChangeImage} >
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9376L12.5958 14.2835C11.7909 13.4852 11.3884 13.0861 10.9266 12.9402C10.5204 12.8119 10.0838 12.8166 9.68048 12.9537C9.22188 13.1096 8.82814 13.5173 8.04068 14.3327L4.04409 18.2802M14.2639 15.9376L14.6053 15.5991C15.4112 14.7999 15.8141 14.4003 16.2765 14.2544C16.6831 14.1262 17.12 14.1312 17.5236 14.2688C17.9824 14.4252 18.3761 14.834 19.1634 15.6515L20 16.4936M14.2639 15.9376L18.275 19.9566M18.275 19.9566C17.9176 20.0001 17.4543 20.0001 16.8 20.0001H7.2C6.07989 20.0001 5.51984 20.0001 5.09202 19.7821C4.71569 19.5904 4.40973 19.2844 4.21799 18.9081C4.12796 18.7314 4.07512 18.5322 4.04409 18.2802M18.275 19.9566C18.5293 19.9257 18.7301 19.8728 18.908 19.7821C19.2843 19.5904 19.5903 19.2844 19.782 18.9081C20 18.4803 20 17.9202 20 16.8001V16.4936M12.5 4L7.2 4.00011C6.07989 4.00011 5.51984 4.00011 5.09202 4.21809C4.71569 4.40984 4.40973 4.7158 4.21799 5.09213C4 5.51995 4 6.08 4 7.20011V16.8001C4 17.4576 4 17.9222 4.04409 18.2802M20 11.5V16.4936M14 10.0002L16.0249 9.59516C16.2015 9.55984 16.2898 9.54219 16.3721 9.5099C16.4452 9.48124 16.5146 9.44407 16.579 9.39917C16.6515 9.34859 16.7152 9.28492 16.8425 9.1576L21 5.00015C21.5522 4.44787 21.5522 3.55244 21 3.00015C20.4477 2.44787 19.5522 2.44787 19 3.00015L14.8425 7.1576C14.7152 7.28492 14.6515 7.34859 14.6009 7.42112C14.556 7.4855 14.5189 7.55494 14.4902 7.62801C14.4579 7.71033 14.4403 7.79862 14.4049 7.97518L14 10.0002Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add/Remove Header" placement="top">
                <span>
                    <IconButton onClick={handleTableHeader} >
                        <SvgContainer>
                            <svg fill="#000000" viewBox="-4 -2 14 14" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3z"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add Row" placement="top">
                <span>
                    <IconButton onClick={handleAddTableRow} >
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="3" y="3" width="18" height="18" rx="0"></rect><line x1="21" y1="9" x2="3" y2="9"></line><line x1="21" y1="15" x2="3" y2="15"></line></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Remove Row" placement="top">
                <span>
                    <IconButton onClick={handleRemoveTableRow}>
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 3v3m18-3v3m0 0v4a2 2 0 0 1-2 2H9m12-6H9M3 6v4a2 2 0 0 0 2 2h4M3 6h6m0-3v3m0 0v6m6-9v9m-6 3 3 3m0 0 3 3m-3-3 3-3m-3 3-3 3"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            { !levelIcons && <IconButton onClick={handleCopy}>
                <SvgContainer>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#080341"></path> </g></svg>
                </SvgContainer>
            </IconButton>}
             <IconButton onClick={handleDelete}>
                <SvgContainer>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </SvgContainer>
            </IconButton>
            {tableIcons && <Tooltip title="Remove Column" placement="top">
                <span>
                    <IconButton onClick={handleRemoveTableCol}>
                        <SvgContainer>
                            <svg viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 3h3M3 21h3m0 0h4a2 2 0 0 0 2-2V9M6 21V9m0-6h4a2 2 0 0 1 2 2v4M6 3v6M3 9h3m0 0h6m-9 6h9m3-6 3 3m0 0 3 3m-3-3 3-3m-3 3-3 3"></path></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {tableIcons && <Tooltip title="Add Column" placement="top">
                <span>
                    <IconButton onClick={handleAddTableCol} >
                        <SvgContainer>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="3" y="3" width="18" height="18" rx="0"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></g></svg>
                        </SvgContainer>
                    </IconButton>
                </span>
            </Tooltip>}
            {aiCheckbox && <Tooltip title="Enhancement with AI" placement="top">
                <CheckboxContainer>
                    <input type="checkbox" checked={enhancementWithAI} onChange={handleAICheckbox} />
                    <AiSlashIcon/>
                    <AiIcon/>
                </CheckboxContainer>
            </Tooltip>}
            {(!tableIcons && !levelIcons) && <Tooltip title="Undo Last Level" placement="top">
                <span>
                    <IconButton onClick={() => handleRemovingLastLevel(canvas!)} disabled={!minusIcon} style={{ color: minusIcon ? '' : '#e0e0e0' }}>
                        <RemoveIcon />
                    </IconButton>
                </span>
            </Tooltip>}
        </EditBarContainer>
    );
};

export default ElementEditBar;

const AiSlashIcon = () => {
    return <svg className="ai-slash" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="28" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="28" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="054b98a799"><path d="M 49 54 L 326 54 L 326 321 L 49 321 Z M 49 54 " clipRule="nonzero" /></clipPath><clipPath id="7c7efa9da9"><path d="M 68.605469 54.867188 L 325.636719 300.457031 L 306.464844 320.519531 L 49.433594 74.929688 Z M 68.605469 54.867188 " clipRule="nonzero" /></clipPath><clipPath id="855be717d7"><path d="M 68.605469 54.867188 L 325.636719 300.457031 L 306.464844 320.519531 L 49.433594 74.929688 Z M 68.605469 54.867188 " clipRule="nonzero" /></clipPath></defs><path fill="#000000" d="M 281.25 93.75 L 281.25 281.25 L 93.75 281.25 L 93.75 93.75 Z M 172.667969 140.625 L 154.40625 140.625 L 119.738281 234.375 L 136.214844 234.375 L 142.757812 216.046875 L 184.257812 216.046875 L 190.664062 234.375 L 208.128906 234.375 Z M 237.375 140.625 L 220.964844 140.625 L 220.964844 234.375 L 237.375 234.375 Z M 163.398438 156.355469 L 179.742188 203.125 L 147.316406 203.125 Z M 296.875 234.375 L 328.125 234.375 L 328.125 265.625 L 296.875 265.625 Z M 109.375 296.875 L 140.625 296.875 L 140.625 328.125 L 109.375 328.125 Z M 171.875 296.875 L 203.125 296.875 L 203.125 328.125 L 171.875 328.125 Z M 109.375 46.875 L 140.625 46.875 L 140.625 78.125 L 109.375 78.125 Z M 234.375 296.875 L 265.625 296.875 L 265.625 328.125 L 234.375 328.125 Z M 171.875 46.875 L 203.125 46.875 L 203.125 78.125 L 171.875 78.125 Z M 234.375 46.875 L 265.625 46.875 L 265.625 78.125 L 234.375 78.125 Z M 296.875 171.875 L 328.125 171.875 L 328.125 203.125 L 296.875 203.125 Z M 46.875 234.375 L 78.125 234.375 L 78.125 265.625 L 46.875 265.625 Z M 296.875 109.375 L 328.125 109.375 L 328.125 140.625 L 296.875 140.625 Z M 46.875 171.875 L 78.125 171.875 L 78.125 203.125 L 46.875 203.125 Z M 46.875 109.375 L 78.125 109.375 L 78.125 140.625 L 46.875 140.625 Z M 46.875 109.375 " fill-opacity="1" fillRule="evenodd" /><g clip-path="url(#054b98a799)"><g clip-path="url(#7c7efa9da9)"><g clip-path="url(#855be717d7)"><path fill="#000000" d="M 68.539062 54.9375 L 325.332031 300.300781 L 306.457031 320.054688 L 49.664062 74.6875 Z M 68.539062 54.9375 " fill-opacity="1" fillRule="nonzero" /></g></g></g></svg>
};

const AiIcon = () => {
    return <svg className="ai" width="28" height="28" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>ai</title>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="icon" fill="#000000" transform="translate(64.000000, 64.000000)">
                <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z" id="Combined-Shape">

                </path>
            </g>
        </g>
    </svg>
};