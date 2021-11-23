import React, { useState, useEffect, useRef } from "react";
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
import { useOnOutsideClick } from "../../../../custom-hooks/";
const debounced1000 = debounce((fn) => fn(), 1000);

const Subtitle = React.memo((props) => {
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
  const subtitle = useRef(null);
  const [inputValue, setValue] = useState(audioChunk.textParams.text);
  const [leftBarrierSec, setLeftBarrierSec] = useState(0);
  const [rightBarrierSec, setRightBarrierSec] = useState(audioDuration);
  const [startTime, setStartTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.start)
  );
  const [endTime, setEndTime] = useState(
    parseSecondsToMinutesFormat(audioChunk.end)
  );

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
  };

  useOnOutsideClick(subtitle.current, () => {
    if (inputValue !== audioChunk.textParams.text) editChunkText(inputValue);
  });

  const updateChunkTime = (e, point) => {
    if (point === "start") {
      setStartTime(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
    setActiveChunkId(audioChunk.id);

    debounced1000(() => {
      const seconds = validateSeconds(
        e.target.value,
        audioChunk.start,
        point,
        leftBarrierSec,
        rightBarrierSec
      );

      const validSecondsToMinute = parseSecondsToMinutesFormat(seconds);

      if (point === "start") {
        setStartTime(validSecondsToMinute);
        setChunkTimes({
          start: seconds,
          end: calcEndSecondByStart(seconds, audioChunk.end),
        });
      } else {
        setEndTime(validSecondsToMinute);
        setChunkTimes({ start: null, end: seconds });
      }
    });
  };

  return (
    <Styled.Subtitle ref={subtitle}>
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
});

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
