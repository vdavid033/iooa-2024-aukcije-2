<template>
  <q-page style="margin-left: 2%; margin-right: 2%" window-height window-width>
    <div class="row">
      <h5 class="text-h3 text-blue q-my-md">Ažuriranje kategorije</h5>
    </div>
    <q-form @submit="izmjenaKategorije()">
      <q-input v-model="kategorija_novo.naziv_kategorije" label="Naziv:" outlined dense type="text" />
      <p ref="p_naziv"></p>
      <q-btn type="submit" label="Izmijeni" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      kateogrija_trenutno: {
        naziv_kategorije: "",
      },
      kategorija_novo: {
        naziv_kategorije: "",
        id_kategorije: this.$route.params.id,
      },
    };
  },
  async mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    const id = this.$route.params.id;
    await this.dohvatiKategoriju(id, headers);
    this.ispisiPodatke();
  },

  methods: {
    async dohvatiKategoriju(id, headers) {
      try {
        const response = await axios.get("http://localhost:3000/api/kategorijainfo/" + id, { headers });
        this.kateogrija_trenutno = response.data[0];
      } catch (error) {
        console.error("Greška pri dohvatu kategorije", error);
      }
    },

    async ispisiPodatke() {
      try {
        this.$refs.p_naziv.textContent = "Trenutni naziv: " + this.kateogrija_trenutno.naziv_kategorije;
      } catch (error) {
        console.error("Greška pri upisivanju podataka", error);
      }
    },

    ocistiPolja() {
      this.kategorija_novo.naziv_kategorije = "";
    },

    async izmjenaKategorije() {
      if (this.kategorija_novo.naziv_kategorije == "") {
        this.kategorija_novo.naziv_kategorije = this.kateogrija_trenutno.naziv_kategorije;
      }

      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem("token");

        // Set up the request headers to include the JWT token
        const headers = { Authorization: `Bearer ${token}` };

        // Make the PUT request with axios and include the headers
        const response = await axios.put("http://localhost:3000/api/izmjenaKategorije", this.kategorija_novo, { headers });

        this.$q.notify({
          color: "positive",
          position: "top",
          message: "Izmjena podataka uspješna!",
        });

        await this.dohvatiKategoriju(this.kategorija_novo.id_kategorije, headers);
        this.ispisiPodatke(this.kategorija_novo.id_kategorije);
        this.ocistiPolja();
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Izmjena podataka neuspješna.",
        });
        console.error(error);
      }
    },
  },
};
</script>
