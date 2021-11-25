import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./styled";
import { TextInput } from "../../../../components/TextInput";
import { TimeInput } from "../../../../components/TimeInput";
import {
  getActiveChunkId,
  getAudioDuration,
  getLeftBarrier,
  getRightBarrier,
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
    id,
    start,
    end,
    lyrics,
    setChunkTimes,
    editChunkText,
    leftBarrierSec,
    rightBarrierSec,
    setActiveChunkId,
  } = props;
  const subtitle = useRef(null);
  const [inputValue, setValue] = useState(lyrics);
  const [startTime, setStartTime] = useState(
    parseSecondsToMinutesFormat(start)
  );
  const [endTime, setEndTime] = useState(parseSecondsToMinutesFormat(end));

  useEffect(() => {
    setStartTime(parseSecondsToMinutesFormat(start));
  }, [start]);

  useEffect(() => {
    setEndTime(parseSecondsToMinutesFormat(end));
  }, [end]);

  const updateChunkLyrics = (e) => {
    setActiveChunkId(id);
    setValue(e.target.value);
  };

  useOnOutsideClick(subtitle.current, () => {
    if (inputValue !== lyrics) editChunkText(inputValue);
  });

  const updateChunkTime = (e, point) => {
    if (point === "start") {
      setStartTime(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
    setActiveChunkId(id);

    debounced1000(() => {
      const seconds = validateSeconds(
        e.target.value,
        start,
        point,
        leftBarrierSec,
        rightBarrierSec
      );

      const validSecondsToMinute = parseSecondsToMinutesFormat(seconds);

      if (point === "start") {
        setStartTime(validSecondsToMinute);
        setChunkTimes({
          start: seconds,
          end: calcEndSecondByStart(seconds, end),
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
        onClick={() => removeChunk(id)}
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
  leftBarrier: getLeftBarrier(state),
  rightBarrier: getRightBarrier(state),
});

export default connect(mapStateToProps, {
  removeChunk,
  editChunkText,
  setChunkTimes,
  setActiveChunkId,
})(Subtitle);
