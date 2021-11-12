import React, { useState, useEffect } from "react";
import * as Styled from "./styled";
import { TextInput } from "./TextInput";
import { TimeInput } from "./TimeInput";
import "./index.scss";
import { getAudioDuration } from "../../../../redux/selectors";
import { connect } from "react-redux";
import {
  removeChunk,
  editChunkText,
  setActiveChunkId,
  setChunkEndTime,
  setChunkStartTime,
} from "../../../../redux/actions/action";
import {
  parseSecondsToMinutesFormat,
  validateSeconds,
} from "../../../../helpers";

const Subtitle = (props) => {
  const {
    removeChunk,
    audioChunk,
    audioDuration,
    setChunkStartTime,
    setChunkEndTime,
    editChunkText,
  } = props;
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.start)
  );
  const [endTime, setEndTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.end)
  );
  const [inputValue, setValue] = useState(audioChunk.textParams.text);

  useEffect(() => {
    setStartTime(parseSecondsToMinutesFormat(audioChunk.start));
  }, [audioChunk.start]);
  
  useEffect(() => {
    setEndTime(parseSecondsToMinutesFormat(audioChunk.end));
  }, [audioChunk.end]);
 

  const updateText = (e) => {
    setActiveChunkId(audioChunk.id);
    setValue(e.target.value);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        editChunkText(e.target.value);
      }, 1500)
    );
  };

  const updateTime = (e, point) => {
    setActiveChunkId(audioChunk.id);
    if (point === "start") {
      setStartTime(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (point === "start") {
          const seconds = validateSeconds(e.target.value, audioDuration);
          setChunkStartTime(seconds);
        } else {
          const seconds = validateSeconds(e.target.value, audioDuration);
          setChunkEndTime(seconds);
        }
      }, 2500)
    );
  };

  return (
    <Styled.Subtitle>
      <Styled.Icon
        src="./icons/remove.svg"
        alt="remove"
        onClick={() => removeChunk(audioChunk.id)}
      />

      <TextInput text={inputValue} updateText={updateText} />

      <div className="time-inputs-section">
        <TimeInput
          time={startTime}
          point="start"
          updateTime={(e) => updateTime(e, "start")}
        />
        <TimeInput
          time={endTime}
          point="end"
          updateTime={(e) => updateTime(e, "end")}
        />
      </div>
    </Styled.Subtitle>
  );
};

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
});

export default connect(mapStateToProps, {
  removeChunk,
  editChunkText,
  setChunkStartTime,
  setChunkEndTime,
})(Subtitle);
