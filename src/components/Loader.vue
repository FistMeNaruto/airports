<template>
  <div class="loader">
    <div class="first"></div>
    <div class="second"></div>
    <div class="third"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 1;

  .first,
  .second,
  .third {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: red;
    animation: breath 1s alternate infinite;
  }

  .second {
    width: 40px;
    height: 40px;
    background-color: yellow;
    animation-delay: 0.2s;
  }

  .third {
    width: 20px;
    height: 20px;
    background-color: blue;
    animation-delay: 0.4s;
  }
}

@keyframes breath {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.4);
  }
}
</style>
