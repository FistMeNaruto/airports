<template>
  <div class="airport-table">
    <Loader v-if="isLoading" />
    <div class="header" ref="header">
      <div
        class="th"
        :class="{
          sort: currentSort === 'ident',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('ident')"
      >
        ICAO Code
      </div>
      <div
        class="th wide"
        :class="{
          sort: currentSort === 'name',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('name')"
      >
        Name
      </div>
      <div
        class="th text-center"
        :class="{
          sort: currentSort === 'iso_country',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('iso_country')"
      >
        Country
      </div>
      <div
        class="th text-center"
        :class="{
          sort: currentSort === 'continent',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('continent')"
      >
        Continent
      </div>
      <div
        class="th text-center"
        :class="{
          sort: currentSort === 'elevation_ft',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('elevation_ft')"
      >
        Elevation, ft
      </div>
      <div
        class="th text-right"
        :class="{
          sort: currentSort === 'type',
          desc: currentSortDir === 'desc'
        }"
        @click="sort('type')"
      >
        Type
      </div>
    </div>
    <RecycleScroller
      class="scroller"
      :items="sortedAirports"
      :item-size="33"
      key-field="ident"
      v-slot="{ item }"
      @resize="resizeTable"
      ref="scroller"
      v-if="!isLoading"
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
import Loader from "./Loader";

export default {
  components: {
    Loader
  },
  data() {
    return {
      isLoading: true,
      airports: [],
      types: {
        heliport: "Heliport",
        small_airport: "Small airport",
        medium_airport: "Medium airport",
        large_airport: "Large airport",
        balloonport: "Balloonport",
        closed: "Closed",
        seaplane_base: "Seaplane base"
      },
      currentSort: "ident",
      currentSortDir: "asc"
    };
  },
  computed: {
    sortedAirports() {
      const airports = this.airports;
      return airports.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        // equal
        return 0;
      });
    }
  },
  mounted() {
    this.axios
      .get("https://datahub.io/core/airport-codes/r/airport-codes.json")
      .then(response => {
        this.airports = response.data.map(airport => {
          return {
            ident: airport.ident,
            name: airport.name,
            iso_country: airport.iso_country,
            continent: airport.continent,
            elevation_ft: parseInt(airport.elevation_ft, 10),
            type: airport.type
          };
        });
        this.isLoading = false;
      });
  },
  methods: {
    resizeTable() {
      this.$refs.header.style.width = `${
        this.$refs.scroller.$refs.wrapper.offsetWidth
      }px`;

      this.$refs.scroller.$el.style.height = `${this.$el.offsetHeight -
        this.$refs.header.offsetHeight}px`;
    },
    sort(column) {
      if (column === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = column;
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
  position: relative;
}

.scroller {
  height: 300px;
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
  cursor: pointer;
  user-select: none;

  &.sort::after {
    content: "";
    width: 10px;
    height: 10px;
    margin: auto 0 auto 10px;
    transform: rotate(45deg);
    border-bottom: 2px solid $color--platinum;
    border-right: 2px solid $color--platinum;
  }

  &.sort.desc::after {
    transform: rotate(-135deg);
  }
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
