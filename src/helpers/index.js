// Global Pure Functions Here

export const debounce = (fn, ms) => {
  let timeoutID;
  return (...arg) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...arg), ms);
  };
};

export const getElementWidthOnWindow = (parent, clientX) => {
  const elementStart = clientX - parent.offsetLeft;
  const elementWidth = window.innerWidth - 2 * parent.offsetLeft;
  return {
    elementStart,
    elementWidth,
  };
};

export const calcPercent = (child, parent) => {
  return (child * 100) / parent;
};

export const calcSecondByPercent = (percent, duration) => {
  return Math.round((percent * duration) / 100);
};

export const calculateProgressPercent = (elementStart, elementWidth) => {
  return Math.abs(Math.round((elementStart / elementWidth) * 100));
};

export const calcEndSecondByStart = (startSec, initialEndSec) => {
  const minSecondRange = 5;
  if (startSec > initialEndSec - minSecondRange) {
    return startSec + minSecondRange;
  }
  return null;
};

export const parseSecondsToMinutesFormat = (seconds) => {
  // 110 to 01:50
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
};

export const parseMinutesFormatToSeconds = (minutesFormat) => {
  // 01:50 to 110
  const arr = minutesFormat.split(":");
  const seconds = arr[0] * 60 + +arr[1];
  return seconds;
};

export const validateSeconds = (
  inputSecond,
  startTime,
  point,
  leftBarrierSec,
  rightBarrierSec
) => {
  const minRange = 5;
  let second = parseMinutesFormatToSeconds(inputSecond);
  if (point === "start") {
    if (second > rightBarrierSec) second = rightBarrierSec - minRange;
    if (second < leftBarrierSec) second = leftBarrierSec;
  } else {
    if (second < startTime) second = startTime + minRange;
    if (second > rightBarrierSec) second = rightBarrierSec;
  }
  return second;
};
