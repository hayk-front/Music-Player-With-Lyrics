import React, { useState } from "react";
import * as Styled from "./styled";

export const Zoom = React.memo((props) => {
  const { zoom, setZoom } = props;

  const zoomIn = () => {
    if (zoom < 3) setZoom(zoom + 1);
  };
  const zoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1);
  };

  return (
    <Styled.Zoom>
      <Styled.Icon zoomType="Out" onClick={zoomOut}></Styled.Icon>

      <Styled.Span>{zoom}x</Styled.Span>

      <Styled.Icon zoomType="In" onClick={zoomIn}></Styled.Icon>
    </Styled.Zoom>
  );
});
