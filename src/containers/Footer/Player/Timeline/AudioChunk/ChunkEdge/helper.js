import { pixelToPercent, secondToPercent } from "../../../../../../helpers";
import { getChunkStartEndPercents, getWidth, isReachedLeftBarrier, isReachedToRightBarrier, setWidth } from "../helper";

export const resizeToLeft = (
  e,
  neighbourEnd,
  minWidth,
  chunk,
  timeline,
  duration
) => {
  if (getWidth(chunk) < minWidth) {
    chunk.style.width = minWidth;
  } else {
    const movedSize = chunk.offsetLeft + e.movementX;
    let newWidth = getWidth(chunk);
    const startEndPercents = getChunkStartEndPercents(
      movedSize,
      chunk,
      timeline
    );
    const barrierEnd = secondToPercent(neighbourEnd, duration);
    const mousePos = pixelToPercent(
      e.clientX - timeline.offsetLeft,
      getWidth(timeline)
    );
    if (!isReachedLeftBarrier(startEndPercents.start, barrierEnd, mousePos)) {
      newWidth -= e.movementX;
      if (newWidth > minWidth) {
        const leftInPercent = pixelToPercent(movedSize, getWidth(timeline));
        chunk.style.left = `${leftInPercent}%`;
      }
      const widthInPercent = pixelToPercent(newWidth, getWidth(timeline));
      setWidth(chunk, widthInPercent);
    }
  }
};

export const resizeToRight = (
  e,
  neighbourStart,
  minWidth,
  chunk,
  timeline,
  duration
) => {
  const mousePos = pixelToPercent(
    e.clientX - timeline.offsetLeft,
    getWidth(timeline)
  );
  const startEndPercents = getChunkStartEndPercents(
    chunk.offsetLeft + e.movementX,
    chunk,
    timeline
  );
  if (getWidth(chunk) >= minWidth) {
    const barrierStart = secondToPercent(neighbourStart, duration);
    if (
      !isReachedToRightBarrier(startEndPercents.end, barrierStart, mousePos)
    ) {
      const widthInPercent = pixelToPercent(
        getWidth(chunk) + e.movementX,
        getWidth(timeline)
      );
      setWidth(chunk, widthInPercent);
    }
  }
};
