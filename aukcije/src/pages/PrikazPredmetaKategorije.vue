<template>

  <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px"
  ></q-item
  >
  <div class="q-pa-sm row flex flex-center">
    <div
        v-for="item in items"
        :key="item.sifra_predmeta"
        class="q-pa-md"
        style="width: 400px"
    >

      <q-card @click = "navigateToItem(item.sifra_predmeta)">
        <q-img :src="item.slika" no-native-menu />
        <q-item-section>

          <q-item class="q-pa-sm text-bold text-blue-7">{{
              item.naziv_predmeta
            }}</q-item>
          <q-item>Početna cijena: {{ item.pocetna_cijena }}$</q-item>
          <q-item>Vrijeme zavrsetka: {{ formattedDate(item.vrijeme_zavrsetka) }}</q-item>
          <q-item
          >Preostalo vrijeme aukcije: {{ isNegativeDatetime(item.preostalo_vrijeme) ? "Isteklo" :  item.preostalo_vrijeme + " h"  }} </q-item
          >
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
    sifra_kategorije() {
      return this.$route.query.sifra_kategorije;
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
      items:[],
    };
  },
  mounted() {
    axios
        .get(baseUrl + "get-kategorija-predmet/" + this.sifra_kategorije, {})
        .then((response) => {
          this.items = response.data;
        });
  },

  methods: {
      isNegativeDatetime(datetimeStr) {
          return datetimeStr.charAt(0) === '-';
      },
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString('hr-HR').replace(',', '');
    },
    navigateToItem (sifra_predmeta){
      this.$router.push({ path: 'prikaz', query: { sifra_predmeta } });
    },
  }
};
</script>
<style>
.q-img {
  height: 300px;
  max-width: 500px;
}
</style>
