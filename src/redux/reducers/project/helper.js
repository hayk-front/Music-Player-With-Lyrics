export const getActiveChunk = (chunks, id) => {
  return chunks.find((chunk) => chunk.id === id);
};

export const getLastAudioChunk = (chunks) => {
  return chunks[chunks.length - 1];
};

export const isAllowedToAddChunk = (lastChunk, audioDuration) => {
  const minimumChunkSeconds = 5;
  if (lastChunk.end < audioDuration - minimumChunkSeconds) {
    return true;
  }
  return false;
};
