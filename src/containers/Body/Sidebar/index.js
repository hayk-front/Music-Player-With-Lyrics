import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getAudioChunks } from "../../../redux/selectors";
import * as Styled from "./styled";
import { Subtitle } from "./Subtitle";

const Sidebar = (props) => {
  const { audioChunks } = props;
  return (
    <Styled.Sidebar>
      {audioChunks.map((audioChunk) => {
        return (
          <Fragment key={audioChunk.id}>
            <Subtitle audioChunk={audioChunk}/>
          </Fragment>
        );
      })}
    </Styled.Sidebar>
  );
};

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps)(Sidebar);
