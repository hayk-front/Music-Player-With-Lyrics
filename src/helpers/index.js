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

export const pixelToPercent = (child, parent) => {
  return (child * 100) / parent;
};

export const percentToPixel = (ref) => {
  return ref.current.clientWidth;
};

export const calculatePercentBySecond = (second, duration) => {
  return (second * 100) / duration;
};

export const secondToPercent = (second, duration) => {
  return (second * 100) / duration;
};

export const calculateProgressPercent = (elementStart, elementWidth) => {
  return Math.abs(Math.round((elementStart / elementWidth) * 100));
};

export const caluclateSecondByPercent = (percent, duration) => {
  return Math.round((percent * duration) / 100);
};

export const percentToSecond = (duration, percent) => {
  return Math.floor((Math.floor(duration) * percent) / 100);
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

export const calcEndSecondByStart = (startSec, initialEndSec) => {
  const minSecondRange = 5;
  if (startSec > initialEndSec - minSecondRange) {
    return startSec + minSecondRange;
  }
  return null;
};

export const validateSeconds = (
  inputSecond,
  startTime,
  point,
  leftBarrierSec,
  rightBarrierSec
) => {
  let second = parseMinutesFormatToSeconds(inputSecond);
  if (point === "start") {
    if (second > rightBarrierSec) second = rightBarrierSec - 5;
    if (second < leftBarrierSec) second = leftBarrierSec;
  } else {
    if (second < startTime) second = startTime + 5;
    if (second > rightBarrierSec) second = rightBarrierSec;
  }
  return second;
};
