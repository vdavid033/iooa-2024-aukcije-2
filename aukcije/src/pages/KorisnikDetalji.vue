<template>
  <q-page style="margin-left: 2%; margin-right: 2%" window-height window-width>
    <div class="row">
      <h5 class="text-h3 text-blue q-my-md">Korisnik taj i taj</h5>
    </div>
    <q-form @submit="provjeraPolja">
      <q-input v-model="korisnik_novo.ime_korisnika" label="Ime" outlined dense type="text" />
      <p ref="p_ime"></p>
      <q-input v-model="korisnik_novo.prezime_korisnika" label="Prezime" outlined dense type="text" />
      <p ref="p_prezime"></p>
      <q-input v-model="korisnik_novo.email_korisnika" label="E-mail" outlined dense type="email" />
      <p ref="p_email"></p>
      <q-input v-model="korisnik_novo.adresa_korisnika" label="Adresa" outlined dense type="text" />
      <p ref="p_adresa"></p>
      <q-btn type="submit" label="Izmijeni" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      korisnik_trenutno: {
        ime_korisnika: "",
        prezime_korisnika: "",
        email_korisnika: "",
        adresa_korisnika: "",
      },
      korisnik_novo: {
        ime_korisnika: "",
        prezime_korisnika: "",
        email_korisnika: "",
        adresa_korisnika: "",
        id_korisnika: this.$route.params.id,
      },
    };
  },

  async mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    const id = this.$route.params.id;
    await this.dohvatiKorisnika(id, headers);
    this.ispisiPodatke();
  },

  methods: {
    async dohvatiKorisnika(id, headers) {
      try {
        const response = await axios.get("http://localhost:3000/api/korisnikinfo/" + id, { headers });
        //console.log(response.data[0]);
        this.korisnik_trenutno = response.data[0];
      } catch (error) {
        console.error("Greška pri dohvatu korisnika", error);
      }
    },

    async ispisiPodatke() {
      try {
        this.$refs.p_ime.textContent = "Trenutno ime: " + this.korisnik_trenutno.ime_korisnika;
        this.$refs.p_prezime.textContent = "Trenutno prezime: " + this.korisnik_trenutno.prezime_korisnika;
        this.$refs.p_email.textContent = "Trenutni email: " + this.korisnik_trenutno.email_korisnika;
        this.$refs.p_adresa.textContent = "Trenutna adresa: " + this.korisnik_trenutno.adresa_korisnika;
      } catch (error) {
        console.error("Greška pri upisivanju podataka", error);
      }
    },

    provjeraPolja() {
      if (this.korisnik_novo.ime_korisnika == "" && this.korisnik_novo.prezime_korisnika == "" && this.korisnik_novo.email_korisnika == "" && this.korisnik_novo.adresa_korisnika == "") {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Nije napravljena niti jedna izmjena!",
          icon: "warning",
        });
      } else {
        this.izmjenaKorisnika();
      }
    },

    ocistiPolja() {
      this.korisnik_novo.ime_korisnika = "";
      this.korisnik_novo.prezime_korisnika = "";
      this.korisnik_novo.email_korisnika = "";
      this.korisnik_novo.adresa_korisnika = "";
    },

    async izmjenaKorisnika() {
      if (this.korisnik_novo.ime_korisnika == "") this.korisnik_novo.ime_korisnika = this.korisnik_trenutno.ime_korisnika;
      if (this.korisnik_novo.prezime_korisnika == "") this.korisnik_novo.prezime_korisnika = this.korisnik_trenutno.prezime_korisnika;
      if (this.korisnik_novo.email_korisnika == "") this.korisnik_novo.email_korisnika = this.korisnik_trenutno.email_korisnika;
      if (this.korisnik_novo.adresa_korisnika == "") this.korisnik_novo.adresa_korisnika = this.korisnik_trenutno.adresa_korisnika;

      //console.log("Uspjeh!");
      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem("token");

        // Set up the request headers to include the JWT token
        const headers = { Authorization: `Bearer ${token}` };

        // Make the PUT request with axios and include the headers
        const response = await axios.put("http://localhost:3000/api/izmjenakorisnika/", this.korisnik_novo, { headers });

        this.$q.notify({
          color: "positive",
          position: "top",
          message: "Izmjena podataka uspješna!",
        });
        await this.dohvatiKorisnika(this.korisnik_novo.id_korisnika);
        this.ispisiPodatke(this.korisnik_novo.id_korisnika);
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
