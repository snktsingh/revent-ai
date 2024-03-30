import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useState } from 'react';
import { useCanvasComponent } from '../canvasComponent/container';
import { toggleSelectingSlide } from '@/redux/reducers/slide';
import { setActiveCanvas, setCanvas, updateCanvasList } from '@/redux/reducers/canvas';
import { fabric } from 'fabric';
import { CanvasItem } from '@/interface/storeTypes';
import { openModal } from '@/redux/reducers/elements';

const useSlideList = () => {
  const dispatch = useAppDispatch();
  const slide = useAppSelector(state => state.slide);
  const { canvasList, canvasJS, activeCanvasID } = useAppSelector(
    state => state.canvas
  );
  const { updateCanvasDimensions } = useCanvasComponent();

  const handleSlideCardClick = (canvas: CanvasItem) => {
    dispatch(toggleSelectingSlide(true));
    dispatch(setCanvas(canvas));
    dispatch(setActiveCanvas(canvas.id));
  };

  const [svgURLs, setsvgURLs] = useState<string[]>([]);

  const getImg = async (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null);

    return new Promise<string>((resolve, reject) => {
      try {
        canvas.loadFromJSON(canvasJson, () => {
          // canvas.width = 970;
          // canvas.height = 500;
          updateCanvasDimensions(canvas);
          const svgURL = canvas.toSVG();
          resolve(svgURL);
        });
      } catch (error) {
        console.log(error);
        reject('Error occurred while loading canvas');
      }
    });
  };

  const loadSvgs = async () => {
    const urls: string[] = [];
    for (const canvas of canvasList) {
      try {
        const svgURL = await getImg(canvas.canvas);
        urls.push(svgURL);
      } catch (error) {
        console.error(error);
        urls.push('error'); // Push placeholder for error cases
      }
    }
    setsvgURLs(urls);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      slide.isSlideSelected && handleDeleteSlide();
    }
  };

  const handleDeleteSlide = () => {
    dispatch(openModal());
  };

  const handleDragStart = (event : React.DragEvent<HTMLDivElement>, index : number) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (event : React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event : React.DragEvent<HTMLDivElement>, newIndex : number) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const oldIndexStr = event.dataTransfer.getData('index');
    const oldIndex = parseInt(oldIndexStr, 10); 
    const updatedCanvasList = [...canvasList];
    const [removed] = updatedCanvasList.splice(oldIndex, 1);
    updatedCanvasList.splice(newIndex, 0, removed);
    dispatch(updateCanvasList(updatedCanvasList));
  };

  return {
    handleKeyDown,
    getImg,
    svgURLs,
    canvasJS,
    canvasList,
    activeCanvasID,
    slide,
    handleSlideCardClick,
    loadSvgs,
    handleDragOver,
    handleDragStart,
    handleDrop
  };
};

export default useSlideList;
