export const setWidthInPixels = (action) => (state, draft) => {
  draft.widthInPixels = action.payload;
};

export const setAudioElement = (action) => (state, draft) => {
  draft.audio = action.payload;
};

export const setShowLyrics = (action) => (state, draft) => {
  draft.showLyrics = action.payload;
};
export const setCurrentLyrics = (action) => (state, draft) => {
  draft.currentLyrics = action.payload;
};

