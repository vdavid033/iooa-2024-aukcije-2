<template>
  <div class="row justify-center q-pa-md">
    <q-input v-model="Pretrazivanje" filled placeholder="Pretraži aukcije" dense class="q-input--width" />
    <div style="width: 227px">
        <q-select
          filled
          lazy-rules
          emit-value
          v-model="selectedsortianje"
          label="Sortiraj po"
          :options="sortiranje"
          option-label="label"
          option-value="value"
          map-options
          @update:model-value="sortiranjeOpcija"
        />
      </div>
  </div>
  <q-separator class="separator" />
  <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px"></q-item>
  <div class="q-pa-sm row flex flex-center">
    <div v-for="item in filteredItems" :key="item.id_predmeta" class="q-pa-md" style="width: 400px">
      <q-card @click="navigateToItem(item.id_predmeta)">
        <q-img v-if="item.slika" :src="item.slika" no-native-menu />
        <q-item-section>
          <q-item class="q-pa-sm text-bold text-blue-7">{{ item.naziv_predmeta }}</q-item>
          <q-item>Početna cijena: {{ item.pocetna_cijena }}$</q-item>
          <q-item>Vrijeme zavrsetka: {{ formattedDate(item.vrijeme_zavrsetka) }}</q-item>
          <q-item>Preostalo vrijeme aukcije: {{ isNegativeDatetime(item.preostalo_vrijeme) ? "Isteklo" : item.preostalo_vrijeme + " h" }} </q-item>
        </q-item-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";

export default {
  computed: {
    id_kategorije() {
      return this.$route.query.id_kategorije;
    },
    filteredItems() {
      if (!this.Pretrazivanje) return this.items;

      // Create a map to store unique attractions
      const uniqueItemsMap = new Map();

      // Filter items based on search query and ensure uniqueness
      this.items.forEach((item) => {
        // Check if the attraction is already in the map
        if (!uniqueItemsMap.has(item.id_predmeta) && item.naziv_predmeta.toLowerCase().includes(this.Pretrazivanje.toLowerCase())) {
          // If not, add it to the map
          uniqueItemsMap.set(item.id_predmeta, item);
        }
      });

      // Convert map values back to array
      return Array.from(uniqueItemsMap.values());
    },
  },

  setup() {
    return {
      date: ref("2023-03-27 12:44"),
      date2: ref("2023-03-27 12:44"),
      dialog: ref(false),
      small: ref(false),
      model: ref(null),
    };
  },

  data() {
    return {
      Pretrazivanje: "",
      items: [],
      selectedsortianje: "",
      sortiranje: [
        { label: 'Cijena: manja prema većoj', value: 'price-asc' },
        { label: 'Cijena: veća prema manjoj', value: 'price-desc' },
        { label: 'Naziv: A do Z', value: 'name-asc' },
        { label: 'Naziv: Z do A', value: 'name-desc' },
        { label: 'Vrijeme isteka', value: 'expiration' },
      ]
    };
  },

  mounted() {
    axios.get(baseUrl + "get-kategorija-predmet/" + this.id_kategorije, {}).then((response) => {
      this.items = response.data;
    });
  },

  methods: {
    isNegativeDatetime(datetimeStr) {
      return datetimeStr.charAt(0) === "-";
    },
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },
    navigateToItem(id_predmeta) {
      this.$router.push({ path: "prikaz", query: { id_predmeta } });
    },
    sortiranjeOpcija(selectedsortianje) {
      switch (selectedsortianje) {
        case 'price-asc':
          this.items.sort((a, b) => a.pocetna_cijena - b.pocetna_cijena);
          break;
        case 'price-desc':
          this.items.sort((a, b) => b.pocetna_cijena - a.pocetna_cijena);
          break;
        case 'name-asc':
          this.items.sort((a, b) => a.naziv_predmeta.localeCompare(b.naziv_predmeta));
          break;
        case 'name-desc':
          this.items.sort((a, b) => b.naziv_predmeta.localeCompare(a.naziv_predmeta));
          break;
        case 'expiration':
          this.items.sort((a, b) => new Date(a.vrijeme_zavrsetka) - new Date(b.vrijeme_zavrsetka));
          break;
      }
    },
  },
};
</script>

<style>
.q-img {
  height: 300px;
  max-width: 500px;
}

.q-input--width {
  width: 500px;
}

.separator {
  background-color: #1976d2;
}
</style>
