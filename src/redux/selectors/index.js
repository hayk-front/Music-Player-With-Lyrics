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