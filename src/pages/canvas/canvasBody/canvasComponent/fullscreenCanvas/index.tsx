import { theme } from '@/constants/theme';
import { setActiveSlideId, setCanvas } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { ContentElements } from '../../elementData';
import { useCanvasComponent } from '../container';
import SvgViewer from '@/components/canvasSvgViewer';

const FullscreenCanvas = () => {
    const [fullscreenCanvas, setFullscreenCanvas] = useState<fabric.Canvas | null>(null);
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState<number>(0);
    const { canvasList } = useAppSelector(state => state.canvas);
    const dispatch = useAppDispatch();
    const [allSVGs, setAllSVGs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!document.fullscreenElement) return;

        console.log({ currentCanvasIndex, length: canvasList })
        if ((event.keyCode === 37 || event.keyCode === 38)) {
            dispatch(setCanvas(canvasList[currentCanvasIndex]));
            dispatch(setActiveSlideId(canvasList[currentCanvasIndex].id));
            if (currentCanvasIndex === 0) {
                setCurrentCanvasIndex(canvasList.length - 1);
                return;
            }
            setCurrentCanvasIndex(currentCanvasIndex - 1);
        } else if (event.keyCode === 39 || event.keyCode === 40) {
            dispatch(setCanvas(canvasList[currentCanvasIndex]));
            dispatch(setActiveSlideId(canvasList[currentCanvasIndex].id));
            if (currentCanvasIndex === canvasList.length - 1) {
                setCurrentCanvasIndex(0);
                return;
            }
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
        const canvasElement = new fabric.Canvas(null);
        setFullscreenCanvas(canvasElement);
        return () => {
            canvasElement.dispose();
        };
    }, []);

    const generateSVGsFromCanvasList = async (canvasList: any[], fullscreenCanvas: fabric.Canvas) => {

        return new Promise<string[]>(async (resolve, reject) => {
            if (fullscreenCanvas && canvasList && canvasList.length > 0) {
                const allSlideSVGs: string[] = [];
                for (let index = 0; index < canvasList.length; index++) {
                    const canvas = canvasList[index];
                    console.log(canvas.canvas);
                    fullscreenCanvas.clear();
                    await fullscreenCanvas.loadFromJSON(canvas.canvas, () => {
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
                        });
                        fullscreenCanvas.forEachObject(obj => {
                            if (obj.name && obj.name == "VariantImage") {
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
                                obj.setCoords();
                            }
                            // fullscreenCanvas.renderAll();
                        });
                        fullscreenCanvas.renderAll();
                        const svgContent = fullscreenCanvas.toSVG();
                        allSlideSVGs[index] = svgContent;
                    });
                }
                setAllSVGs(allSlideSVGs);
                resolve(allSlideSVGs);
            } else {

                reject('Invalid input');
            }
        });
    };

    //FULLSCREEN
    ContentElements.openFullScreen = () => {
        console.log('full screen');
        setCurrentCanvasIndex(0);

        const canvasElement = document.getElementById('fullscreen-canvas');
        if (canvasElement) {
            if (!document.fullscreenElement) {
                if (canvasElement.requestFullscreen) {
                    canvasElement.requestFullscreen();
                    if (fullscreenCanvas) {
                        setIsLoading(true);
                        generateSVGsFromCanvasList(canvasList, fullscreenCanvas)
                            .then(svgs => {
                                setIsLoading(false);
                                console.log(svgs);
                            })
                            .catch(error => {
                                setIsLoading(false);
                                console.error('Error generating SVGs:', error);
                            });
                    }
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    };

    return (<div id="fullscreen-canvas" style={{ width: '100%', height: '100%' }}>
        {isLoading ? <h1 style={{ 
            display: 'flex', 
            justifyContent: "center", 
            alignItems: "center", 
            color: 'white',
            width : '100%',
            height : '100%'
            }}>Loading...</h1> : allSVGs.length > 0 && <SvgViewer svgContent={allSVGs[currentCanvasIndex]} />}
    </div>)
}

export default FullscreenCanvas;
