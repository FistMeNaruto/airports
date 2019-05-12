<template>
  <div class="airport-table">
    <div class="header" ref="header">
      <div class="th">ICAO Code</div>
      <div class="th wide">Name</div>
      <div class="th text-center">Country</div>
      <div class="th text-center">Continent</div>
      <div class="th text-center">Elevation, ft</div>
      <div class="th text-right">Type</div>
    </div>
    <RecycleScroller
      class="scroller"
      :items="airports"
      :item-size="33"
      key-field="ident"
      v-slot="{ item }"
      @resize="resizeHeader"
      ref="scroller"
    >
      <div class="airport">
        <div class="td">{{ item.ident }}</div>
        <div class="td wide">{{ item.name }}</div>
        <div class="td text-center">{{ item.iso_country }}</div>
        <div class="td text-center">{{ item.continent }}</div>
        <div class="td text-center">
          {{ item.elevation_ft ? item.elevation_ft : "-" }}
        </div>
        <div class="td text-right">{{ types[item.type] }}</div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airports: [],
      types: {
        heliport: "Heliport",
        small_airport: "Small airport",
        medium_airport: "Medium airport",
        large_airport: "Large airport",
        balloonport: "Balloonport",
        closed: "Closed",
        seaplane_base: "Seaplane base"
      }
    };
  },
  mounted() {
    this.axios
      .get("https://datahub.io/core/airport-codes/r/airport-codes.json")
      .then(response => {
        this.airports = response.data;
      });
  },
  methods: {
    resizeHeader() {
      this.$refs.header.style.width = `${
        this.$refs.scroller.$refs.wrapper.offsetWidth
      }px`;
    },
    mapType(type) {
      return this.types[type];
    }
  }
};
</script>

<style scoped lang="scss">
.airport-table {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 20px 0;
  font-family: $font-family--secondary;
}

.scroller {
  height: 450px;
}

.header {
  font-weight: 600;
  font-size: $font-size--xregular;
  display: flex;
  border-bottom: 1px solid $color--platinum;
}

.airport {
  display: flex;
}

.th,
.td {
  flex: 1;
  text-align: left;
  min-width: 130px;
  padding: 5px;
}

.th {
  display: flex;
  align-items: flex-end;
  font-weight: 700;
}

.td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.text-right {
  text-align: right;
  justify-content: right;
}

.wide {
  flex-grow: 2;
}
</style>
