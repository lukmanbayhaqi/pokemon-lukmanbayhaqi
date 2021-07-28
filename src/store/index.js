import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    favoriteList: [],
    filteredPokemon: [],
    historyList: [
      {
        detail: "You entered this app",
        date: new Date(),
      },
    ],
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

      if (findFavorite) {
        state.favoriteList.splice(indexFavorite, 1);
        state.historyList.push({
          detail: `You remove ${payload.name} from favorite`,
          date: new Date(),
        });
      } else {
        state.favoriteList.push(payload);
        state.historyList.push({
          detail: `You add ${payload.name} to favorite`,
          date: new Date(),
        });
      }
    },
    setFilteredPokemon(state, payload) {
      state.filteredPokemon.push(payload);
    },
    setHistoryList(state, payload) {
      payload.date = new Date();
      state.historyList.push(payload);
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
