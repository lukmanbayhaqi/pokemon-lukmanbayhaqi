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
            :options="[]"
            v-model="filterPokemon"
            placeholder="Filter by"
            @select="handleFilterPokemon"
            selectLabel="Select"
            deselectLabel="Remove"
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
      <div
        class="my-card mb-5"
        v-for="({ name, favorite, favoriteId, url }, i) in returnPokemons"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${favoriteId +
              1}.svg`
          "
          :img-alt="name"
          overlay
          @click="() => $router.push(`/detail/${returnIndexPokemon(url)}`)"
        />
        <div
          class="d-flex justify-content-between align-items-center my-2 px-2"
        >
          <h5 class="d-flex justify-content-start align-item-center">
            <router-link :to="`/detail/${returnIndexPokemon(url)}`">
              {{ name }}
            </router-link>
          </h5>

          <h5>
            <b-icon
              :id="favorite ? 'remove-from-favorite' : 'add-to-favorite'"
              style="cursor: pointer;"
              :icon="favorite ? 'suit-heart-fill' : 'suit-heart'"
              color="red"
              @click="addToFavorite(i)"
              v-b-tooltip.hover
              :title="favorite ? 'remove from favorite' : 'add to favorite'"
            />
          </h5>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div class="w-100 d-flex justify-content-center">
      <b-spinner v-if="isLoading" variant="primary" type="grow" />
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
    isLoading: false,
    showChevronUp: false,
    filterPokemon: null,
    keyword: null,
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    returnPokemons() {
      return this.$store.state.pokemonList;
    },
  },
  methods: {
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

      if (scrollTop + clientHeight >= scrollHeight - 1 && !this.isLoading) {
        this.isLoading = true;

        this.$store
          .dispatch("fetchPokemon")
          .then(() => {})
          .catch(() => {})
          .finally(() => (this.isLoading = false));
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
    },
  },
};
</script>

<style lang="scss">
.text-pokemon-card {
  @media only screen and (min-width: 600px) and (max-width: 800px) {
    width: 25vw;
  }
}
</style>
