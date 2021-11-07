import { getActiveChunk } from "../../selectors";

export const setDuration = (action) => (state, draft) => {
  console.log("STATE: ", state);
  console.log("DRAFT: ", draft);

  draft.data = action.value;
};

export const setActiveChunk = (action) => (state, draft) => {
  console.log("STATE: ", state);
  console.log("DRAFT: ", draft);

  draft.data = action.value;
};

export const addChunk = (action) => (state, draft) => {
  console.log("STATE: ", state);
  console.log("DRAFT: ", draft);

  draft.data = action.value;
};

export const editChunk = (action) => (state, draft) => {
  console.log("STATE: ", state);
  console.log("DRAFT: ", draft);

  draft.data = action.value;
};

export const editText = (action) => (state,draft) => {
  console.log('editText: ', action)
  draft.data = action.value;

  const activeChunk = getActiveChunk(state);
  activeChunk.textParams.text = draft.data
}

export const editStartTime = (action) => (state,draft) => {
  console.log('startTime: ', action)
  draft.data = action.value;

  const activeChunk = getActiveChunk(state);
  activeChunk.start = draft.data
}

export const editEndTime = (action) => (state,draft) => {
  console.log('endTime: ', action)
  draft.data = action.value;

  const activeChunk = getActiveChunk(state);
  activeChunk.end = draft.data
}



