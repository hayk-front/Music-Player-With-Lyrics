import React, { useRef, useEffect, useContext } from "react";
import { percentToPixel, pixelToPercent } from "../../../../../../helpers";
import { AudioChunkContext } from "../../../../../../context/AudioChunkContext";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";

const Edge = React.memo((props) => {
  const { side } = props;
  const {
    setPercentSize,
    isResizable,
    setIsResizable,
    activeEdge,
    setActiveEdge,
    sizeInPixels,
    setPixelSize,
    activeChunkRef,
  } = useContext(AudioChunkContext);

  const edge = useRef(null);
  const minWidth = 50;

  useEffect(() => {
    const currentRef = edge.current;
    if (currentRef) setActiveEdge(currentRef);
  }, [edge, setActiveEdge]);

  useEffect(() => {
    if(activeChunkRef)
    setPixelSize(percentToPixel(activeChunkRef));
  }, [activeChunkRef, setPixelSize]);

  const resizeStart = () => {
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      e.stopPropagation();
      const pixels = sizeInPixels + e.movementX;
      if (pixels < minWidth) {
        setPixelSize(minWidth);
      } else {
        setPixelSize(pixels);
      }
      setPercentSize(pixelToPercent(window.innerWidth, sizeInPixels));
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
  };

  useEventListener("mousedown", resizeStart, activeEdge);
  useEventListener("mousemove", resizeMove);
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge side={side} onMouseDown={resizeStart}></Styled.Edge>;
});

export default Edge;
