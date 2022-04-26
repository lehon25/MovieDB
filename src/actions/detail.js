import * as types from './actionTypes';

import {fetchDetailMovies} from '../net/config';

export function requestFetchDetailMovies(id) {
  console.log('idsss',id)
  return (dispatch, getState) => {
    fetchDetail1Movies(dispatch, getState);
  };
}

function fetchDetail1Movies(dispatch) {
  return fetchDetailMovies(id).then(resp => {
    console.log(resp)
    if (resp && resp.results) {
      const results = resp.results;
      dispatch({
        type: types.FETCH_DETAIL,
        payload: results,
      });
      return results;
    }
  });
}
