<template>
  <q-card class="q-pa-sm q-gutter-sm" flat bordered>
    <q-card-section>
      <div class="text-h3 text-bold text-center text-blue-7 q-ml-sm">
        Prikaz aukcije
        <div class="q-ml-sm flex justify-end q-gutter-sm">
          <q-btn size="15px" name="send" rel="stylesheet" to="/" color="red" label="Natrag" />
        </div>
      </div>
    </q-card-section>
    <q-separator color="red" />
    <div class="q-ml-sm flex flex-start q-gutter-sm">
      <div style="width: 500px">
        <q-field rounded filled label="Naziv proizvoda" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ item.naziv_predmeta }}
            </div>
          </template>
        </q-field>
      </div>
      <div style="width: 500px">
        <q-field rounded filled label="Početna cijena proizvoda" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ item.pocetna_cijena + "$" }}
            </div>
          </template>
        </q-field>
      </div>
    </div>
    <div class="q-pa-sm col flex flex-start q-gutter-sm">
      <div class="row flex flex-center">
        <div style="width: 600px">
          <q-card-section class="q-pt-none">
            <template v-if="!showSingleImage && item.slike && item.slike.length > 1">
              <q-carousel control-color="black" animated v-model="slide" navigation infinite :autoplay="autoplay" arrows transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false" @mouseleave="autoplay = true">
                <q-carousel-slide :key="index" v-for="(image, index) in item.slike" :name="index + startingIndex">
                  <q-img :src="image" />
                </q-carousel-slide>
              </q-carousel>
            </template>
            <template v-else>
              <q-img v-if="showSingleImage" :src="item.slike ? item.slike[0] : item.slika" />
            </template>
          </q-card-section>
        </div>
      </div>
      <div class="q-ml-sm col flex flex-start q-gutter-sm">
        <div style="width: 400px">
          <q-field rounded filled label="Početno vrijeme aukcije" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formattedDate(item.vrijeme_pocetka) }}
              </div>
            </template>
          </q-field>
        </div>

        <div style="width: 400px">
          <q-field rounded filled label="Završno vrijeme aukcije" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formattedDate(item.vrijeme_zavrsetka) }}
              </div>
            </template>
          </q-field>
        </div>
        <div style="width: 600px">
          <q-field rounded filled label="Opis proizvoda" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ item.opis_predmeta }}
              </div>
            </template>
          </q-field>
        </div>
        <div style="width: 400px">
          <q-field rounded filled label="Trenutna cijena " stack-label>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ item.trenutna_cijena + "$" }}
            </div>
          </q-field>
        </div>
      </div>
    </div>
  </q-card>
  <div class="q-pa-md flex flex-center">
    <q-btn label="Ponuda" color="primary" @click="showDialog = true" />
    <q-dialog v-model="showDialog">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Ponudi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select rounded outlined v-model="odabranaCijena" :options="prices" label="Odaberi cijenu" />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Potvrdi ponudu" @click="potvrdiPonudu" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { jwtDecode } from "jwt-decode";
import { ref } from "vue";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";

export default {
  computed: {
    id_predmeta() {
      return this.$route.query.id_predmeta;
    },

    startingIndex() {
      return 2;
    },
  },
  data() {
    return {
      item: [],
      showDialog: false,
      odabranaCijena: null,
      prices: [],
      potvrdjenaCijena: null,
      predmet: {
        id_ponude: null,
        vrijednost_ponude: null,
        vrijeme_ponude: null,
        id_korisnika: null,
        id_predmeta: null,
      },
      slike: [],
      showSingleImage: false,
      index: 1,
    };
  },
  mounted() {
    axios.get(baseUrl + "get-predmet/" + this.id_predmeta, {}).then((response) => {
      this.item = response.data[0];
      this.potvrdjenaCijena = this.item.pocetna_cijena;
      this.item.trenutna_cijena = this.item.pocetna_cijena;
      if (this.item.slike && this.item.slike.length > 0) {
        if (this.item.slike.length === 1) {
          // If there's only one image, showSingleImage should be true
          this.showSingleImage = true;
          this.item.slika = this.item.slike[0];
        } else {
          // If there are multiple images, showSingleImage should be false
          this.showSingleImage = false;
        }
      }
    });

    axios.get(baseUrl + "get-predmet-trenutna-cijena/" + this.id_predmeta, {}).then((response) => {
      if (response.data.max_vrijednost_ponude != null) {
        this.item.trenutna_cijena = response.data.max_vrijednost_ponude;
      }
      this.prices = [
        {
          label: (this.item.trenutna_cijena * 1.1).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 1.1).toFixed(2),
        },
        {
          label: (this.item.trenutna_cijena * 1.2).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 1.2).toFixed(2),
        },
        {
          label: (this.item.trenutna_cijena * 1.3).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 1.3).toFixed(2),
        },
        {
          label: (this.item.trenutna_cijena * 1.4).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 1.4).toFixed(2),
        },
        {
          label: (this.item.trenutna_cijena * 1.5).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 1.5).toFixed(2),
        },
        {
          label: (this.item.trenutna_cijena * 2).toFixed(2) + " $",
          value: (this.item.trenutna_cijena * 2).toFixed(2),
        },
      ];
    });
  },

  methods: {
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },
    potvrdiPonudu() {
      // Get the JWT token from local storage
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const decodedToken = jwtDecode(token);

      console.log(this.odabranaCijena.value);
      if (this.odabranaCijena) {
        // Increase the current price based on the selected value
        const selectedPrice = parseInt(this.odabranaCijena.value);

        if (selectedPrice > this.item.trenutna_cijena) {
          const currentDate = new Date();
          const formattedTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

          const podaciPonude = {
            id_predmeta: this.id_predmeta,
            vrijednost_ponude: selectedPrice,
            vrijeme_ponude: formattedTime,
            id_korisnika: decodedToken.id,
          };

          axios
            .post("http://localhost:3000/unostrenutnaponuda", podaciPonude, { headers })
            .then((response) => {
              console.log("New price stored successfully:", response.data);
              // Handle the response data
            })
            .catch((error) => {
              console.error("Error storing new price:", error);
              // Handle the error
            });
          // Update the displayed price
          this.item.trenutna_cijena = selectedPrice;
          // Close the dialog
          this.showDialog = false;
        }
      }
    },
  },

  setup() {
    return {
      date: ref("2023-03-27 12:44"),
      date2: ref("2023-03-27 12:44"),
      slide: ref(2),
      autoplay: ref(false),
    };
  },
};
</script>
