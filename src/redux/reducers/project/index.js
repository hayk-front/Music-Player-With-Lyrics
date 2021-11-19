import { produce } from "immer";
import {
  addChunk,
  removeChunk,
  setActiveChunk,
  editText,
  editChunkTimes,
} from "./producer";

const initialState = {
  audioUrl: "./songs/song.mp3",
  canvasWidth: 1920,
  canvasHeight: 1080,
  duration: 245,
  activeChunkId: null,
  audioChunks: [
    {
      id: 1,
      start: 15,
      end: 23,
      textParams: {
        text: "You shout it out, But I can't hear a word you say",
        coordinate: [130, 40],
      },
    },
    {
      id: 2,
      start: 46,
      end: 54,
      textParams: {
        text: "I'm bulletproof, nothing to lose, Fire away, fire away",
        coordinate: [130, 40],
      },
    },
  ],
};

export const project = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_ACTIVE_CHUNK_ID":
        setActiveChunk(action)(state, draft);
        break;
      case "ADD_AUDIO_CHUNK":
        addChunk()(state, draft);
        break;
      case "REMOVE_AUDIO_CHUNK":
        removeChunk(action)(state, draft);
        break;
      case "EDIT_CHUNK_TIMES":
        editChunkTimes(action)(state, draft);
        break;
      case "EDIT_CHUNK_TEXT":
        editText(action)(state, draft);
        break;
      default:
        break;
    }
  });
};
