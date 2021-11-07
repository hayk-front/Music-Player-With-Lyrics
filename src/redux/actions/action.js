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

