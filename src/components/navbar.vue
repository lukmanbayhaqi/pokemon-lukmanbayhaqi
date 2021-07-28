<template>
  <b-navbar
    class="navbar-pokemon"
    toggleable="lg"
    type="dark"
    variant="primary"
  >
    <b-navbar-brand @click="() => $router.push('/')">
      <b-img
        class="pokemon-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Pokemon"
      ></b-img>
    </b-navbar-brand>

    <b-navbar-toggle
      target="nav-collapse"
      style="margin-right: 10px;"
    ></b-navbar-toggle>

    <b-collapse
      class="justify-content-between"
      style="padding-right: 1vw;"
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item
          class="mt-2 ml-3"
          style="margin-left: 10px;"
          @click="changePage('/')"
        >
          <div class="d-flex flex-row align-items-center">
            <h5>
              <b-icon icon="house-door-fill" color="red" />
            </h5>
            <div style="width: 10px" />
            <h5 style="color: whitesmoke;">
              Home
            </h5>
          </div>
        </b-nav-item>
        <b-nav-item
          class="mt-2 ml-3"
          style="margin-left: 10px;"
          @click="changePage('/favorite')"
        >
          <div class="d-flex flex-row align-items-center">
            <h5><b-icon icon="suit-heart-fill" color="red" /></h5>
            <div style="width: 10px" />
            <h5 style="color: whitesmoke;">
              Favorite
            </h5>
          </div>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item
          class="mt-2 ml-3"
          style="margin-left: 10px;"
          @click="changePage('/')"
        >
          <div class="d-flex flex-row align-items-center">
            <h5>
              <b-icon icon="clock-history" color="red" />
            </h5>
            <div style="width: 10px" />
            <h5 style="color: whitesmoke;">
              History
            </h5>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changePage(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss">
.pokemon-logo {
  margin-left: 0.5vw;
  width: 50vw;

  @media only screen and (min-width: 600px) {
    width: 30vw;
  }
  @media only screen and (min-width: 800px) {
    width: 15vw;
  }
}
.navbar-pokemon {
  position: fixed !important;
  width: 100% !important;
  z-index: 100 !important;
}
</style>
