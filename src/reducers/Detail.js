import * as types from '../actions/actionTypes';
const initialState = {
  detailMovies: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DETAIL: {
      const result = action.payload;
      if (result) {
        return {
          ...state,
          detailMovies: result,
        };
      }
      break;
    }

    default: {
      return state;
    }
  }
}
