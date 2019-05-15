<template>
  <div id="app">
    <h1>Airports</h1>
    <Decoration color="red" />
    <Decoration color="orange" />
    <Decoration color="yellow" />
    <AirportTable
      :selected-airport="selectedAirport"
      @select-airport="selectedAirport = $event"
    />
    <Decoration color="green" />
    <Decoration color="blue" />
    <Decoration color="purple" />
    <SelectedAirport
      v-if="selectedAirport"
      :selected-airport="selectedAirport"
      @click.native="selectedAirport = null"
    />
  </div>
</template>

<script>
import AirportTable from "./components/AirportTable.vue";
import Decoration from "./components/Decoration.vue";
import SelectedAirport from "./components/SelectedAirport.vue";

export default {
  components: {
    AirportTable,
    Decoration,
    SelectedAirport
  },
  data() {
    return {
      selectedAirport: null
    };
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  background-color: $color--eerie-black;
  color: white;
  margin: 0;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  font-family: $font-family--primary;
  font-size: $font-size--large;
  font-weight: 400;
  text-transform: uppercase;
}
</style>
