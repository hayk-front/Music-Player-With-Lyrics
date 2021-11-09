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

const RightEdge = React.memo((props) => {
  const {
    audioChunk,
    chunkRef,
    activeChunkId,
    startPercent,
    setActiveChunkEndPoint,
    setActiveChunkId,
  } = props;
  const minWidth = 50;
  const rightEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);


  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };
  const resizeMove = (e) => {
    if (isResizable) {
      if (chunkRef.current.clientWidth < minWidth) {
        chunkRef.current.clientWidth = minWidth;
      } else {
        chunkRef.current.style.width =
          chunkRef.current.clientWidth + e.movementX + "px";
      }
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
    // const endPercent =
    //   pixelToPercent(window.innerWidth, chunkRef.current.clientWidth) +
    //   startPercent;
    // setActiveChunkEndPoint(endPercent);
  };

  useEventListener("mousedown", resizeStart, rightEdge);
  useEventListener("mousemove", (e) => {
    if (isResizable) resizeMove(e);
  });
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge onMouseDown={resizeStart} ref={rightEdge}></Styled.Edge>;
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
})(RightEdge);
