import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    nextUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
  },
  mutations: {
    setPokemonList(state, payload) {
      state.pokemonList = [...state.pokemonList, ...payload.data];
      state.pokemonList.forEach((el, i) => (el.favoriteId = i));

      state.nextUrl = payload.nextUrl;
    },
    setFavorite(state, payload) {
      if (state.pokemonList[payload.index])
        state.pokemonList[payload.index].favorite = !state.pokemonList[
          payload.index
        ].favorite;
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
