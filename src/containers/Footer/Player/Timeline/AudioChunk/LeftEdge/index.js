import React, { useRef, useEffect, useState } from "react";
import { pixelToPercent } from "../../../../../../helpers";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";
import {
  setActiveChunkEndPoint,
  setActiveChunkStartPoint,
  setActiveChunkId,
  setWidthInPercent,
  setWidthInPixels,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import {
  getActiveChunkId,
  getWidthInPercent,
  getWidthInPixels,
} from "../../../../../../redux/selectors";

const LeftEdge = React.memo((props) => {
  const {
    left,
    audioChunk,
    chunkRef,
    timelineRef,
    activeChunkId,
    startPercent,
    setActiveChunkStartPoint,
    setActiveChunkId,
  } = props;
  const minWidth = 50;
  const leftEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);

  const resizeToLeft = (e) => {
    // TODO: to right check Xsize and dont make bigger, to left: make chunk bigger
    const Xsize = e.clientX - timelineRef.current.offsetLeft;
    chunkRef.current.style.left = Xsize + "px";
    chunkRef.current.style.width = chunkRef.current.style.width + Xsize + "px";
  };

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      if (chunkRef.current.clientWidth < minWidth) {
        chunkRef.current.clientWidth = minWidth;
      } else {
        resizeToLeft(e);
      }
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
    // const startPercent =
    //   pixelToPercent(window.innerWidth, endPercent - chunkRef.current.clientWidth);
    // setActiveChunkStartPoint(startPercent);
  };

  useEventListener("mousedown", resizeStart, leftEdge);
  useEventListener("mousemove", (e) => {
    if (isResizable) resizeMove(e);
  });
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge onMouseDown={resizeStart} ref={leftEdge}></Styled.Edge>;
});

const mapStateToProps = (state) => ({
  widthInPercent: getWidthInPercent(state),
  widthInPixels: getWidthInPixels(state),
  activeChunkId: getActiveChunkId(state),
});

export default connect(mapStateToProps, {
  setActiveChunkEndPoint,
  setActiveChunkStartPoint,
  setActiveChunkId,
  setWidthInPixels,
  setWidthInPercent,
})(LeftEdge);
