<template>
  <div @scroll="handleScroll" style="margin-top: 15vh;">
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around"
      id="container-scroll"
    >
      <div
        class="no-pokemon-found d-flex flex-column justify-content-center align-items-center"
        v-if="returnFavoritePokemons.length === 0"
      >
        <b-img
          src="https://pngimg.com/uploads/pokeball/pokeball_PNG24.png"
          alt="Pokeball"
        />
        <h6>Oopps, There is no Pokemon here, let's catch some Pokemon</h6>
      </div>

      <div
        class="my-card mb-5"
        v-for="(pokemon, i) in returnFavoritePokemons"
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
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    isLoading: false,
    showChevronUp: false,
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    returnFavoritePokemons() {
      return this.$store.state.favoriteList;
    },
  },
  methods: {
    addToFavorite(pokemon) {
      this.$store.commit("setFavorite", pokemon);
    },
    handleScroll(e) {
      let { scrollTop } = e.srcElement.scrollingElement;

      if (scrollTop > 300) this.showChevronUp = true;
      else this.showChevronUp = false;
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
