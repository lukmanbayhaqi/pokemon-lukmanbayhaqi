<template>
  <b-modal id="history" title="History Log" centered hide-footer>
    <div class="px-2" v-for="(history, i) in returnHistoryList" :key="i">
      <p class="mb-2 break-word">{{ history.detail }}</p>
      <small class="date-from-now">
        {{ convertTimeFromNow(history.date) }}
      </small>
      <hr />
    </div>
  </b-modal>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    returnHistoryList() {
      return this.$store.state.historyList.slice().reverse();
    },
  },
  methods: {
    convertTimeFromNow(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<style lang="scss">
.modal-body {
  max-height: 75vh;
  overflow: auto;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(31, 60, 128, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(31, 60, 128, 0.4);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(31, 60, 128, 0.8);
  }
}

.date-from-now {
  font-size: 10px;
  opacity: 0.7;
}
</style>
