import * as types from './pokeTypes';

const initialPokeState = {
  loading: false,
  pokeList: [],
  checkList: [],
  err: null
}

const reducer = (state = initialPokeState, action) => {
  switch (action.type) {
    case types.LOAD_POKE_LIST:
      return {
        ...state,
        loading: true
      };
    case types.LOAD_POKE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pokeList: [...action.pokeList]
      };
    case types.LOAD_POKE_LIST_FAILED:
      return {
        ...state,
        loading: false,
        err: action.err
      };
    case types.SET_CHECK_LIST:
      return {
        ...state,
        checkList: [...action.bag],
      };
    default:
      return state;
  }
}

export default reducer;