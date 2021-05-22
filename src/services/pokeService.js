import axios from "axios";
import { POKE_API } from "../constants";
import * as actions from "../state/pokeAction";

export const getPokemonList = () => {
  return axios.get(`${ POKE_API }?limit=151`)
}

export const getPokemonInfo = (name) => {
  return axios.get(`${ POKE_API }/${ name }`)
}

export const fetchPokeList = () => {
  return (dispatch) => {
    dispatch(actions.loadPokeList());

    getPokemonList()
      .then(res => res.data.results)
      .catch(err => {
        dispatch(actions.loadPokeListFailed(err));
      })
      .then(pokes => {
        return Promise.all(
          pokes.map(async poke => {
            return (await getPokemonInfo(poke.name)).data;
          })
        )
      })
      .then((pokes) => dispatch(actions.loadPokeListSuccess(pokes)))
  }
}