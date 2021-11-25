import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  getActiveChunkEndPoint,
  getActiveChunkId,
  getActiveChunkStartPoint,
  getAudioChunks,
  getLyrics,
} from "../../../redux/selectors";
import AddButton from "../../../components/AddButton";
import * as Styled from "./styled";
import Subtitle from "./Subtitle";

const Sidebar = React.memo((props) => {
  const { audioChunks, id, start, end, lyrics } = props;
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
        return (
          <Subtitle
            id={audioChunk.id}
            start={audioChunk.start}
            end={audioChunk.end}
            lyrics={audioChunk.textParams.text}
            key={audioChunk.id}
          />
        );
      })}
      <AddButton />
    </Styled.Sidebar>
  );
});

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
  id: getActiveChunkId(state),
  start: getActiveChunkStartPoint(state),
  end: getActiveChunkEndPoint(state),
  lyrics: getLyrics(state),
});

export default connect(mapStateToProps)(Sidebar);
