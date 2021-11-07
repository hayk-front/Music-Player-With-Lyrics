export const setDuration = (action) => (state, draft) => {
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

export const setActiveChunk = (action) => (state, draft) => {
  console.log("STATE: ", state);
  console.log("DRAFT: ", draft);

  draft.data = action.value;
};

