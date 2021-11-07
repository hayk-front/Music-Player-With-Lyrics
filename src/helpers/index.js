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
    return ref.current.clientWidth
}


