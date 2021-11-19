import { calcSecondByPercent, calcPercent } from "../../../../../helpers";

export const getChunkEdgeSeconds = (chunk, timeline, audioDuration) => {
  const chunkWidth = calcPercent(getWidth(chunk), getWidth(timeline));
  const startPercent = calcPercent(chunk.offsetLeft, getWidth(timeline));
  const startSecond = calcSecondByPercent(startPercent, audioDuration);
  const endPercent = chunkWidth + startPercent;
  const endSecond = calcSecondByPercent(endPercent, audioDuration);

  return { startSecond, endSecond };
};

export const getChunkStartEndPercents = (movedSize, chunk, timeline) => {
  const start = calcPercent(movedSize, getWidth(timeline));
  const chunkWidthPercent = calcPercent(getWidth(chunk), getWidth(timeline));
  const end = start + chunkWidthPercent;
  return { start, end };
};

export const isReachedToRightBarrier = (
  endPercent,
  barrierPercent,
  mousePos
) => {
  if (endPercent < barrierPercent && mousePos <= endPercent) {
    return false;
  }
  return true;
};

export const isReachedLeftBarrier = (
  startPercent,
  barrierPercent,
  mousePos
) => {
  if (startPercent > barrierPercent && mousePos >= startPercent) {
    return false;
  }
  return true;
};

export const isMovedToBarrier = (
  startPercent,
  endPercent,
  leftBarrierSecond,
  rightBarrierSecond,
  duration
) => {
  const leftPercent = calcPercent(leftBarrierSecond, duration);
  const rightPercent = calcPercent(rightBarrierSecond, duration);
  if (endPercent < rightPercent && startPercent > leftPercent) {
    return false;
  }
  return true;
};

export const getWidth = (elem) => {
  return elem.getBoundingClientRect().width;
};

export const setWidth = (elem, width) => {
  elem.style.width = `${width}%`;
};
