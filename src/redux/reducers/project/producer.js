import {
  getActiveChunk,
  getLastAudioChunk,
  isAllowedToAddChunk,
} from "./helper";

export const setDuration = (action) => (state, draft) => {
  draft.duration = action.payload;
};

export const setActiveChunk = (action) => (state, draft) => {
  draft.activeChunkId = action.payload;
};

export const addChunk = () => (state, draft) => {
  const lastChunk = getLastAudioChunk(draft.audioChunks);
  if (isAllowedToAddChunk(lastChunk, draft.duration)) {
    draft.audioChunks.push({
      id: lastChunk.id + 1,
      start: lastChunk.end + 1,
      end: lastChunk.end + 6,
      textParams: {
        text: "Some Text Here",
        coordinates: [120, 190],
      },
    });
  }
};

export const removeChunk = (action) => (state, draft) => {
  const removableIndex = draft.audioChunks.findIndex(
    (chunk) => chunk.id === action.payload
  );
  draft.audioChunks.splice(removableIndex, 1);
};

export const editText = (action) => (state, draft) => {
  const activeChunk = getActiveChunk(draft.audioChunks, draft.activeChunkId);
  activeChunk.textParams.text = action.payload;
};

export const editStartTime = (action) => (state, draft) => {
  const activeChunk = getActiveChunk(draft.audioChunks, draft.activeChunkId);
  activeChunk.start = action.payload;
};

export const editEndTime = (action) => (state, draft) => {
  const activeChunk = getActiveChunk(draft.audioChunks, draft.activeChunkId);
  activeChunk.end = action.payload;
};
