<template>
  <div
    class="decoration"
    :style="{ backgroundColor: color, color: color }"
  ></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.decoration {
  position: relative;
  height: 5px;
  width: 100%;
  margin: 10px 0;
  flex-shrink: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 10px;
    width: 40%;
    max-width: 300px;
    background-color: currentColor;
  }

  &::after {
    width: 20%;
    height: 15px;
    max-width: 200px;
  }
}
</style>
