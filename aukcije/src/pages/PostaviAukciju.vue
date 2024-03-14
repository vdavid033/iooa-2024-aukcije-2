<template>
  <q-card class="q-pa-sm q-gutter-sm" flat bordered>
    <q-card-section>
      <div class="text-h3 text-bold text-center text-blue-7 q-ml-sm">
        Postavi aukciju
        <div class="q-ml-sm flex justify-end q-gutter-sm">
          <q-btn
            size="15px"
            name="send"
            rel="stylesheet"
            to="/IndexPage"
            color="red"
            label="Natrag"
          />
        </div>
      </div>
    </q-card-section>
    <q-separator color="red" />
    <div class="q-ml-sm flex flex-start q-gutter-sm">
      <div style="width: 500px">
        <q-input
          ref="nazivPredmetaRef"
          filled
          type="text"
          label="Naziv proizvoda"
          v-model="naziv_predmeta"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || 'Unesite naziv']"
        />
      </div>
      <div style="width: 500px">
        <q-select
          ref="selectedCategory1Ref"
          filled
          type="int"
          lazy-rules
          emit-value
          v-model="selectedCategory1"
          label="Kategorija"
          :options="categories"
          option-label="name"
          option-value="value"
          :rules="[
            (val) => (val !== null && val !== '') || 'Odaberite kategoriju',
          ]"
        />
      </div>
      <div style="width: 500px">
        <q-input
          ref="pocetnaCijenaRef"
          filled
          type="double"
          label="Početna cijena proizvoda"
          v-model="pocetna_cijena"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesite početnu cijenu',
          ]"
        />
      </div>
      <div style="width: 500px">
        <q-select
          ref="selectedCategory2Ref"
          filled
          type="text"
          lazy-rules
          v-model="selectedCategory2"
          label="Svrha"
          :options="svrha"
          emit-value
          option-label="name"
          option-value="value"
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Odaberite humanitarnu svrhu aukcije',
          ]"
        />
      </div>
      <div style="width: 500px">
        <q-select
          ref="selectedCategory3Ref"
          filled
          type="integer"
          lazy-rules
          emit-value
          v-model="selectedCategory3"
          label="Korisnik"
          :options="korisnik"
          option-label="name"
          option-value="value"
          :rules="[
            (val) => (val !== null && val !== '') || 'Odaberite korisnika',
          ]"
        />
      </div>
    </div>
    <div class="q-ml-sm flex flex-start q-gutter-sm">
      <div style="width: 300px">
        <q-input filled v-model="vrijemePocetka" label="Datum i vrijeme početka aukcije">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm" ref="datePicker">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div style="width: 300px">
        <q-input
          filled
          v-model="vrijemeZavrsetka"
          label="Datum i vrijeme završetka aukcije"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date2" mask="YYYY-MM-DD HH:mm" ref="datePicker">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="date2" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div style="width: 500px">
      <q-input
        ref="opisPredmetaRef"
        filled
        type="text"
        label="Opis proizvoda"
        v-model="opis_predmeta"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Unesite opis']"
      />
    </div>

    <div>
      <input type="file" @change="onFileChange" />

      <q-btn @click="convertImage">Spremi sliku</q-btn>
      <q-separator></q-separator>
      <div v-if="base64Image">
        <img :src="base64Image" />
        <q-separator></q-separator>

        <div
          class="q-pa-sm"
          style="max-width: 700px; overflow-wrap: break-word"
        ></div>
      </div>

      <div>
        <q-separator></q-separator>
      </div>
    </div>
    <div class="q-ml-sm flex justify-center q-gutter-sm">
      <q-btn
        label="Postavi"
        @click="submitForm"
        color="green"
        class="q-ml-sm"
      />
      <q-btn label="Otkaži" type="submit" color="red" class="q-ml-sm" />
    </div>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section> Predmet je uspješno dodan! </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="primary"
            v-close-popup
            @click="closeAndReload"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import imageCompression from "browser-image-compression";
import axios from "axios";

export default {
  data() {
    return {
      sifra_predmeta: null,
      naziv_predmeta: "",
      opis_predmeta: "",
      selectedCategory1: null,
      selectedCategory2: null,
      selectedCategory3: null,
      pocetna_cijena: "",
      slika: null,
      file: null,
      base64Image: null,
      base64Text: null,
      imageUrl: "",
      showDialog: false,
      vrijemePocetka: null,
      vrijemeZavrsetka: null,

      categories: [
        { name: "Namjestaj", value: "1" },
        { name: "Automobili", value: "2" },
        { name: "Nakit", value: "3" },
        { name: "Ostalo", value: "4" },
      ],
      svrha: [
        { name: "Za osobe pogođene potresom", value: "Potres" },
        { name: "Za osobe pogođene poplavom", value: "Poplava" },
        { name: "Za osobe pogođene požarom", value: "Požar" },
        { name: "Ostalo", value: "ostalo" },
      ],
      korisnik: [
        { name: "Masimo", value: "1" },
        { name: "Emil", value: "2" },
        { name: "Dorijan", value: "3" },
        { name: "Dario", value: "4" },
      ],
    };
  },
  methods: {
    async onFileChange(e) {
      this.file = e.target.files[0];
      await this.convertImage();
    },
    async convertImage() {
      if (!this.file && !this.imageUrl) {
        return alert("Molimo odaberite sliku ili unesite URL slike.");
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        let compressedFile;

        if (this.imageUrl) {
          const response = await fetch(this.imageUrl);
          const blob = await response.blob();
          compressedFile = await imageCompression(blob, options);
        } else {
          compressedFile = await imageCompression(this.file, options);
        }

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          this.base64Image = reader.result;
          this.base64Text = reader.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          this.slika = "data:image/jpg;base64," + this.base64Text;
        };
        reader.onerror = (error) => {
          console.error(error);
        };
      } catch (error) {
        console.error(error);
        return alert("Došlo je do pogreške prilikom kompresije slike.");
      }
    },

    closeAndReload() {
      this.showDialog = false;
      window.location.reload();
    },

    async submitForm() {
      const sampleData = {
        sifra_predmeta: this.sifra_predmeta,
        naziv_predmeta: this.naziv_predmeta,
        opis_predmeta: this.opis_predmeta,
        slika: this.slika,
        vrijeme_pocetka: this.vrijemePocetka,
        vrijeme_zavrsetka: this.vrijemeZavrsetka,
        pocetna_cijena: this.pocetna_cijena,
        svrha_donacije: this.selectedCategory2,
        id_korisnika: this.selectedCategory3,
        sifra_kategorije: this.selectedCategory1,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/unosPredmeta",
          sampleData
        );
        console.log(response.data);
        this.showDialog = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    this.vrijemePocetka = now.toISOString().slice(0, 16);
    this.vrijemeZavrsetka = this.vrijemePocetka;
  },
};
</script>