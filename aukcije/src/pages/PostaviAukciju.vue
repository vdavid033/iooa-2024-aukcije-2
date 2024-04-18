<template>
  <q-card class="q-pa-sm q-gutter-sm" flat bordered>
    <q-card-section>
      <div class="text-h3 text-bold text-center text-blue-7 q-ml-sm">
        Postavi aukciju
        <div class="q-ml-sm flex justify-end q-gutter-sm">
          <q-btn size="15px" name="send" rel="stylesheet" to="/IndexPage" color="red" label="Natrag" />
        </div>
      </div>
    </q-card-section>
    <q-separator color="red" />
    <div class="q-ml-sm flex flex-start q-gutter-sm">
      <div style="width: 500px">
        <q-input filled type="text" label="Naziv proizvoda" v-model="naziv_predmeta" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Unesite naziv']" />
      </div>
      <div style="width: 500px">
        <q-select filled lazy-rules emit-value v-model="selectedKategorija" label="Kategorija" :options="kategorije" option-label="label" option-value="value" map-options :rules="[(val) => (val !== null && val !== '') || 'Odaberite kategoriju']" />
      </div>
      <div style="width: 500px">
        <q-input ref="pocetnaCijenaRef" filled type="number" label="Početna cijena proizvoda" v-model="pocetna_cijena" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Unesite početnu cijenu (brojevi)']"> </q-input>
      </div>
      <div style="width: 500px">
        <q-select filled lazy-rules emit-value v-model="selectedKorisnik" label="Korisnik" :options="korisnik" option-label="label" option-value="value" map-options :rules="[(val) => (val !== null && val !== '') || 'Odaberite korisnika']" />
      </div>
    </div>
    <div class="q-ml-sm flex flex-start q-gutter-sm">
      <div style="width: 300px">
        <q-input filled v-model="vrijemePocetka" label="Datum i vrijeme početka aukcije">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="vrijemePocetka" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="vrijemePocetka" mask="YYYY-MM-DD HH:mm" format24h>
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
        <q-input filled v-model="vrijemeZavrsetka" label="Datum i vrijeme završetka aukcije">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="vrijemeZavrsetka" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="date_zavrsetak" mask="YYYY-MM-DD HH:mm" format24h>
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
      <q-input ref="opisPredmetaRef" filled type="text" label="Opis proizvoda" v-model="opis_predmeta" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Unesite opis']" />
    </div>

    <div>
      <input type="file" name="files" accept="image/*" @change="onFileChange" multiple />

      <q-separator></q-separator>
      <div v-if="base64Image">
        <img :src="base64Image" />
        <q-separator></q-separator>

        <div class="q-pa-sm" style="max-width: 700px; overflow-wrap: break-word"></div>
      </div>

      <div>
        <q-separator></q-separator>
      </div>
    </div>
    <div class="q-ml-sm flex justify-center q-gutter-sm">
      <q-btn label="Postavi" @click="submitForm" color="green" class="q-ml-sm" />
      <q-btn label="Otkaži" type="submit" color="red" class="q-ml-sm" />
    </div>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section> Predmet je uspješno dodan! </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="closeAndReload" />
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
      selectedKategorija: null,
      selectedKorisnik: null,
      pocetna_cijena: "",
      slika: null,
      file: null,
      base64Image: null,
      base64Text: null,
      imageUrl: "",
      showDialog: false,
      vrijemePocetka: null,
      vrijemeZavrsetka: null,

      kategorije: [],
      korisnik: [],
      files: [],
      base64Images: [],
    };
  },

  methods: {
    async onFileChange(e) {
      this.files = Array.from(e.target.files);
      await this.convertImage();
    },

    async convertImage() {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        this.base64Images = [];
        for (const file of this.files) {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();

          const promise = new Promise((resolve, reject) => {
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = (error) => reject(error);
          });

          reader.readAsDataURL(compressedFile);
          const base64String = await promise;
          this.base64Images.push(base64String);

          this.slika = base64String;
        }
      } catch (error) {
        console.error(error);
        alert("Došlo je do pogreške prilikom kompresije slika.");
      }
    },

    closeAndReload() {
      this.showDialog = false;
      window.location.reload();
    },

    async submitForm() {
      if (!this.files.length) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Molimo odaberite barem jednu sliku.",
          icon: "warning",
        });
        return;
      }

      const formData = new FormData();
      this.base64Images.forEach((base64String, index) => {
        formData.append(`file${index}`, base64String);
      });

      formData.append("id_predmeta", this.sifra_predmeta);
      formData.append("naziv_predmeta", this.naziv_predmeta);
      formData.append("opis_predmeta", this.opis_predmeta);
      formData.append("vrijeme_pocetka", this.vrijemePocetka);
      formData.append("vrijeme_zavrsetka", this.vrijemeZavrsetka);
      formData.append("pocetna_cijena", this.pocetna_cijena);
      formData.append("id_korisnika", this.selectedKorisnik);
      formData.append("id_kategorije", this.selectedKategorija);

      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem("token");

        // Set up the request headers to include the JWT token
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post("http://localhost:3000/unosPredmeta", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...headers, // Include the JWT token in the headers
          },
        });
        this.showDialog = true;
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    const now = new Date();
    now.setHours(now.getHours() + 2);
    this.vrijemePocetka = now.toISOString().slice(0, 16);
    this.vrijemeZavrsetka = this.vrijemePocetka;

    axios
      .get("http://localhost:3000/getUnosPredmeta", { headers })
      .then((response) => {
        this.kategorije = response.data.kategorije.map((kategorija) => ({
          label: kategorija.naziv_kategorije,
          value: kategorija.id_kategorije,
        }));
        this.korisnik = response.data.korisnici.map((korisnici) => ({
          label: korisnici.ime_korisnika,
          value: korisnici.id_korisnika,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>
