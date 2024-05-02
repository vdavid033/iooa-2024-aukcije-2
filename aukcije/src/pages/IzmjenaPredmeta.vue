<template>
    <q-page style="margin-left: 2%; margin-right: 2%" window-height window-width>
      <div class="row">
        <h5 ref="h_predmet" class="text-h3 text-blue q-my-md">Naziv predmeta</h5>
      </div>
      <q-form @submit="provjeraPolja">
        <q-input v-model="predmet_novo.naziv_predmeta" label="Naziv" outlined dense type="text" />
        <p ref="p_naziv"></p>
        <q-select v-model="predmet_novo.id_kategorije" :options="kategorije" label="Kategorija" outlined dense/>
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
        <q-input filled v-model="predmet_novo.vrijeme_zavrsetka" label="Datum i vrijeme završetka aukcije">
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

    <div style="height:25px"></div>
    <p ref="p_datumPoc"></p>
    <p ref="p_datumZavrs"></p>

        <q-btn type="submit" label="Izmijeni" color="primary" class="q-mt-md" />
      </q-form>
    </q-page>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    computed: {
    id_predmeta() {
      return this.$route.query.id_predmeta;
    }},

    data() {
      return {
        predmet_trenutno: {
          naziv_predmeta: "",
          opis_predmeta: "",
          pocetna_cijena: "",
          vrijeme_pocetka: "",
          vrijeme_zavrsetka: "",
          id_kategorije:""
        },
        predmet_novo: {
          naziv_predmeta: "",
          opis_predmeta: "",
          pocetna_cijena: "",
          vrijeme_pocetka: "",
          vrijeme_zavrsetka: "",
          id_kategorije:"",
        },

        kategorije: [],
      };
    },
  
    async mounted() {
      // Get the JWT token from local storage
      const token = localStorage.getItem("token");
  
      // Set up the request headers to include the JWT token
      const headers = { Authorization: `Bearer ${token}` };
      await this.dohvatiKategorije();
      await this.dohvatiPredmet(headers);
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

      async dohvatiPredmet(headers) {
        try {
          const response = await axios.get("http://localhost:3000/api/get-predmet2/" + this.id_predmeta, { headers });
          this.predmet_trenutno = response.data[0];
          //console.log(this.predmet_trenutno);
        } catch (error) {
          console.error("Greška pri dohvatu predmeta", error);
        }
      },
  
      async ispisiPodatke() {
        try {
          this.$refs.p_naziv.textContent = "Trenutni naziv predmeta: " + this.predmet_trenutno.naziv_predmeta;
          this.$refs.p_opis.textContent = "Trenutni opis: " + this.predmet_trenutno.opis_predmeta;
          this.$refs.p_pocCijena.textContent = "Trenutna početna cijena: " + this.predmet_trenutno.pocetna_cijena;
          this.$refs.p_datumPoc.textContent = "Trenutni datum i vrijeme početka: " + this.predmet_trenutno.vrijeme_pocetka;
          this.$refs.p_datumZavrs.textContent = "Trenutni datum i vrijeme završetka: " + this.predmet_trenutno.vrijeme_zavrsetka;
          this.$refs.h_predmet.textContent = "Predmet " + this.predmet_trenutno.naziv_predmeta;
          this.$refs.p_kategorija.textContent = "Trenutna kategorija: " + this.kategorije.find(kategorija => kategorija.key === this.predmet_trenutno.id_kategorije)['label'];
        } catch (error) {
          console.error("Greška pri upisivanju podataka", error);
        }
      },
  
      provjeraPolja() {
        if (this.predmet_novo.naziv_predmeta == "" && this.predmet_novo.opis_predmeta == ""
          && this.predmet_novo.pocetna_cijena == "" && this.predmet_novo.vrijeme_pocetka == ""
          && this.predmet_novo.vrijeme_zavrsetka == "" && this.predmet_novo.odabrana_kategorija == "") {
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
        this.predmet_novo.odabrana_kategorija = "";
      },
  
      async izmjenaPredmeta() {
        if (this.predmet_novo.naziv_predmeta == "") this.predmet_novo.naziv_predmeta = this.predmet_trenutno.naziv_predmeta;
        if (this.predmet_novo.opis_predmeta == "") this.predmet_novo.opis_predmeta = this.predmet_trenutno.opis_predmeta;
        if (this.predmet_novo.pocetna_cijena == "") this.predmet_novo.pocetna_cijena = this.predmet_trenutno.pocetna_cijena;
        if (this.predmet_novo.vrijeme_pocetka == "") this.predmet_novo.vrijeme_pocetka = this.predmet_trenutno.vrijeme_pocetka;
        if (this.predmet_novo.vrijeme_zavrsetka == "") this.predmet_novo.vrijeme_zavrsetka = this.predmet_trenutno.vrijeme_zavrsetka;
        if (this.predmet_novo.odabrana_kategorija == "") this.predmet_novo.odabrana_kategorija = this.predmet_trenutno.odabrana_kategorija;

  
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
          this.ispisiPodatke(this.id_predmeta);
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
    },
  };
  </script>
  