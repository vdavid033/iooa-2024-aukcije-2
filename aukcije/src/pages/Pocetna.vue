<template>
  <q-card>
    <div class="row justify-center q-pa-md">
      <q-input v-model="Pretrazivanje" filled placeholder="Pretraži aukcije" dense class="q-input--width " />
      <div style="width: 227px">
        <q-select filled dense lazy-rules emit-value v-model="selectedsortianje" label="Sortiraj po" :options="sortiranje" option-label="label" option-value="value" map-options @update:model-value="sortiranjeOpcija" class="custom-height" />
      </div>
    </div>
    <q-separator class="separator" />
    <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px">Kategorije </q-item>
    <div class="q-pa-sm row flex flex-center">
      <div v-for="item in kategorija" :key="item.id_kategorije" class="q-pa-md" style="width: 400px">
        <q-card @click="navigateToItem1(item.id_kategorije)">
          <q-item-section>
            <q-item class="q-pa-sm text-bold text-blue-7">{{ item.naziv_kategorije }} </q-item>
          </q-item-section>
        </q-card>
      </div>
    </div>

    <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px">Zadnje ili trenutne aukcije </q-item>
    <div class="q-pa-sm row flex flex-center">
      <div v-for="item in filteredItems" :key="item.id_predmeta" class="q-pa-md" style="width: 400px;">
        <q-card @click="navigateToItem(item.id_predmeta)">
          <q-img v-if="item.slika" :src="item.slika" no-native-menu />
          <q-item-section>
            <q-item class="q-pa-sm text-bold text-blue-7">{{ item.naziv_predmeta }} </q-item>
            <q-item>Početna cijena: {{ item.pocetna_cijena }}$</q-item>
            <q-item>Vrijeme pocetka: {{ formattedDate(item.vrijeme_pocetka) }}</q-item>
            <q-item>Vrijeme zavrsetka: {{ formattedDate(item.vrijeme_zavrsetka) }}</q-item>
            <q-item>Preostalo vrijeme aukcije: {{ item.preostalo_vrijeme }} h </q-item>
            <q-item>Trenutna cijena: {{ item.trenutna_cijena }}$</q-item>
          </q-item-section>
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script>
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      Pretrazivanje: "",
      items: [],
      kategorija: [],
      selectedsortianje: "",
      sortiranje: [
        { label: "Cijena: manja prema većoj", value: "price-asc" },
        { label: "Cijena: veća prema manjoj", value: "price-desc" },
        { label: "Naziv: A do Z", value: "name-asc" },
        { label: "Naziv: Z do A", value: "name-desc" },
        { label: "Vrijeme isteka", value: "expiration" },
      ],
    };
  },
  mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    // Make the request to fetch all-predmet
    axios
      .get(baseUrl + "all-predmet", { headers })
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error("Error fetching all-predmet:", error);
        // Handle errors as needed
      });

    // Fetch all-kategorija without token
    axios
      .get(baseUrl + "all-kategorija", { headers })
      .then((response) => {
        this.kategorija = response.data;
      })
      .catch((error) => {
        console.error("Error fetching all-kategorija:", error);
        // Handle errors as needed
      });
  },

  computed: {
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

  methods: {
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },

    navigateToItem(id_predmeta) {
      this.$router.push({ path: "prikaz", query: { id_predmeta } });
    },
    navigateToItem1(id_kategorije) {
      this.$router.push({ path: "kategorija", query: { id_kategorije } });
    },
    sortiranjeOpcija(selectedsortianje) {
      switch (selectedsortianje) {
        case "price-asc":
          this.items.sort((a, b) => a.pocetna_cijena - b.pocetna_cijena);
          break;
        case "price-desc":
          this.items.sort((a, b) => b.pocetna_cijena - a.pocetna_cijena);
          break;
        case "name-asc":
          this.items.sort((a, b) => a.naziv_predmeta.localeCompare(b.naziv_predmeta));
          break;
        case "name-desc":
          this.items.sort((a, b) => b.naziv_predmeta.localeCompare(a.naziv_predmeta));
          break;
        case "expiration":
          this.items.sort((a, b) => new Date(a.vrijeme_zavrsetka) - new Date(b.vrijeme_zavrsetka));
          break;
      }
    },
  },
};
</script>
<style>
/*.q-carousel {
    height: 300px;
    max-width: 500px;*/
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
