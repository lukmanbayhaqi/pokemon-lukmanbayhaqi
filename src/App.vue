<template>
  <div id="app">
    <navbar />
    <b-container class="p-5" id="app-container" fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";

export default {
  components: {
    Navbar,
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
