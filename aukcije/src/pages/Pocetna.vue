<template>
  <q-card>
    <div class="row justify-center q-pa-md">
      <q-input v-model="Pretrazivanje" filled placeholder="Pretraži aukcije" dense class="q-input--width" />
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
      <div v-for="item in filteredItems" :key="item.id_predmeta" class="q-pa-md" style="width: 400px">
        <q-card @click="navigateToItem(item.id_predmeta)">
          <q-img v-if="item.slika" :src="'data:image/jpeg;base64,' + item.slika" no-native-menu />
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
    };
  },
  mounted() {
    axios.get(baseUrl + "all-predmet").then((response) => {
      this.items = response.data;
    });
    axios.get(baseUrl + "all-kategorija").then((response) => {
      this.kategorija = response.data;
    });
  },

  computed: {
    filteredItems() {
      if (!this.Pretrazivanje) return this.items;
      return this.items.filter((item) => item.naziv_predmeta.toLowerCase().includes(this.Pretrazivanje.toLowerCase()));
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
