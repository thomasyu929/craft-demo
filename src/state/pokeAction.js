import * as types from './pokeTypes';

export const loadPokeList = () => {
  return {
    type: types.LOAD_POKE_LIST
  }
}

export const loadPokeListSuccess = (pokeList) => {
  return {
    type: types.LOAD_POKE_LIST_SUCCESS,
    pokeList
  }
}

export const loadPokeListFailed = (err) => {
  return {
    type: types.LOAD_POKE_LIST_FAILED,
    err
  }
}

export const setCheckList = (bag) => {
  return {
    type: types.SET_CHECK_LIST,
    bag
  }
}