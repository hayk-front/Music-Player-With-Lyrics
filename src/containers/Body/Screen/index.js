import React from "react";
import * as Styled from "./styled";
import Lyrics from "./Lyrics";
import { connect } from "react-redux";
import { getShowLyrics } from "../../../redux/selectors";

const Screen = React.memo((props) => {
  const { showLyrics } = props;
  return (
    <Styled.Screen>
      { showLyrics && <Lyrics /> }
    </Styled.Screen>
  );
});

const mapStateToProps = (state) => ({
  showLyrics: getShowLyrics(state),
});

export default connect(mapStateToProps)(Screen);
