import { calcPercent } from "../../../../../../helpers";
import {
  getChunkStartEndPercents,
  getWidth,
  isReachedToBarrier,
  setWidth,
} from "../helper";

export const resize = (
  e,
  neighbourPoint,
  chunk,
  timeline,
  duration,
  isRight
) => {
  const minPixelWidth = 30;
  const mousePos = calcPercent(
    e.clientX - timeline.offsetLeft,
    getWidth(timeline)
  );
  const movedPixels = chunk.offsetLeft + e.movementX;
  let newWidth = getWidth(chunk);
  const startEndPercents = getChunkStartEndPercents(
    movedPixels,
    chunk,
    timeline
  );
  if (newWidth >= minPixelWidth) {
    const barrier = calcPercent(neighbourPoint, duration);
    if (!isReachedToBarrier(startEndPercents, barrier, mousePos, isRight)) {
      isRight ? (newWidth += e.movementX) : (newWidth -= e.movementX);
      const widthInPercent = calcPercent(newWidth, getWidth(timeline));
      setWidth(chunk, widthInPercent);
      if (!isRight && newWidth > minPixelWidth) {
        const leftInPercent = calcPercent(movedPixels, getWidth(timeline));
        chunk.style.left = `${leftInPercent}%`;
      }
    }
  }
};