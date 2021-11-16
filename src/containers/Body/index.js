import React from "react";
import Screen from "./Screen";
import * as Styled from "./styled";
import Sidebar from "./Sidebar";
import EmptySidebar from "./EmptySidebar";
import { connect } from "react-redux";
import { getAudioChunks } from "../../redux/selectors";
import { setActiveChunkId } from "../../redux/actions/action";

const Body = (props) => {
  const { audioChunks, setActiveChunkId } = props;
  setActiveChunkId(audioChunks[0].id)
  return (
    <Styled.Body>
      <EmptySidebar />
      <Screen />
      <Sidebar />
    </Styled.Body>
  );
};

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});
export default connect(mapStateToProps, { setActiveChunkId })(Body);
