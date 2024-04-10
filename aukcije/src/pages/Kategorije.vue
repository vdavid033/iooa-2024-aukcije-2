<template>
    <div class="q-pa-md">
        <q-table 
        flat bordered
        title="Kategorije"
        rows-per-page-label="Broj prikazanih redova:"
        :rows="kategorije"
        :col-props="colProps"
        :columns="stupci">
          <template v-slot:body-cell-naziv_kategorije="props">
          {{ props.row.naziv_kategorije }}
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
              kategorije: [],
              stupci: [
                  {
                      name:'Naziv',
                      required:true,
                      label:'Naziv kategorije',
                      align:'left',
                      field:'naziv_kategorije',
                      sortable:true
                  },
                  {
                      name:'gumbovi',
                      label:'Dodatne mogućnosti',
                      align:'center',
                  },
              ],
          };
      },
  
      mounted() {
          this.dohvatiKategorije();
      },
  
      methods: {
          async dohvatiKategorije(){
            try {
              const response = await axios.get("http://localhost:3000/api/all-kategorija");
              this.kategorije = response.data;
            } catch (error) {
                console.error("Greška pri dohvatu kategorija", error);
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