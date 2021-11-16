import React from "react";
import { connect } from "react-redux";
import {
  getCurrentLyrics,
  getLyricsCoordinate,
} from "../../../../redux/selectors";
import * as Styled from "./styled";

const Lyrics = React.memo((props) => {
  const { lyrics, coordinate } = props;
  const [x, y] = coordinate;

  return (
    <Styled.Lyrics x={x} y={y}>
      {lyrics}
    </Styled.Lyrics>
  );
});

const mapStateToProps = (state) => ({
  lyrics: getCurrentLyrics(state),
  coordinate: getLyricsCoordinate(state),
});

export default connect(mapStateToProps)(Lyrics);
