<template>
  <q-card>
    <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px"
      >Kategorije
    </q-item>
    <div class="q-pa-sm row flex flex-center">
      <div
        v-for="item in kategorija"
        :key="item.sifra_kategorije"
        class="q-pa-md"
        style="width: 400px"
      >
        <q-card @click="navigateToItem1(item.sifra_kategorije)">
          <q-item-section>
            <q-item class="q-pa-sm text-bold text-blue-7"
              >{{ item.naziv_kategorije }}
            </q-item>
          </q-item-section>
        </q-card>
      </div>
    </div>
  </q-card>

  <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px"
    >Zadnje ili trenutne aukcije
  </q-item>
  <div class="q-pa-sm row flex flex-center">
    <div
      v-for="item in items"
      :key="item.sifra_predmeta"
      class="q-pa-md"
      style="width: 400px"
    >
      <q-card @click="navigateToItem(item.sifra_predmeta)">
        <q-img :src="item.slika" no-native-menu />
        <q-item-section>
          <q-item class="q-pa-sm text-bold text-blue-7"
            >{{ item.naziv_predmeta }}
          </q-item>
          <q-item>Početna cijena: {{ item.pocetna_cijena }}$</q-item>
          <q-item
            >Vrijeme zavrsetka:
            {{ formattedDate(item.vrijeme_zavrsetka) }}</q-item
          >
          <q-item
            >Preostalo vrijeme aukcije: {{ item.preostalo_vrijeme }} h
          </q-item>
          <q-item>Trenutna cijena: {{ item.trenutna_cijena }}$</q-item>
        </q-item-section>
      </q-card>
    </div>
  </div>
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
      items: [],
      kategorija: [],
    };
  },
  mounted() {
    axios.get(baseUrl + "all-predmet-with-current-price").then((response) => {
      this.items = response.data;
    });
    axios.get(baseUrl + "all-kategorija").then((response) => {
      this.kategorija = response.data;
    });
  },

  methods: {
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },

    navigateToItem(sifra_predmeta) {
      this.$router.push({ path: "prikaz", query: { sifra_predmeta } });
    },
    navigateToItem1(sifra_kategorije) {
      this.$router.push({ path: "kategorija", query: { sifra_kategorije } });
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
</style>
