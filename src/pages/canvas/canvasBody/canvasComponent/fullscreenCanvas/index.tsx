import { theme } from '@/constants/theme';
import { setActiveSlideId, setCanvas } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { ContentElements } from '../../elementData';
import { useCanvasComponent } from '../container';

const FullscreenCanvas = () => {
    const [fullscreenCanvas, setFullscreenCanvas] = useState<fabric.Canvas | null>(null);
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState<number>(0);
    const {canvasList} = useAppSelector(state=> state.canvas);
    const dispatch = useAppDispatch();

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!document.fullscreenElement) return;

        console.log({ currentCanvasIndex, length: canvasList })
        if ((event.keyCode === 37 || event.keyCode === 38) && currentCanvasIndex > 0) {
            dispatch(setCanvas(canvasList[currentCanvasIndex]));
            dispatch(setActiveSlideId(canvasList[currentCanvasIndex].id));
            setCurrentCanvasIndex(currentCanvasIndex - 1);
        } else if ((event.keyCode === 39 || event.keyCode === 40) && currentCanvasIndex < canvasList.length - 1) {
            dispatch(setCanvas(canvasList[currentCanvasIndex]));
            dispatch(setActiveSlideId(canvasList[currentCanvasIndex].id));
            setCurrentCanvasIndex(currentCanvasIndex + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentCanvasIndex, canvasList]);

    useEffect(() => {
        const canvasElement = new fabric.Canvas('fullscreen-canvas');
        setFullscreenCanvas(canvasElement);
        return () => {
            canvasElement.dispose();
        };
    }, []);

    useEffect(() => {
        if (fullscreenCanvas && canvasList && canvasList.length > 0) {
            fullscreenCanvas.clear();
            fullscreenCanvas.loadFromJSON(canvasList[currentCanvasIndex].canvas, () => {
                fullscreenCanvas.forEachObject(obj => {
                     if(obj.name && obj.name == "VariantImage"){
                      const canvasWidth = fullscreenCanvas?.width || 0;
                      const canvasHeight = fullscreenCanvas?.height || 0;
                      const scaleWidth = canvasWidth / obj.width!;
                      const scaleHeight = canvasHeight / obj.height!;
                      const scale = Math.max(scaleWidth, scaleHeight);
              
                      obj.set({
                        left: 0,
                        top: 0,
                        scaleX: scale,
                        scaleY: scale,
                        selectable: false,
                        lockMovementX: true,
                        lockScalingY: true,
                        moveCursor: 'pointer',
                        name: 'VariantImage',
                      });
                    }
                  });
                fullscreenCanvas.enableRetinaScaling = true;
                fullscreenCanvas.setBackgroundColor(
                    `${theme.colorSchemes.light.palette.common.white}`,
                    fullscreenCanvas.renderAll.bind(fullscreenCanvas)
                );
                const aspectRatio = 16 / 9;
                const canvasWidthPercentage = 58;
                const canvasHeightPercentage = 58 / aspectRatio;

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerWidth;

                const canvasWidth = (canvasWidthPercentage / 100) * windowWidth;
                const canvasHeight = (canvasHeightPercentage / 100) * windowHeight;
                fullscreenCanvas.setDimensions({
                    width: canvasWidth,
                    height: canvasHeight
                })
                fullscreenCanvas.renderAll();
            });
        }
    }, [fullscreenCanvas, canvasList, currentCanvasIndex]);

    //FULLSCREEN
    ContentElements.openFullScreen = () => {
        console.log('full screen')
        setCurrentCanvasIndex(0);

        const canvasElement = document.getElementById('fullscreen-canvas');
        if (canvasElement) {
            if (!document.fullscreenElement) {
                if (canvasElement.requestFullscreen) {
                    canvasElement.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    };

    return (<canvas id="fullscreen-canvas" ></canvas>)
}

export default FullscreenCanvas;
