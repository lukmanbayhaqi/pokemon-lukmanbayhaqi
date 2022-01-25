<template>
  <div id="app">
    <navbar />

    <b-container class="p-5" id="app-container" fluid>
      <router-view />
    </b-container>

    <history />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import History from "@/components/history";

export default {
  components: {
    Navbar,
    History,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch("fetchPokemon");
    },
  },
};
</script>
