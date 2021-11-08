import { produce } from "immer";
import {
  setDuration,
  addChunk,
  removeChunk,
  setActiveChunk,
  editText,
  editStartTime,
  editEndTime,
} from "./producer";

const initialState = {
  audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  canvasWidth: 1920,
  canvasHeight: 1080,
  duration: 186,
  activeChunkId: 1,
  audioChunks: [
    {
      id: 1,
      start: 5,
      end: 25,
      textParams: {
        text: "Some Text",
        coordinates: [120, 190],
      },
    },
    {
      id: 2,
      start: 80,
      end: 140,
      textParams: {
        text: "Some Text",
        coordinates: [120, 190],
      },
    },
  ],
};

export const project = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_AUDIO_DURATION":
        setDuration(action)(state, draft);
        break;
      case "SET_ACTIVE_AUDIO_CHUNK":
        setActiveChunk(action)(state, draft);
        break;
      case "ADD_AUDIO_CHUNK":
        addChunk()(state, draft);
        break;
      case "REMOVE_AUDIO_CHUNK":
        removeChunk(action)(state, draft);
        break;
      case "EDIT_CHUNK_START_TIME":
        editStartTime(action)(state, draft);
        break;
      case "EDIT_CHUNK_END_TIME":
        editEndTime(action)(state, draft);
        break;
      case "EDIT_CHUNK_TEXT":
        editText(action)(state, draft);
        break;
      default:
        break;
    }
  });
};
