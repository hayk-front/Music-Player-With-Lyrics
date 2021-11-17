import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getAudioChunks } from "../../../redux/selectors";
import AddButton from "../../../components/AddButton";
import * as Styled from "./styled";
import Subtitle from "./Subtitle";

const Sidebar = (props) => {
  const { audioChunks } = props;
  const sidebar = useRef(null);

  useEffect(() => {
    sidebar.current.scrollTo({
      top: sidebar.current.scrollHeight,
      behavior: "smooth",
    });
  }, [audioChunks.length]);

  return (
    <Styled.Sidebar ref={sidebar}>
      {audioChunks.map((audioChunk) => {
        return <Subtitle audioChunk={audioChunk} key={audioChunk.id} />;
      })}
      <AddButton />
    </Styled.Sidebar>
  );
};

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps)(Sidebar);
