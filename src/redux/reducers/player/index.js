import { produce } from "immer";

import { someAction } from "./producer";

const initialState = {
  name: "",
  surname: "",
};

export const player = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SOME_ACTION":
        someAction(action)(state, draft);
        break;
    }
  });
};