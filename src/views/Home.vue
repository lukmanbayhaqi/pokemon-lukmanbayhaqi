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

      <loading v-if="filterLoading" />

      <div
        v-else
        class="my-card mb-5"
        v-for="({ name, url }, i) in returnPokemons"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${returnIndexPokemon(
              url
            )}.svg`
          "
          :img-alt="name"
          overlay
          @click="() => $router.push(`/detail/${returnIndexPokemon(url)}`)"
        />
        <div
          class="pokemon-name d-flex justify-content-between align-items-center my-2 px-2"
        >
          <h5 class="d-flex justify-content-start align-item-center">
            <router-link :to="`/detail/${returnIndexPokemon(url)}`">
              {{ name }}
            </router-link>
          </h5>

          <h5>
            <!-- <b-icon
              :id="favorite ? 'remove-from-favorite' : 'add-to-favorite'"
              style="cursor: pointer;"
              :icon="favorite ? 'suit-heart-fill' : 'suit-heart'"
              color="red"
              @click="addToFavorite(i)"
              v-b-tooltip.hover
              :title="favorite ? 'remove from favorite' : 'add to favorite'"
            /> -->
          </h5>
        </div>
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
    isFilter: false,
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.loadTypePokemon();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    returnPokemons() {
      if (this.isFilter) return this.listFilteredPokemons;

      return this.$store.state.pokemonList;
    },
  },
  methods: {
    loadTypePokemon() {
      this.typePokemonLoading = true;

      get("https://pokeapi.co/api/v2/type")
        .then(({ data }) => {
          this.listTypePokemon = data.results;
        })
        .catch(console.error)
        .finally(() => (this.typePokemonLoading = false));
    },
    addToFavorite(index) {
      this.$store.commit("setFavorite", { index });
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
        !this.isFilter
      ) {
        this.loadMoreLoading = true;

        this.$store
          .dispatch("fetchPokemon")
          .then(() => {})
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
      console.log(filter);
      if (!filter) {
        this.isFilter = false;
        this.listFilteredPokemons = [];
      } else if (filter.url) {
        this.isFilter = true;
        this.filterLoading = true;

        get(`${filter.url}`)
          .then(({ data }) => {
            this.listFilteredPokemons = data.pokemon.map((el) => el.pokemon);
          })
          .catch(console.error)
          .finally(() => (this.filterLoading = false));
      }
    },
  },
};
</script>

<style lang="scss">
.pokemon-name {
  width: 60vw;

  @media only screen and (min-width: 600px) {
    width: 30vw;
  }

  @media only screen and (min-width: 800px) {
    width: 15vw;
  }
}
</style>
