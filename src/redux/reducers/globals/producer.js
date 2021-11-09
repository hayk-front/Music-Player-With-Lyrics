export const setWidthInPercent = (action) => (state, draft) => {
  draft.widthInPercent = action.payload;
};

export const setWidthInPixels = (action) => (state, draft) => {
  draft.widthInPixels = action.payload;
};

export const setChunksActiveEdge = (action) => (state, draft) => {
  draft.chunksActiveEdge = action.payload;
};

export const setActiveChunkRef = (action) => (state, draft) => {
  draft.activeChunkRef = action.payload;
};
