<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center w-100"
  >
    <img
      class="loading-logo"
      src="https://pngimg.com/uploads/pokeball/pokeball_PNG24.png"
      alt=""
      style="width: 100px;"
    />
    <div class="text">Loading, please wait...</div>
  </div>
</template>

<style lang="scss">
@keyframes heartbeat {
  0% {
    transform: scale(0.75);
  }

  20% {
    transform: scale(1);
  }

  40% {
    transform: scale(0.75);
  }

  60% {
    transform: scale(1);
  }

  80% {
    transform: scale(0.75);
  }

  100% {
    transform: scale(0.75);
  }
}

.loading-logo {
  animation: heartbeat 1s infinite;
}
</style>
