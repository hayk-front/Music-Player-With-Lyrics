import {
  getActiveChunk,
  getLastAudioChunk,
  isAllowedToAddChunk,
} from "./helper";

export const setActiveChunk = (action) => (state, draft) => {
  draft.activeChunkId = action.payload;
};

export const addChunk = () => (state, draft) => {
  const lastChunk = getLastAudioChunk(draft.audioChunks);
  if (isAllowedToAddChunk(lastChunk, draft.duration)) {
    draft.audioChunks.push({
      id: lastChunk.id + 1,
      start: lastChunk.end,
      end: draft.duration,
      textParams: {
        text: "",
        coordinate: [130, 40],
      },
    });
  }
};

export const removeChunk = (action) => (state, draft) => {
  if (draft.audioChunks.length > 1) {
    const removableIndex = draft.audioChunks.findIndex(
      (chunk) => chunk.id === action.payload
    );
    draft.audioChunks.splice(removableIndex, 1);
  }
};

export const editText = (action) => (state, draft) => {
  const activeChunk = getActiveChunk(draft.audioChunks, draft.activeChunkId);
  activeChunk.textParams.text = action.payload;
};

export const editChunkTimes = (action) => (state, draft) => {
  const activeChunk = getActiveChunk(draft.audioChunks, draft.activeChunkId);
  if (action.payload.start) activeChunk.start = action.payload.start;
  if (action.payload.end) activeChunk.end = action.payload.end;
};