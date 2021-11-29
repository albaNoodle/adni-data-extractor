<template>
  <div class="VueToNuxtLogo">
    <img src="~/assets/adni-logo.png" />
  </div>
</template>

<style>
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(0deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}

@keyframes turn {
  50% {
    transform: rotateX(180deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}
</style>
