<template>
    <q-page class="bg-blue window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h5 class="text-h3 text-white q-my-md">Registracija</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="provjera">
                <q-input square filled v-model="ime_korisnika" type="text" label="Vaše ime"/>
                <q-input square filled v-model="prezime_korisnika" type="text" label="Vaše prezime"/>
                <q-input square filled v-model="email_korisnika" type="email" label="Vaš email" />
                <q-input square filled v-model="lozinka_korisnika" type="password" label="Lozinka" />
                <q-input square filled v-model="provjera_lozinke" type="password" label="Ponovi lozinku" />
                <q-input square filled v-model="adresa_korisnika" type="text" label="Adresa" />
                <div class="text-center"><q-btn size="lg" type="submit" label="Registracija" color="light-blue-7" /> </div>
                
              </q-form>
            </q-card-section>
            <q-card-section class="text-center q-pa-none">
              <router-link to="prijava" class="link-style"
                ><p class="text-grey-6">Prijeđi na prijavu</p>
              </router-link>
            </q-card-section>
            <q-card-section class="text-center q-pa-none">
              <router-link to="/" class="link-style"
                ><p class="text-grey-6">Nastavi kao gost</p>
              </router-link>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
<script>
import axios from "axios";
export default {
  data() {
    return {
    ime_korisnika: '',
    prezime_korisnika: '',
    email_korisnika: '',
    lozinka_korisnika: '',
    provjera_lozinke: '',
    adresa_korisnika: ''
    }
  },
  methods: {
    //editAuctionItem(item) {
       //Funkcija za uređivanje predmeta na aukciji
    //}
    async registracija()
    {
      const podaciZaReg =
      {
        ime: this.ime_korisnika,
        prezime: this.prezime_korisnika,
        email: this.email_korisnika,
        lozinka: this.lozinka_korisnika,
        adresa: this.adresa_korisnika,
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/regaKorisnika",
          podaciZaReg
        );
        console.log(response.data);
        this.showDialog = true;

        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Registracija uspješna!'
        })
      } catch (error) {
        if(sqlState == '23000') {
          this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'E-mail već u upotrebi!',
          icon: 'warning'
        });
        } else {
          this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Greška pri registraciji!',
          icon: 'warning'
        });
        }
        console.error(error);
      }
    },

    usporedba_lozinki()
    {
      if(this.lozinka_korisnika != this.provjera_lozinke)
        {
          this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Lozinke se ne podudaraju!',
          icon: 'warning'
        })
        }

      else
      {
        this.registracija()
      }
      return
    },

    provjera()
    {
      if(!this.ime_korisnika || !this.prezime_korisnika || !this.email_korisnika || !this.lozinka_korisnika || !this.provjera_lozinke || !this.adresa_korisnika)
      {
          this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Niste popunili sva polja!',
          icon: 'warning'
        })
      }
      else
      {
        this.usporedba_lozinki()
      }
        return
    }
  }
}
</script>
  
  <style>
  .q-pa-lg {
    width: 360px;
  }
  </style>