<template>
  <div class="q-pa-md">
    <q-table flat bordered title="Korisnici" rows-per-page-label="Broj prikazanih redova:" :rows="korisnici" :col-props="colProps" :columns="stupci">
      <template v-slot:body-cell-ime_korisnika="props">
        {{ props.row.ime_korisnika }}
      </template>
      <template v-slot:body-cell-prezime_korisnika="props">
        {{ props.row.prezime_korisnika }}
      </template>
      <template v-slot:body-cell-email_korisnika="props">
        {{ props.row.email_korisnika }}
      </template>
      <template v-slot:body-cell-adresa_korisnika="props">
        {{ props.row.adresa_korisnika }}
      </template>
      <template v-slot:body-cell-gumbovi="props">
        <q-btn-group spread>
          <q-btn color="primary" label="Izmijeni" @click="odiNaDetalje(props.row.id_korisnika)" />
          <q-btn color="red" label="Obriši" @click="obrisiKorisnika(props.row.id_korisnika)" />
        </q-btn-group>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      korisnici: [],
      stupci: [
        {
          name: "ime",
          required: true,
          label: "Ime",
          align: "left",
          field: "ime_korisnika",
          sortable: true,
        },
        {
          name: "prezime",
          required: true,
          label: "Prezime",
          align: "left",
          field: "prezime_korisnika",
          sortable: true,
        },
        {
          name: "email",
          required: true,
          label: "E-mail",
          align: "left",
          field: "email_korisnika",
          sortable: true,
        },
        {
          name: "adresa",
          required: true,
          label: "Adresa",
          align: "left",
          field: "adresa_korisnika",
          sortable: true,
        },
        {
          name: "gumbovi",
          label: "Dodatne mogucnosti",
          align: "center",
        },
      ],
    };
  },

  async mounted() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set up the request headers to include the JWT token
    const headers = { Authorization: `Bearer ${token}` };
    this.dohvatiKorisnike(headers);
    //console.log("korisnici nakon API poziva:", this.korisnici);
  },

  methods: {
    async dohvatiKorisnike(headers) {
      try {
        const response = await axios.get("http://localhost:3000/api/korisnici", { headers });
        //console.log("Response podaci:", response.data);
        this.korisnici = response.data;
      } catch (error) {
        console.error("Greška pri dohvatu korisnika", error);
      }
    },

    odiNaDetalje(idKorisnika) {
      this.$router.push({ name: "korisnikdetalji", params: { id: idKorisnika } });
    },

    async obrisiKorisnika(idKorisnika) {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        if(window.confirm('Jeste li sigurni da želite obrisati korisnika?')) {
            const response = await axios.put("http://localhost:3000/api/brisanjekorisnika/" + idKorisnika, null, { headers }); //null zbog PUT 'payloada'
            const response2 = await axios.get("http://localhost:3000/api/korisnici", {headers});
            this.korisnici = response2.data;
        }}

  },
};
</script>

<style>
.centar_gumbovi {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
