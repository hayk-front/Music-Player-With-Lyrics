import React from "react";
import { connect } from "react-redux";
import { getAudioChunks } from "../../../redux/selectors";
import AddButton from "./AddButton";
import * as Styled from "./styled";
import Subtitle from "./Subtitle";

const Sidebar = (props) => {
  const { audioChunks } = props;

  return (
    <Styled.Sidebar>
      {audioChunks.map((audioChunk) => {
        return (
          <Subtitle audioChunk={audioChunk} key={audioChunk.id} />
        );
      })}
      <AddButton />
    </Styled.Sidebar>
  );
};

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps)(Sidebar);
