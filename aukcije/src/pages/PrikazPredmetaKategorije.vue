<template>
  <div class="row justify-center q-pa-md">
    <q-input v-model="Pretrazivanje" filled placeholder="Pretraži aukcije" dense class="q-input--width"/>
  </div>
  <q-separator class = "separator" />
  <q-item class="q-pa-sm text-bold text-blue-7" style="font-size: 30px"></q-item>
  <div class="q-pa-sm row flex flex-center">
    <div
        v-for="item in filteredItems"
        :key="item.id_predmeta"
        class="q-pa-md"
        style="width: 400px">

      <q-card @click = "navigateToItem(item.id_predmeta)">
        <q-img :src="item.slika" no-native-menu />

        <q-item-section>
          <q-item class="q-pa-sm text-bold text-blue-7">{{item.naziv_predmeta}}</q-item>
          <q-item>Početna cijena: {{ item.pocetna_cijena }}$</q-item>
          <q-item>Vrijeme zavrsetka: {{ formattedDate(item.vrijeme_zavrsetka) }}</q-item>
          <q-item>Preostalo vrijeme aukcije: {{ isNegativeDatetime(item.preostalo_vrijeme) ? "Isteklo" :  item.preostalo_vrijeme + " h"  }} </q-item>
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
        return this.items.filter(item =>
          item.naziv_predmeta.toLowerCase().includes(this.Pretrazivanje.toLowerCase())
        );
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
        Pretrazivanje: '',
        items:[],
      };
    },

    mounted() {
      axios
          .get(baseUrl + "get-kategorija-predmet/" + this.id_kategorije, {})
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
      navigateToItem (id_predmeta){
        this.$router.push({ path: 'prikaz', query: { id_predmeta } });
      },
    }
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
