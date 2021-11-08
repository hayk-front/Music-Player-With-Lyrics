import React, { useRef, useEffect, useState } from "react";
import { percentToPixel, pixelToPercent } from "../../../../../../helpers";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";
import {
  setActiveChunkEndPoint,
  setActiveChunkId,
  setChunksActiveEdge,
  setIsResizable,
  setWidthInPercent,
  setWidthInPixels,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import {
  getChunksActiveEdge,
  getIsResizable,
  getWidthInPercent,
  getWidthInPixels,
} from "../../../../../../redux/selectors";

const Edge = React.memo((props) => {
  const {
    audioChunk,
    side,
    startPercent,
    isResizable,
    widthInPercent,
    widthInPixels,
    activeChunkRef,
    chunksActiveEdge,
    setActiveChunkEndPoint,
    setActiveChunkId,
    setWidthInPixels,
    setWidthInPercent,
    setIsResizable,
    setChunksActiveEdge
  } = props;
  const [timer, setTimer] = useState(null)
  const edge = useRef(null);
  const minWidth = 50;

  useEffect(() => {
    const currentRef = edge.current;
    if (currentRef) setChunksActiveEdge(currentRef);
  }, [edge, setChunksActiveEdge]);

  useEffect(() => {
    if (activeChunkRef) setWidthInPixels(percentToPixel(activeChunkRef));
  }, [activeChunkRef, setWidthInPixels]);

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      clearTimeout(timer);
      e.stopPropagation();
      const pixels = widthInPixels + e.movementX;
      if (pixels < minWidth) {
        setWidthInPixels(minWidth);
      } else {
        setWidthInPixels(pixels);
      }
      setWidthInPercent(pixelToPercent(window.innerWidth, widthInPixels));
      const endPercent = widthInPercent + startPercent;
      console.log("START: ", startPercent, "END: ", endPercent);
      setTimer(setTimeout(() => setActiveChunkEndPoint(endPercent), 500));
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
  };

  useEventListener("mousedown", resizeStart, chunksActiveEdge);
  useEventListener("mousemove", resizeMove);
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge side={side} onMouseDown={resizeStart}></Styled.Edge>;
});

const mapStateToProps = (state) => ({
  isResizable: getIsResizable(state),
  widthInPercent: getWidthInPercent(state),
  widthInPixels: getWidthInPixels(state),
  chunksActiveEdge: getChunksActiveEdge(state),
});

export default connect(mapStateToProps, {
  setActiveChunkEndPoint,
  setActiveChunkId,
  setChunksActiveEdge,
  setWidthInPixels,
  setWidthInPercent,
  setIsResizable,
})(Edge);
