export const setAudioDuration = (payload) => {
  return {
    type: "SET_AUDIO_DURATION",
    payload,
  };
};
export const setActiveChunk = (payload) => {
  return {
    type: "SET_ACTIVE_AUDIO_CHUNK",
    payload,
  };
};
export const addChunk = (payload) => {
  return {
    type: "ADD_AUDIO_CHUNK",
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
