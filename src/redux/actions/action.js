// state.project actions
export const setAudioDuration = (payload) => {
  return {
    type: "SET_AUDIO_DURATION",
    payload,
  };
};
export const setActiveChunkId = (payload) => {
  return {
    type: "SET_ACTIVE_AUDIO_CHUNK",
    payload,
  };
};
export const addChunk = () => {
  return {
    type: "ADD_AUDIO_CHUNK",
  };
};
export const removeChunk = (payload) => {
  return {
    type: "REMOVE_AUDIO_CHUNK",
    payload,
  };
};
export const editChunk = (payload) => {
  return {
    type: "EDIT_AUDIO_CHUNK",
    payload,
  };
};
export const editChunkText = (payload) => {
  return {
    type: "EDIT_CHUNK_TEXT",
    payload,
  };
};
export const setActiveChunkStartPoint = (payload) => {
  return {
    type: "EDIT_CHUNK_START_TIME",
    payload,
  };
};
export const setActiveChunkEndPoint = (payload) => {
  return {
    type: "EDIT_CHUNK_END_TIME",
    payload,
  };
};


// state.globals actions
export const setIsResizable = (payload) => {
  return {
    type: "SET_IS_RESIZABLE",
    payload,
  };
};
export const setWidthInPercent = (payload) => {
  return {
    type: "SET_WIDTH_IN_PERCENT",
    payload,
  };
};
export const setWidthInPixels = (payload) => {
  return {
    type: "SET_WIDTH_IN_PIXELS",
    payload,
  };
};
export const setChunksActiveEdge = (payload) => {
  return {
    type: "SET_CHUNKS_ACTIVE_EDGE",
    payload,
  };
};
export const setActiveChunkRef = (payload) => {
  return {
    type: "SET_ACTIVE_CHUNK_REF",
    payload,
  };
};
