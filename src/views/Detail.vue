<template>
  <div @scroll="handleScroll" style="margin-top: 10vh;">
    <!-- Go back button -->
    <b-button
      class="mb-4"
      variant="outline-primary"
      @click="() => $router.back()"
    >
      Go Back
    </b-button>

    <!-- Container -->
    <div
      class="row d-flex justify-content-around align-items-center"
      style="height: 50vh;"
      @scroll="handleScroll"
    >
      <loading v-if="isLoading" />

      <div class="col-lg-12" v-else>
        <div class="row">
          <div
            class="col-lg-4 d-flex justify-content-center align-items-center flex-column"
          >
            <b-img
              class="detail-image"
              :src="
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${$route.params.id}.svg`
              "
              fluid
              :alt="detail.name ? detail.name : '-'"
            />
            <b-button
              variant="outline-danger"
              class="my-5"
              @click="addToFavorite"
              size="sm"
            >
              {{ isFavorite ? "Remove from" : "Add to" }} Favorite
              <b-icon icon="suit-heart" aria-hidden="true"></b-icon>
            </b-button>
          </div>
          <div class="col-lg-8">
            <h3>{{ detail.name ? detail.name : "-" }}</h3>
            <hr />
            <section class="d-flex show-desktop-tablet">
              <h6>Types:</h6>
              <h6 v-if="detail.types.length == 0">-</h6>
              <section
                v-for="(type, i) in detail.types && detail.types.length > 0
                  ? detail.types
                  : []"
                :key="i"
              >
                <h6>
                  {{ type.type.name
                  }}{{ i !== detail.types.length - 1 ? ", " : "" }}
                </h6>
              </section>
            </section>
            <section class="d-flex show-only-mobile">
              <h6>Types:</h6>
              <h6 v-if="detail.types.length == 0">-</h6>

              <div>
                <section
                  v-for="(type, i) in detail.types && detail.types.length > 0
                    ? detail.types
                    : []"
                  :key="i"
                >
                  <h6>
                    {{ type.type.name
                    }}{{ i !== detail.types.length - 1 ? ", " : "" }}
                  </h6>
                </section>
              </div>
            </section>
            <hr />
            <section class="d-flex show-desktop-tablet">
              <h6 class="break-word">Abilities:</h6>
              <h6 v-if="detail.abilities.length == 0">-</h6>
              <section
                v-for="(ability, i) in detail.abilities.length > 0
                  ? detail.abilities
                  : []"
                :key="i"
              >
                <h6>
                  {{ ability.ability.name
                  }}{{ i !== detail.abilities.length - 1 ? ", " : "" }}
                </h6>
              </section>
            </section>
            <section class="d-flex flex-column show-only-mobile">
              <h6 class="break-word mb-2">Abilities:</h6>
              <h6 v-if="detail.abilities.length == 0">-</h6>
              <div>
                <section
                  v-for="(ability, i) in detail.abilities.length > 0
                    ? detail.abilities
                    : []"
                  :key="i"
                >
                  <h6>
                    {{ ability.ability.name
                    }}{{ i !== detail.abilities.length - 1 ? ", " : "" }}
                  </h6>
                </section>
              </div>
            </section>
            <hr />
            <h6>Color: {{ detail.color ? detail.color.name : "-" }}</h6>
            <hr />
            <h6>
              Base Happiness:
              {{ detail.base_happiness ? detail.base_happiness : "-" }}
            </h6>
            <hr />
            <h6>
              Capture Rate:
              {{ detail.capture_rate ? detail.capture_rate : "-" }}
            </h6>
            <hr />
            <section class="d-flex show-desktop-tablet">
              <h6>Egg Group:</h6>
              <h6 v-if="detail.egg_groups.length == 0">-</h6>
              <section
                v-for="({ name }, i) in detail.egg_groups.length > 0
                  ? detail.egg_groups
                  : []"
                :key="i"
              >
                <h6>
                  {{ name }}{{ i !== detail.egg_groups.length - 1 ? "," : "" }}
                </h6>
              </section>
            </section>
            <section
              class="d-flex flex-column justify-content-around show-only-mobile"
            >
              <h6 class="break-word mb-2">Egg Group:</h6>
              <h6 v-if="detail.egg_groups.length == 0">-</h6>
              <div class="d-flex flex-wrap">
                <section
                  v-for="({ name }, i) in detail.egg_groups.length > 0
                    ? detail.egg_groups
                    : []"
                  :key="i"
                >
                  <h6 class="break-word">
                    {{ name
                    }}{{ i !== detail.egg_groups.length - 1 ? "," : "" }}
                  </h6>
                </section>
              </div>
            </section>
            <hr />
            <h6 class="break-word">
              Growth Rate:
              {{ detail.growth_rate ? detail.growth_rate.name : "-" }}
            </h6>
            <hr />
            <h6 class="break-word">
              Habitat: {{ detail.habitat ? detail.habitat.name : "-" }}
            </h6>
            <hr />
            <section class="d-flex show-only-desktop">
              <h6 class="break-word">Evolution:</h6>
              <h6 v-if="detail.evolution.length == 0">-</h6>
              <section
                class="d-flex flex-row"
                style="margin-right: 1vw;"
                v-for="(evolution, i) in detail.evolution.length > 0
                  ? detail.evolution
                  : []"
                :key="i"
              >
                <h6 style="margin-right: 1vw;">
                  <a
                    class="cursor-pointer w-100"
                    @click="handleClickEvoluton(evolution.url)"
                  >
                    {{ evolution.name }}
                  </a>
                </h6>
                {{ i !== detail.evolution.length - 1 ? "=>" : "" }}
              </section>
            </section>
            <section class="d-flex show-only-tablet">
              <h6 class="break-word">Evolution:</h6>
              <h6 v-if="detail.evolution.length == 0">-</h6>
              <section class="d-flex flex-row flex-wrap">
                <h6
                  v-for="(evolution, i) in detail.evolution.length > 0
                    ? detail.evolution
                    : []"
                  :key="i"
                  style="margin-right: 1vw;"
                >
                  <a
                    class="cursor-pointer w-100"
                    @click="handleClickEvoluton(evolution.url)"
                  >
                    {{ evolution.name }}
                  </a>
                  {{ i !== detail.evolution.length - 1 ? "=>" : "" }}
                </h6>
              </section>
            </section>
            <section class="d-flex flex-column show-only-mobile">
              <h6 class="break-word mb-2">Evolution:</h6>
              <h6 v-if="detail.evolution.length == 0">-</h6>
              <div>
                <section
                  class="d-flex flex-row"
                  v-for="(evolution, i) in detail.evolution.length > 0
                    ? detail.evolution
                    : []"
                  :key="i"
                >
                  <h6 style="margin-right: 1vw;">
                    <a
                      class="cursor-pointer w-100"
                      @click="handleClickEvoluton(evolution.url)"
                    >
                      {{ evolution.name }}
                    </a>
                  </h6>
                  {{ i !== detail.evolution.length - 1 ? "=>" : "" }}
                </section>
              </div>
            </section>
            <hr />
          </div>
        </div>
        <div class="row p-5 show-only-desktop">
          <h6>Story about {{ detail.name }}</h6>
          <hr />
          <p class="break-word">{{ detail.description }}</p>
        </div>
        <div class="row p-2 show-tablet-mobile">
          <h6 class="break-word">Story about {{ detail.name }}</h6>
          <hr />
          <p class="break-word">{{ detail.description }}</p>
        </div>
      </div>
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
  name: "Detail",
  data: () => ({
    isLoading: true,
    detail: {},
    showChevronUp: false,
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.fetchDetailPokemon();
  },
  computed: {
    isFavorite() {
      if (!this.isLoading) {
        const favoriteListStore = this.$store.state.favoriteList;

        const isFav = favoriteListStore.find(
          (el) => el.name === this.detail.name
        );

        if (isFav) return true;
      }

      return false;
    },
  },
  methods: {
    fetchDetailPokemon() {
      this.isLoading = true;

      get(`pokemon/${this.$route.params.id}`)
        .then(({ data }) => {
          this.detail = data;

          return get(data.species.url);
        })
        .then(({ data }) => {
          for (let i in data) {
            this.detail[i] = data[i];
          }

          const filter = data.flavor_text_entries.filter(
            (el) => el.language.name === "en"
          );

          let arr = [];
          filter.forEach((el) => {
            if (!arr.includes(el.flavor_text)) arr.push(el.flavor_text);
          });

          this.detail.description = arr.join(" ");
          this.detail.evolution = [];

          return get(this.detail.evolution_chain.url);
        })
        .then(({ data }) => {
          this.getEvolution([data.chain]);

          this.$store.commit("setHistoryList", {
            detail: `You entered ${this.detail.name} Detail page`,
          });
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },
    getEvolution(evolution) {
      if (evolution.length > 0) {
        const arr = evolution[0].species.url.split("/");

        evolution[0].species.index = arr[arr.length - 2];

        this.detail.evolution.push(evolution[0].species);
        this.getEvolution(evolution[0].evolves_to);
      }
    },
    addToFavorite() {
      this.$store.commit("setFavorite", {
        name: this.detail.name,
        url: `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`,
      });
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
    handleClickEvoluton(url) {
      const arr = url.split("/");

      setTimeout(() => {
        this.fetchDetailPokemon();
      }, 100);

      return this.$router.push(`/detail/${arr[arr.length - 2]}`);
    },
  },
};
</script>

<style lang="scss">
.detail-image {
  height: 25vh;

  @media only screen and (min-width: 800px) {
    height: 35vh;
  }
}
</style>
