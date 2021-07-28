import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    favoriteList: [],
    filteredPokemon: [],
    nextUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
  },
  mutations: {
    setPokemonList(state, payload) {
      state.pokemonList = [...state.pokemonList, ...payload.data];

      state.nextUrl = payload.nextUrl;
    },
    setFavorite(state, payload) {
      let indexFavorite = null;
      const findFavorite = state.favoriteList.find((el, i) => {
        if (el.name == payload.name) {
          indexFavorite = i;
          return el;
        }
      });

      if (findFavorite) state.favoriteList.splice(indexFavorite, 1);
      else state.favoriteList.push(payload);
    },
    setFilteredPokemon(state, payload) {
      state.filteredPokemon.push(payload);
    },
  },
  actions: {
    fetchPokemon({ commit, state }) {
      return new Promise((resolve, reject) => {
        get(state.nextUrl)
          .then(({ data }) => {
            data.results.forEach((el) => {
              el.favorite = false;
            });

            commit("setPokemonList", {
              data: data.results,
              nextUrl: data.next,
            });

            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
