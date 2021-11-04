export const someAction = (action) => (state, draft) => {
  draft.data = action.value;
};
