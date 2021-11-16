import {
  caluclateSecondByPercent,
  pixelToPercent,
  secondToPercent,
} from "../../../../../helpers";

export const getChunkEdgeSeconds = (chunk, timeline, audioDuration) => {
  const chunkWidth = pixelToPercent(chunk.clientWidth, timeline.clientWidth);
  const startPercent = pixelToPercent(chunk.offsetLeft, timeline.clientWidth);
  const startSecond = caluclateSecondByPercent(startPercent, audioDuration);
  const endPercent = chunkWidth + startPercent;
  const endSecond = caluclateSecondByPercent(endPercent, audioDuration);

  return { startSecond, endSecond };
};

export const getChunkStartEndPercents = (movedSize, chunk, timeline) => {
  const start = pixelToPercent(movedSize, getWidth(timeline));
  const chunkWidthPercent = pixelToPercent(getWidth(chunk), getWidth(timeline));
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


// 16.11.21 - TODO: move again only when mouse position comes back to the center
export const isMovedToBarrier = (
  startPercent,
  endPercent,
  leftBarrierSecond,
  rightBarrierSecond,
  duration
) => {
  const leftPercent = secondToPercent(leftBarrierSecond, duration);
  const rightPercent = secondToPercent(rightBarrierSecond, duration);
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
