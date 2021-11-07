import React, { useRef, useContext, useEffect } from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import Edge from "./Edge";
import { getAudioDuration } from "../../../../../redux/selectors";
import { AudioChunkContext } from "../../../../../context/AudioChunkContext";

const AudioChunk = React.memo((props) => {
  const chunkContext = useContext(AudioChunkContext);
  const { sizeInPercent, setPercentSize, setActiveChunkRef } = chunkContext;
  const { audioChunk, audioDuration } = props;
  const chunk = useRef(null);
  const { start, end } = audioChunk;

  const setInitialChunkWidth = () => {
    const chunkWidthInSeconds = end - start;
    const chunkWidthInPercent = (chunkWidthInSeconds / audioDuration) * 100;
    setPercentSize(chunkWidthInPercent);
  };

  useEffect(() => {
    setInitialChunkWidth();
  }, []);

  useEffect(() => {
    if (chunk && chunk.current) setActiveChunkRef(chunk);
  }, [chunk, setActiveChunkRef]);

  return (
    // TODO: get START and END seconds, and change position
    
    <Styled.Chunk width={sizeInPercent} ref={chunk}>
      <Edge side={"left"} />
      <Edge side={"right"} />
    </Styled.Chunk>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
});
export default connect(mapStateToProps)(AudioChunk);
