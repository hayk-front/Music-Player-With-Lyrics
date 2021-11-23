import React, { useContext } from "react";
import { connect } from "react-redux";
import { TimelineContext } from "../../../../../context/TimelineContext";
import { getAudioDuration } from "../../../../../redux/selectors";
import * as Styled from "./styled";

const Zoom = React.memo((props) => {
  const { duration } = props;
  const { zoom, setZoom } = useContext(TimelineContext);
  const minZoom = 1;

  const zoomIn = () => {
    const maxZoom = Math.floor(duration / 40);
    if (zoom < maxZoom) setZoom(zoom + 1);
  };
  const zoomOut = () => {
    if (zoom > minZoom) setZoom(zoom - 1);
  };

  return (
    <Styled.Zoom>
      <Styled.Icon zoomType="Out" onClick={zoomOut}></Styled.Icon>

      <Styled.Span>{zoom}x</Styled.Span>

      <Styled.Icon zoomType="In" onClick={zoomIn}></Styled.Icon>
    </Styled.Zoom>
  );
});

const mapStateToProps = (state) => ({
  duration: getAudioDuration(state),
});

export default connect(mapStateToProps)(Zoom);
