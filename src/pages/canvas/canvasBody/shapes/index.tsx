import { fabric } from 'fabric';

export default function useAllShapes() {
  const addRectangle = new fabric.Rect({
    width: 100,
    height: 100,
    fill: 'transparent',
    stroke: '#043199',
    top: 100,
    left: 100,
    type: 'shape',
  });

  const addLine = new fabric.Line([10, 10, 50, 50], {
    stroke: 'black',
    strokeWidth: 2,
  });

  const addCircle = new fabric.Circle({
    radius: 50,
    fill: 'transparent',
    stroke: '#043199',
    top: 100,
    left: 100,
    type: 'shape',
  });

  const addTriangle = new fabric.Triangle({
    width: 100,
    height: 100,
    fill: 'transparent',
    stroke: '#043199',
    top: 100,
    left: 100,
    type: 'shape',
  });

  const starPoints = [];

  const centerX = 100; // X coordinate of the center of the star
  const centerY = 100; // Y coordinate of the center of the star
  const numPoints = 5; // Number of points on the star
  const outerRadius = 50; // Outer radius of the star
  const innerRadius = 20; // Inner radius of the star

  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI / numPoints) * i;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    starPoints.push({ x, y });
  }
  const addStar = new fabric.Polygon(starPoints, {
    fill: 'transparent',
    stroke: '#043199',
    left: 50,
    top: 50,
    type: 'shape',
  });

  const rightArrowPoints = [
    { x: 100, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 75 },
    { x: 200, y: 125 },
    { x: 150, y: 175 },
    { x: 150, y: 150 },
    { x: 100, y: 150 },
  ];

  const addRightArrow = new fabric.Polygon(rightArrowPoints, {
    fill: '#043199',
    left: 50,
    top: 50,
    type: 'shape',
  });

  const leftArrowPoints = [
    { x: 100, y: 150 },
    { x: 150, y: 150 },
    { x: 150, y: 175 },
    { x: 200, y: 125 },
    { x: 150, y: 75 },
    { x: 150, y: 100 },
    { x: 100, y: 100 },
  ];

  const addLeftArrow = new fabric.Polygon(leftArrowPoints, {
    fill: '#043199',
    left: 50,
    top: 50,
    type: 'shape',
  });

  const addHexagon = new fabric.Polygon(
    [
      { x: 50, y: 0 },
      { x: 150, y: 0 },
      { x: 200, y: 100 },
      { x: 150, y: 200 },
      { x: 50, y: 200 },
      { x: 0, y: 100 },
    ],
    {
      fill: 'transparent',
      stroke: '#043199',
      strokeWidth: 1,
      left: 100,
      top: 100,
      type: 'shape',
    }
  );

  const addPolygon = new fabric.Polygon(
    [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
    {
      stroke: '#043199',
      fill: 'transparent',
      left: 200,
      top: 100,
      type: 'shape',
    }
  );
  return {
    addRectangle,
    addCircle,
    addTriangle,
    addStar,
    addRightArrow,
    addLine,
    addLeftArrow,
    addHexagon,
    addPolygon,
  };
}
