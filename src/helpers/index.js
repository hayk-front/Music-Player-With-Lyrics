// Global Pure Functions Here

export const getElementWidthOnWindow = (parent, clientX, childSize) => {
  const elementStart = clientX - parent.offsetLeft;
  const elementWidth = window.innerWidth - 2 * parent.offsetLeft;
  return {
    elementStart,
    elementWidth,
  };
};

export const pixelToPercent = (parent, child) => {
  return Math.round((child * 100) / parent);
};

export const percentToPixel = (ref) => {
  return ref.current.clientWidth;
};

export const calculatePercentBySecond = (second, duration) => {
  return Math.round((second * 100) / duration);
};

export const caluclateSecondByPercent = (percent, duration) => {
  return Math.round((percent * duration) / 100);
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
export const validateSeconds = (inputSecond, audioDuration) => {
  let second = parseMinutesFormatToSeconds(inputSecond);
  if (second > audioDuration) second = audioDuration;
  return second;
};
