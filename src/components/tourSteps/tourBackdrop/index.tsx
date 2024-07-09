import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';
import { useAppSelector } from '@/redux/store';

interface HighlightedElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

const Highlight = styled('div')({
    position: 'absolute',
    zIndex: 1300,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid #fff',
    borderRadius: '4px',
    pointerEvents: 'none',
});

const TourBackDrop: React.FC = () => {
    const { tourVisible } = useAppSelector(state => state.slide);
    const [highlightedElements, setHighlightedElements] = useState<HighlightedElement[]>([]);

    useEffect(() => {
        const selectors = ['.share-menu', '.change-theme-btn', '.edit-btn'];
        const elements = Array.from(document.querySelectorAll(selectors.join(','))) as HighlightedElement[];
        elements.forEach(el => {
            el.style.zIndex = '1205';
        });
        setHighlightedElements(elements);

        if(!tourVisible) {
            elements.forEach(el => {
                el.style.zIndex = '600';
            });
        }

        return () => {
            if(!tourVisible) {
                elements.forEach(el => {
                    el.style.zIndex = '600';
                });
            }
        };
    }, []);

    return (
        <>
            <Backdrop open={tourVisible} sx={{ zIndex: 1200 }} />
            {tourVisible && highlightedElements.map((el, index) => {
                const { top, left, width, height } = el.getBoundingClientRect();
                
                return (
                    <Highlight
                        key={index}
                        style={{
                            top: `${top - 6}px`,
                            left: `${left - 6}px`,
                            width: `${width + 13}px`,
                            height: `${height + 12}px`,
                            background: "white",
                            padding: '1rem',
                            zIndex: 1201,
                            borderRadius: '4px',
                            border: 'none',
                        }}
                    />
                );
            })}
        </>
    );
};

export default TourBackDrop;
