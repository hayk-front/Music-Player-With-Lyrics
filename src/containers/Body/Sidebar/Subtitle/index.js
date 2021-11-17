import React, { useState, useEffect } from "react";
import * as Styled from "./styled";
import { TextInput } from "../../../../components/TextInput";
import { TimeInput } from "../../../../components/TimeInput";
import {
  getActiveChunkId,
  getAudioDuration,
  getLeftNeighbourChunk,
  getRightNeighbourChunk,
} from "../../../../redux/selectors";
import { connect } from "react-redux";
import {
  removeChunk,
  editChunkText,
  setActiveChunkId,
  setChunkTimes,
} from "../../../../redux/actions/action";
import {
  calcEndSecondByStart,
  debounce,
  parseSecondsToMinutesFormat,
  validateSeconds,
} from "../../../../helpers";
const debounced700 = debounce((fn) => fn(), 700);
const debounced1000 = debounce((fn) => fn(), 1000);

const Subtitle = (props) => {
  const {
    removeChunk,
    audioChunk,
    audioDuration,
    setChunkTimes,
    editChunkText,
    leftChunk,
    rightChunk,
    activeChunkId,
    setActiveChunkId,
  } = props;
  const [startTime, setStartTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.start)
  );
  const [endTime, setEndTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.end)
  );
  const [inputValue, setValue] = useState(audioChunk.textParams.text);
  const [leftBarrierSec, setLeftBarrierSec] = useState(0);
  const [rightBarrierSec, setRightBarrierSec] = useState(audioDuration);

  useEffect(() => {
    setStartTime(parseSecondsToMinutesFormat(audioChunk.start));
  }, [audioChunk.start]);

  useEffect(() => {
    setRightBarrierSec(rightChunk.start);
    setLeftBarrierSec(leftChunk.end);
  }, [activeChunkId, rightChunk, leftChunk]);

  useEffect(() => {
    setEndTime(parseSecondsToMinutesFormat(audioChunk.end));
  }, [audioChunk.end]);

  const updateChunkLyrics = (e) => {
    setActiveChunkId(audioChunk.id);
    setValue(e.target.value);

    debounced700(() => {
      editChunkText(e.target.value);
    });
  };

  const updateChunkTime = (e, point) => {
    setActiveChunkId(audioChunk.id);
    const seconds = validateSeconds(
      e.target.value,
      audioChunk.start,
      point,
      leftBarrierSec,
      rightBarrierSec
    );
    const validSecondsToMinute = parseSecondsToMinutesFormat(seconds);

    if (point === "start") {
      setStartTime(e.target.value);
      debounced1000(() => {
        setStartTime(validSecondsToMinute);
        setChunkTimes({
          start: seconds,
          end: calcEndSecondByStart(seconds, audioChunk.end),
        });
      });
    } else {
      setEndTime(e.target.value);
      debounced1000(() => {
        setEndTime(validSecondsToMinute);
        setChunkTimes({ start: null, end: seconds });
      });
    }
  };

  return (
    <Styled.Subtitle>
      <Styled.Icon
        src="./icons/remove.svg"
        alt="remove"
        onClick={() => removeChunk(audioChunk.id)}
      />

      <TextInput text={inputValue} updateChunkLyrics={updateChunkLyrics} />

      <Styled.TimeInputSection>
        <TimeInput
          time={startTime}
          point="start"
          updateChunkTime={(e) => updateChunkTime(e, "start")}
        />
        <TimeInput
          time={endTime}
          point="end"
          updateChunkTime={(e) => updateChunkTime(e, "end")}
        />
      </Styled.TimeInputSection>
    </Styled.Subtitle>
  );
};

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  activeChunkId: getActiveChunkId(state),
  leftChunk: getLeftNeighbourChunk(state),
  rightChunk: getRightNeighbourChunk(state),
});

export default connect(mapStateToProps, {
  removeChunk,
  editChunkText,
  setChunkTimes,
  setActiveChunkId,
})(Subtitle);
