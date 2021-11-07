import { produce } from "immer";
import { setDuration, addChunk, editChunk, setActiveChunk } from "./producer";

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
      end: 65,
      textParams: {
        text: "Lorem Ipsum",
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
        addChunk(action)(state, draft);
        break;
      case "EDIT_AUDIO_CHUNK":
        editChunk(action)(state, draft);
        break;
      default:
        break;
    }
  });
};
