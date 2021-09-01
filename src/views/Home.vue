<template>
  <div>
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around"
      style="margin-top: 10vh;"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <div class="row d-flex flex-row align-items-center w-100 mb-5">
        <div class="col-lg-2 my-2">
          <multiselect
            class="h-100"
            :options="listTypePokemon"
            v-model="filterPokemon"
            placeholder="Filter by"
            @input="handleFilterPokemon"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            :loading="typePokemonLoading"
            label="name"
            track-by="name"
          >
            <span slot="noResult">
              <small style="font-size: 10px;">
                There is no data found, please consider to change your search
                keyword
              </small>
            </span>
            <span slot="noOptions">
              <small style="font-size: 10px;">
                There is no data found here, consider to reload this page
              </small>
            </span>
          </multiselect>
        </div>

        <!-- Search box -->
        <div class="col-lg-10 my-2">
          <b-input-group>
            <b-form-input
              placeholder="Search Pokemon"
              v-model="keyword"
              debounce="1000"
              trim
            />

            <template #append>
              <b-button variant="primary" disabled>
                <b-icon icon="search" aria-label="search"></b-icon>
              </b-button>
            </template>
          </b-input-group>
        </div>
      </div>

      document referer: {{ documentReferer }}

      <loading v-if="filterLoading" />

      <div
        v-else
        class="my-card mb-5"
        v-for="(pokemon, i) in returnPokemons"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${returnIndexPokemon(
              pokemon.url
            )}.svg`
          "
          :img-alt="pokemon.name"
          overlay
          @click="
            () => $router.push(`/detail/${returnIndexPokemon(pokemon.url)}`)
          "
        />
        <div
          class="pokemon-name d-flex justify-content-between align-items-center my-2 px-2"
        >
          <h5 class="d-flex justify-content-start align-item-center">
            <router-link :to="`/detail/${returnIndexPokemon(pokemon.url)}`">
              {{ pokemon.name }}
            </router-link>
          </h5>

          <h5>
            <b-icon
              :id="
                pokemon.favorite ? 'remove-from-favorite' : 'add-to-favorite'
              "
              style="cursor: pointer;"
              :icon="pokemon.favorite ? 'suit-heart-fill' : 'suit-heart'"
              color="red"
              @click="addToFavorite(pokemon)"
              v-b-tooltip.hover
              :title="
                pokemon.favorite ? 'remove from favorite' : 'add to favorite'
              "
            />
          </h5>
        </div>
      </div>

      <div
        v-if="!filterLoading && returnPokemons.length === 0"
        class="no-pokemon-found d-flex flex-column justify-content-center align-items-center"
      >
        <b-img
          src="https://pngimg.com/uploads/pokeball/pokeball_PNG24.png"
          alt="Pokeball"
        />
        <h6>Oopps, There is no Pokemon here</h6>
      </div>
    </div>

    <!-- Loading load more -->
    <div class="w-100 d-flex justify-content-center">
      <b-spinner v-if="loadMoreLoading" variant="primary" type="grow" />
    </div>

    <!-- Floating Action Button -->
    <div class="btn-group-fab" role="group" aria-label="FAB Menu">
      <button
        v-if="showChevronUp"
        type="button"
        class="btn btn-main btn-primary has-tooltip"
        data-placement="left"
        title="Menu"
        @click="handleScrollToTop"
      >
        <h4><b-icon icon="chevron-up" color="white" /></h4>
      </button>
    </div>

    <b-tooltip target="add-to-favorite" triggers="hover">
      Add To Favorite
    </b-tooltip>
    <b-tooltip target="remove-from-favorite" triggers="hover">
      Remove From Favorite
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    filterLoading: false,
    loadMoreLoading: false,
    typePokemonLoading: false,
    showChevronUp: false,
    filterPokemon: null,
    keyword: null,
    listTypePokemon: [],
    listFilteredPokemons: [],
    searchResult: [],
    isFilter: false,
    isSearch: false,
    documentReferer: "document referer",
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.documentReferer = document.referrer;

    this.loadTypePokemon();

    this.$store.commit("setHistoryList", {
      detail: "You entered Home page",
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    keyword(after) {
      if (!after || after === "") {
        this.isSearch = false;

        this.$store.commit("setHistoryList", {
          detail: `You clear search keyword pokemon`,
        });
      } else {
        this.isSearch = true;
        if (this.isFilter)
          this.searchResult = this.listFilteredPokemons.filter(
            (el) => el.name.toLowerCase().indexOf(after.toLowerCase()) > -1
          );
        else
          this.searchResult = this.$store.state.pokemonList.filter(
            (el) => el.name.toLowerCase().indexOf(after.toLowerCase()) > -1
          );

        this.$store.commit("setHistoryList", {
          detail: `You search pokemon by "${after}" keyword and showing ${this.searchResult.length} result`,
        });
      }
    },
  },
  computed: {
    returnPokemons() {
      if (this.isSearch) return this.filterFavorite(this.searchResult);

      if (this.isFilter) return this.filterFavorite(this.listFilteredPokemons);

      return this.filterFavorite(this.$store.state.pokemonList);
    },
  },
  methods: {
    loadTypePokemon() {
      this.typePokemonLoading = true;

      get("type")
        .then(({ data }) => {
          this.listTypePokemon = data.results;
        })
        .catch(console.error)
        .finally(() => (this.typePokemonLoading = false));
    },
    addToFavorite(pokemon) {
      this.$store.commit("setFavorite", pokemon);
    },
    handleScroll(e) {
      let {
        scrollTop,
        clientHeight,
        scrollHeight,
      } = e.srcElement.scrollingElement;

      if (scrollTop > 300) this.showChevronUp = true;
      else this.showChevronUp = false;

      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !this.loadMoreLoading &&
        !this.isFilter &&
        !this.isSearch
      ) {
        this.loadMoreLoading = true;

        this.$store
          .dispatch("fetchPokemon")
          .then(() => {
            this.$store.commit("setHistoryList", {
              detail: `You increase the number of pokemon and now there are ${this.$store.state.pokemonList.length} pokemon`,
            });
          })
          .catch(() => {})
          .finally(() => (this.loadMoreLoading = false));
      }
    },
    handleScrollToTop() {
      let scroll = document.getElementById("app");

      scroll?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
    returnIndexPokemon(url) {
      const arr = url.split("/");

      return arr[arr.length - 2];
    },
    handleFilterPokemon(filter) {
      this.keyword = null;

      if (!filter) {
        this.isFilter = false;
        this.listFilteredPokemons = [];
        this.$store.commit("setHistoryList", {
          detail: `You remove filter pokemon`,
        });
      } else if (filter.url) {
        const { name, url } = filter;
        const findFilterPokemon = this.$store.state.filteredPokemon.find(
          (el) => el.name === name
        );

        this.isFilter = true;

        if (findFilterPokemon) {
          this.listFilteredPokemons = findFilterPokemon.dataPokemon;

          this.$store.commit("setHistoryList", {
            detail: `You set filter pokemon by "${name}" type and showing ${this.listFilteredPokemons.length} result`,
          });
        } else {
          this.filterLoading = true;

          get(`${filter.url}`)
            .then(({ data }) => {
              let dataPokemon = data.pokemon.map((el) => el.pokemon);
              dataPokemon = dataPokemon.map((el) => {
                el.favorite = false;
                return el;
              });

              this.listFilteredPokemons = dataPokemon;
              this.$store.commit("setFilteredPokemon", {
                name,
                url,
                dataPokemon,
              });

              this.$store.commit("setHistoryList", {
                detail: `You set filter pokemon by "${name}" type and showing ${this.listFilteredPokemons.length} result`,
              });
            })
            .catch(console.error)
            .finally(() => (this.filterLoading = false));
        }
      }
    },
    filterFavorite(list) {
      const favoriteListStore = this.$store.state.favoriteList;

      return list.slice().map((el) => {
        const findFavorite = favoriteListStore.find(
          (element) => el.name === element.name
        );

        if (findFavorite) el.favorite = true;
        else el.favorite = false;

        return el;
      });
    },
  },
};
</script>

<style lang="scss">
.pokemon-name {
  width: 75vw;

  @media only screen and (min-width: 600px) {
    width: 35vw;
  }

  @media only screen and (min-width: 800px) {
    width: 17vw;
  }
}

.no-pokemon-found {
  img {
    width: 60vw;
    @media only screen and (min-width: 600px) {
      width: 15vw;
    }
  }
}
</style>
