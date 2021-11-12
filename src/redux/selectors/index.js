import { createSelector } from "reselect";

// PROJECT
export const getProject = (state) => state.project;

export const getAudioUrl = createSelector(
  getProject,
  (project) => project.audioUrl
);

export const getAudioDuration = createSelector(
  getProject,
  (project) => project.duration
);

export const getAudioChunks = createSelector(
  getProject,
  (project) => project.audioChunks
);

export const getActiveChunk = createSelector(
  [getProject, getAudioChunks],
  (project, audioChunks) => {
    return audioChunks.find((chunk) => chunk.id === project.activeChunkId);
  }
);

export const getLeftNeighbourChunk = createSelector(
  [getProject, getAudioChunks],
  (project, audioChunks) => {
    if (project.activeChunkId === audioChunks[0].id) {
      return { end: 0 };
    }
    return audioChunks.find((chunk) => chunk.id === project.activeChunkId - 1);
  }
);

export const getRightNeighbourChunk = createSelector(
  [getProject, getAudioChunks],
  (project, audioChunks) => {
    if (project.activeChunkId === audioChunks[audioChunks.length - 1].id) {
      return { start: project.duration };
    }
    return audioChunks.find((chunk) => chunk.id === project.activeChunkId + 1);
  }
);

export const getActiveChunkText = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.textParams.text
);

export const getActiveChunkId = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.id
);

export const getActiveChunkStartPoint = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.start
);

export const getActiveChunkEndPoint = createSelector(
  getActiveChunk,
  (audioChunk) => audioChunk.end
);

// _______________________________________________________
// GLOBALS
export const getGlobals = (state) => {
  return state.globals;
};

export const getIsResizable = createSelector(
  getGlobals,
  (globals) => globals.isResizable
);

export const getWidthInPercent = createSelector(
  getGlobals,
  (globals) => globals.widthInPercent
);

export const getWidthInPixels = createSelector(
  getGlobals,
  (globals) => globals.widthInPixels
);

export const getChunksActiveEdge = createSelector(
  getGlobals,
  (globals) => globals.chunksActiveEdge
);

export const getActiveChunkRef = createSelector(
  getGlobals,
  (globals) => globals.activeChunkRef
);
