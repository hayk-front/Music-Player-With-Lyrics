export const setProgressPercent = (ref, percent) => {
  ref.current.style.width = `${percent}%`;
};
