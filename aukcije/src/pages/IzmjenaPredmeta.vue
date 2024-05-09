<template>
  <q-page style="margin-left: 2%; margin-right: 2%" window-height window-width>
    <div class="row">
      <h5 ref="h_predmet" class="text-h3 text-blue q-my-md">Naziv predmeta</h5>
    </div>
    <q-form @submit="provjeraPolja">
      <q-input v-model="predmet_novo.naziv_predmeta" label="Naziv" outlined dense type="text" />
      <p ref="p_naziv"></p>
      <q-select v-model="predmet_novo.id_kategorije" :options="kategorije" label="Kategorija" outlined dense />
      <p ref="p_kategorija"></p>
      <q-input v-model="predmet_novo.opis_predmeta" label="Opis" outlined dense type="text" />
      <p ref="p_opis"></p>
      <q-input v-model="predmet_novo.pocetna_cijena" label="Početna cijena" outlined dense type="text" />
      <p ref="p_pocCijena"></p>

      <div class="q-ml-sm flex flex-start q-gutter-sm">
        <div style="width: 300px">
          <q-input filled v-model="predmet_novo.vrijeme_pocetka" label="Datum i vrijeme početka aukcije">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="predmet_novo.vrijeme_pocetka" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="predmet_novo.vrijeme_pocetka" mask="YYYY-MM-DD HH:mm" format24h>
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
          <q-input filled v-model="predmet_novo.vrijeme_zavrsetka" label="Datum i vrijeme završetka aukcije">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="predmet_novo.vrijeme_zavrsetka" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="predmet_novo.vrijeme_zavrsetka" mask="YYYY-MM-DD HH:mm" format24h>
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

      <div style="height:25px"></div>
      <p ref="p_datumPoc"></p>
      <p ref="p_datumZavrs"></p>

      <q-btn type="submit" label="Izmijeni" color="primary" class="q-mt-md" />
    </q-form>

    <div style="height:25px"></div>
    <q-separator />

    <h5 class="text-h5 text-blue q-my-md">Upravljanje slikama</h5>
    <div style="width: 600px">
      <q-card-section class="q-pt-none">
        <template v-if="!showSingleImage && item.slike && item.slike.length > 1">
          <q-carousel control-color="black" animated v-model="slide" navigation infinite :autoplay="autoplay" arrows
            transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
            @mouseleave="autoplay = true">
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

    <q-btn type="submit" label="Obriši sliku" color="primary" class="q-my-md" @click="obrisiTrenutnuSliku()" />
    <p>Ovaj gumb briše sliku koja je trenutno prikazana iznad.</p>

    <div>
      <input class="" type="file" name="files" accept="image/*" @change="onFileChange" multiple />
      <q-btn type="submit" label="Dodaj nove slike" color="primary" class="q-my-md" @click="dodajNoveSlike()" />
    </div>

  </q-page>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import imageCompression from "browser-image-compression";
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
      showSingleImage: false,
      index: 1,
      predmet_novo: {
        naziv_predmeta: "",
        opis_predmeta: "",
        pocetna_cijena: "",
        vrijeme_pocetka: "",
        vrijeme_zavrsetka: "",
        id_kategorije: "",
      },
      kategorije: [],
      files: [],
      file: null,
      base64Images: [],
      vrijemePocetka: "",
      vrijemeZavrsetka: "",
    };
  },

  async mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    await this.dohvatiKategorije();
    await this.dohvatiPredmet();
    this.ispisiPodatke();
  },

  methods: {
    async dohvatiKategorije() {
      try {
        const response = await axios.get("http://localhost:3000/api/all-kategorija/");
        this.kategorije = response.data.map((kategorija) => ({
          label: kategorija.naziv_kategorije,
          key: kategorija.id_kategorije,
        }));

        //console.log("Kategorije:", this.kategorije);
      } catch (error) {
        console.error("Greška pri dohvatu kategorija", error);
      }
    },

    async dohvatiPredmet() {
      await axios.get("http://localhost:3000/api/get-predmet2/" + this.id_predmeta, {}).then((response) => {
        this.item = response.data[0];
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
    },

    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },

    async ispisiPodatke() {
      try {
        this.$refs.p_naziv.textContent = "Trenutni naziv predmeta: " + this.item.naziv_predmeta;
        this.$refs.p_opis.textContent = "Trenutni opis: " + this.item.opis_predmeta;
        this.$refs.p_pocCijena.textContent = "Trenutna početna cijena: " + this.item.pocetna_cijena;
        this.$refs.p_datumPoc.textContent = "Trenutni datum i vrijeme početka: " + this.formattedDate(this.item.vrijeme_pocetka);
        this.$refs.p_datumZavrs.textContent = "Trenutni datum i vrijeme završetka: " + this.formattedDate(this.item.vrijeme_zavrsetka);
        this.$refs.h_predmet.textContent = "Predmet " + this.item.naziv_predmeta;
        this.$refs.p_kategorija.textContent = "Trenutna kategorija: " + this.kategorije.find(kategorija => kategorija.key === this.item.id_kategorije)['label'];
      } catch (error) {
        console.error("Greška pri upisivanju podataka", error);
      }
    },

    provjeraPolja() {
      if (this.predmet_novo.naziv_predmeta == "" && this.predmet_novo.opis_predmeta == ""
        && this.predmet_novo.pocetna_cijena == "" && this.predmet_novo.vrijeme_pocetka == ""
        && this.predmet_novo.vrijeme_zavrsetka == "" && this.predmet_novo.id_kategorije == "") {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Nije napravljena niti jedna izmjena!",
          icon: "warning",
        });
      } else {
        this.izmjenaPredmeta();
      }
    },

    ocistiPolja() {
      this.predmet_novo.naziv_predmeta = "";
      this.predmet_novo.opis_predmeta = "";
      this.predmet_novo.pocetna_cijena = "";
      this.predmet_novo.vrijeme_pocetka = "";
      this.predmet_novo.vrijeme_zavrsetka = "";
      this.predmet_novo.id_kategorije = "";
    },

    async izmjenaPredmeta() {
      if (this.predmet_novo.naziv_predmeta == "") this.predmet_novo.naziv_predmeta = this.item.naziv_predmeta;
      if (this.predmet_novo.opis_predmeta == "") this.predmet_novo.opis_predmeta = this.item.opis_predmeta;
      if (this.predmet_novo.pocetna_cijena == "") this.predmet_novo.pocetna_cijena = this.item.pocetna_cijena;
      if (this.predmet_novo.vrijeme_pocetka == "") {
        this.predmet_novo.vrijeme_pocetka = this.item.vrijeme_pocetka;
      } else {
        this.predmet_novo.vrijeme_pocetka = new Date(this.predmet_novo.vrijeme_pocetka).setHours(new Date(this.predmet_novo.vrijeme_pocetka).getHours() + 2);
      }
      if (this.predmet_novo.vrijeme_zavrsetka == "") {
        this.predmet_novo.vrijeme_zavrsetka = this.item.vrijeme_zavrsetka;
      } else {
        this.predmet_novo.vrijeme_zavrsetka = new Date(this.predmet_novo.vrijeme_zavrsetka).setHours(new Date(this.predmet_novo.vrijeme_zavrsetka).getHours() + 2);
      }
      if (this.predmet_novo.id_kategorije == "") this.predmet_novo.id_kategorije = this.item.id_kategorije;

      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.put("http://localhost:3000/api/izmjenaPredmeta/" + this.id_predmeta, this.predmet_novo, { headers });

        this.$q.notify({
          color: "positive",
          position: "top",
          message: "Izmjena podataka uspješna!",
        });
        await this.dohvatiPredmet(this.id_predmeta, headers);
        await this.ispisiPodatke(this.id_predmeta);
        this.ocistiPolja();
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Izmjena podataka neuspješna.",
        });
        console.log(error);
      }
    },

    //od tu nadalje su slike

    async obrisiTrenutnuSliku() {

      const idSlikeZaBrisanje = this.item.id_slika[this.index - 1]; //prva slika je 0, a index za nju je 1

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.delete("http://localhost:3000/api/brisanjeSlike/" + idSlikeZaBrisanje, { headers });

        this.$q.notify({
          color: "positive",
          position: "top",
          message: "Slika uspješno obrisana.",
        });
      }
      catch (error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Brisanje slike neuspješno.",
        });
        console.log(error);
      }

      await this.dohvatiPredmet();
    },

    async dodajNoveSlike() {
      const formData = new FormData();
      this.base64Images.forEach((base64String, index) => {
        formData.append(`file${index}`, base64String);
      });
      formData.append("id_predmeta", this.id_predmeta);

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.post("http://localhost:3000/api/dodavanjeSlika", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...headers,
          },
        });
        this.$q.notify({
          color: "positive",
          position: "top",
          message: "Dodavanje slika/e uspješno.",
        });



      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Dodavanje slika/e neuspješno.",
        });
        console.log(error);
      }

      await this.dohvatiPredmet();
    },

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
  },

  setup() {
    return {
      slide: ref(2),
      autoplay: ref(false),
    };
  },
};
</script>