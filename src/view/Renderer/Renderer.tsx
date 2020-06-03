import './Renderer.scss';

import React, { useEffect, useRef, useState } from 'react';

import { sim } from '../../model/runner';

const Renderer = () => {
  const self = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [cellSize, setCellSize] = useState(0);

  useEffect(() => {
    if (!self.current) return;

    setWidth(self.current.offsetWidth);
    setHeight(self.current.offsetHeight);
  }, []);

  useEffect(() => {
    const cellWidth = width / sim.map.width;
    const cellHeight = height / sim.map.height;

    const size = Math.min(cellWidth, cellHeight);
    setCellSize(size);
  }, [width, height]);

  const renderInterval = useRef<number>();
  useEffect(() => {
    clearInterval(renderInterval.current);
    if (!canvasRef.current) return;

    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;

    // render func
    renderInterval.current = setInterval(() => {
      ctx.clearRect(0, 0, width, height);

      sim.map.cells.forEach((cell) => {
        const x = cell.x * cellSize;
        const y = cell.y * cellSize;

        const h = Math.floor(cell.foodColor * 360);
        const l = Math.floor((cell.foodAmount / sim.maxCellFood) * 100) / 2;
        // console.log(cell.foodAmount);
        ctx.fillStyle = `hsl(${h}, 60%, ${l}%)`;
        ctx.fillRect(x, y, cellSize, cellSize);

        // console.log({ x, y, cellSize });
      });

      sim.creatures.forEach((creature) => {
        const size = (creature.hp / sim.maxCreatureHp) * ((cellSize * 6) / 8);

        const x = creature.x * cellSize + cellSize / 2 - size / 2;
        const y = creature.y * cellSize + cellSize / 2 - size / 2;

        const h = Math.floor(creature.color * 360);
        const l = 60;
        ctx.fillStyle = `hsl(${h}, 60%, ${l}%)`;
        ctx.fillRect(x, y, size, size);
      });
    }, 30);
  }, [cellSize, width, height]);

  return (
    <div styleName="renderer" ref={self}>
      <canvas
        width={cellSize * sim.map.width}
        height={cellSize * sim.map.height}
        ref={canvasRef}
      />
    </div>
  );
};

export default Renderer;
