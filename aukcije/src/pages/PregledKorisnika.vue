<template>
  <div class="q-pa-md">
      <q-table 
      flat bordered
      title="Korisnici"
      rows-per-page-label="Broj prikazanih redova:"
      :rows="korisnici"
      :col-props="colProps"
      :columns="stupci">
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
        <template v-slot:body-cell-gumbovi>
            <q-btn-group spread>
                <q-btn color="primary" label="Izmijeni"/>
                <q-btn color="red" label="Obriši"/>
            </q-btn-group>
        </template>
        
      </q-table>
  </div>
</template>


<script>
import axios from "axios";
export default
{
    data() {
        return {
            korisnici: [],
            stupci: [
                {
                    name:'ime',
                    required:true,
                    label:'Ime',
                    align:'left',
                    field:'ime_korisnika',
                    sortable:true
                },
                {
                    name:'prezime',
                    required:true,
                    label:'Prezime',
                    align:'left',
                    field:'prezime_korisnika',
                    sortable:true
                },
                {
                    name:'email',
                    required:true,
                    label:'E-mail',
                    align:'left',
                    field:'email_korisnika',
                    sortable:true
                },
                {
                    name:'adresa',
                    required:true,
                    label:'Adresa',
                    align:'left',
                    field:'adresa_korisnika',
                    sortable:true
                },
                {
                    name:'gumbovi',
                    label:'Dodatne mogucnosti',
                    align:'center',
                },
            ],
        };
    },

    mounted() {
        this.dohvatiKorisnike();
        //console.log("korisnici nakon API poziva:", this.korisnici);
    },

    methods: {
        async dohvatiKorisnike(){
          try {
            const response = await axios.get("http://localhost:3000/api/korisnici");
            //console.log("Response podaci:", response.data);
            this.korisnici = response.data;
            
          } catch (error) {
              console.error("Greška pri dohvatu korisnika", error);
          }
            
        }
    }
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