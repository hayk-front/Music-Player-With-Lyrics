import { createSelector } from "reselect";

export const getState = (state) => state.project;

export const getAudioUrl = createSelector(
  getState,
  (project) => project.audioUrl
);

export const getAudioDuration = createSelector(
  getState,
  (project) => project.duration
);

export const getAudioChunks = createSelector(
  getState,
  (project) => project.audioChunks
);

export const getActiveChunk = createSelector(
  [getState, getAudioChunks],
  (project, audioChunks) => {
    return audioChunks.find((chunk) => chunk.id === project.activeChunkId);
  }
);

export const getActiveChunkText = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.textParams.text
);

export const getActiveChunkStartPoint = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.start
);

export const getActiveChunkEndPoint = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.end
);
