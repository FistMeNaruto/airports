<template>
  <aside class="selected-airport">
    <div><b>ICAO: </b>{{ selectedAirport.ident }}</div>
    <div><b>Name: </b>{{ selectedAirport.name }}</div>
    <div><b>Type: </b>{{ selectedAirport.type }}</div>
  </aside>
</template>

<script>
export default {
  props: {
    selectedAirport: {
      type: Object,
      required: false
    }
  }
};
</script>

<style lang="scss">
.selected-airport {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border: 2px solid $color--platinum;
  cursor: url("~@/assets/img/close.svg"), crosshair;
}
</style>
