import CONSTS from "../../constants/consts";
import { Action, IntialState } from "../../types/types";

const intialState: IntialState = {
  posts: [],
  activePost: {},
};

const reducer = (state: IntialState = intialState, action: Action): IntialState => {
  switch (action.type) {
    case CONSTS.GET_POSTS: {
      const postVals = [...state.posts, ...action.data];
      return { ...state, posts: postVals };
    }
    case CONSTS.SET_POST:
      return { ...state, activePost: action.data };
    default:
      return state;
  }
};

export default reducer;
