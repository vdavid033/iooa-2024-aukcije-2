<template>
  <div>
    <!-- podaci o korisniku -->
    <div class="user-info">
      <div class="user-info-header">
        <div class="row">
          <h5 ref="h_korisnik" class="text-h3 text-blue q-my-md">Korisnik {{ korisnik_trenutno.ime_korisnika }} {{
            korisnik_trenutno.prezime_korisnika }}</h5>
        </div>
        <div>
          <p>Trenutno ime: {{ korisnik_trenutno.ime_korisnika }}</p>
          <p>Trenutno prezime: {{ korisnik_trenutno.prezime_korisnika }}</p>
          <p>Trenutni email: {{ korisnik_trenutno.email_korisnika }}</p>
          <p>Trenutna adresa: {{ korisnik_trenutno.adresa_korisnika }}</p>
        </div>
        <!--<h2>{{ currentUser.name }} {{ currentUser.surname }}</h2>
        <p>{{ currentUser.dateOfBirth }}</p>
        <p>{{ currentUser.oib }}</p>-->
        <!--<h2>Ime i prezime: Ivo Ivic</h2>
        <p>Datum rođenja: 7.8.1996.</p>
        <p>E-mail: ivoivic@gmail.com</p>
        <p>OIB: 12345678908</p>-->
      </div>
      <div class="user-info-image">
        <img src="~assets\profilna.png" alt="Profilna slika">
      </div>
    </div>
    <q-btn color="primary" label="Izmjena korisničkih podataka" @click="$router.push('/UpdateProfil')" />

    <!-- predmeti na aukciji koje je korisnik postavio -->
    <h3>Vaši predmeti na aukciji</h3>
    <p ref="nema_predmete"></p>
    <div class="q-pa-sm row flex flex-center">
      <div v-for="predmet in vlastitiPredmeti" :key="predmet.id_predmeta" class="q-pa-md" style="width: 400px">
        <q-card>
          <q-item-section @click="pregledPredmeta(predmet.id_predmeta)">
            <q-img v-if="predmet.slika" :src="predmet.slika" no-native-menu />
            <q-item class="q-pa-sm text-bold text-blue-7">{{ predmet.naziv_predmeta }} </q-item>
            <q-item>Početna cijena: {{ predmet.pocetna_cijena }}$</q-item>
            <q-item>Vrijeme pocetka: {{ formattedDate(predmet.vrijeme_pocetka) }}</q-item>
            <q-item>Vrijeme zavrsetka: {{ formattedDate(predmet.vrijeme_zavrsetka) }}</q-item>
            <q-item>Preostalo vrijeme aukcije: {{ predmet.preostalo_vrijeme }} h </q-item>
            <q-item>Trenutna cijena: {{ predmet.trenutna_cijena }}$</q-item>
          </q-item-section>
          <q-separator dark />
          <q-card-actions>
            <q-btn flat color="primary" @click="izmijeniPredmet(predmet.id_predmeta)">Izmijeni</q-btn>
            <q-btn flat color="negative" @click="obrisiPredmet(predmet.id_predmeta)">Obriši</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- ponude korisnika -->
    <h3>Vaše ponude</h3>
    <p ref="nema_predmete"></p>
    <div class="q-pa-sm row flex flex-center">
  <div v-for="ponuda in vlastitePonude" :key="ponuda.id_ponude" class="q-pa-md" style="width: 400px">
    <q-card>
      <q-item-section>
        <q-img v-if="ponuda.slika" :src="ponuda.slika" no-native-menu />
        <q-item class="q-pa-sm text-bold text-blue-7">{{ ponuda.naziv_predmeta }} </q-item>
        <q-item>Opis: {{ ponuda.opis_predmeta }}$</q-item>
        <q-item>vrijednost_ponude: {{ ponuda.vrijednost_ponude }}$</q-item>
        <q-item>Vrijeme postavljanja ponude: {{ formattedDate(ponuda.vrijeme_ponude) }}</q-item>
      </q-item-section>
      <q-separator dark />
    </q-card>
  </div>
</div>


    <!--<q-card-group class="card-group">
      <q-card-row class="q-ml-sm flex flex-start q-gutter-sm">
        <q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Rolex Daytona</h5>
              <p class="card-description">Mehanički ručni sat s automatskim navijanjem, proizveden u Švicarskoj.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>-->
        <!-- ponude korisnika -->
        
        <!--<q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Cartier Tank</h5>
              <p class="card-description">Elegantni mehanički ručni sat s kožnom narukvicom.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>
        <q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Breitling Navitimer</h5>
              <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>
        <q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Breitling Navitimer</h5>
              <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>
        <q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Breitling Navitimer</h5>
              <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>
        <q-card-column>
          <q-card class="card">
            <img class="card-img-top" src="" alt="">
            <q-card-section>
              <h5 class="card-title">Breitling Navitimer</h5>
              <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
              <p>Vaša ponuda: 200 €</p>
              <p>Preostalo vrijeme: 10:20:58</p>
              <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
              <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
            </q-card-section>
          </q-card>
        </q-card-column>
      </q-card-row>
    </q-card-group>-->
    <!--<q-card v-for="bid in userBids" :key="bid._id">
      <q-card-section>
        <h4>{{ bid.item.name }}</h4>
        <p>Vaša ponuda: {{ bid.bidderBid }} kn</p>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" label="Uredi" @click="editBid(bid)" />
        <q-btn color="negative" label="Obriši" @click="deleteBid(bid)" />
      </q-card-actions>
    </q-card>-->
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f2f2f2;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.user-info-header {
  margin-bottom: 20px;
}

.user-info-header h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

.user-info-header p {
  font-size: 16px;
  margin-bottom: 5px;
}

.user-info-image img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 400px;
  margin: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  cursor: pointer;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return {
      currentUser: {}, // Korisnički podaci
      userBids: [], // Predmeti na koje je korisnik postavio bid
      korisnik_trenutno: {
        ime_korisnika: "",
        prezime_korisnika: "",
        email_korisnika: "",
        adresa_korisnika: ""
      },
      vlastitiPredmeti: [],
      vlastitePonude: [],
    }
  },

  async mounted() {
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem("token");

      // Parse the token to get user ID
      const userId = this.getUserIdFromToken(token);

      // Fetch user data using user ID
      const userData = await this.fetchUserData(userId);
      const headers = { Authorization: `Bearer ${token}` };
      // Update the component's data with the fetched user data
      this.korisnik_trenutno = userData;

      this.dohvatPredmeta(userId, headers);
      this.dohvatPonude(userId, headers);
    } catch (error) {
      console.error("Greška kod dohvaćanja vlastitih predmeta:", error);
    }
  },

  methods: {

    async dohvatPredmeta(userId, headers) {
      await axios
        .get("http://localhost:3000/api/vlastiti-predmeti/" + userId, { headers })
        .then((response) => {
          if (response.data.length === 0) {
            this.$refs.nema_predmete.textContent = "Nemate niti jedan predmet koji je ili je bio na aukciji!";
          } else {
            this.vlastitiPredmeti = response.data;
          }
        })},

    formattedDate(dateString) {
      return new Date(dateString).toLocaleString("hr-HR").replace(",", "");
    },
    pregledPredmeta(id_predmeta) {
      this.$router.push({ path: "prikaz", query: { id_predmeta } });
    },
    izmijeniPredmet(id_predmeta) {
      this.$router.push({ path: "izmjena_predmeta", query: { id_predmeta } });
    },
    async obrisiPredmet(id_predmeta) { //bilo bi dobro imat uvjet da se ne mogu brisat izvedene ili aukcije u tijeku
      const token = localStorage.getItem("token");
      const userId = this.getUserIdFromToken(token);
      const headers = { Authorization: `Bearer ${token}` };
      if (window.confirm('Jeste li sigurni da želite obrisati predmet?')) {
        try {
          const response = await axios.delete("http://localhost:3000/api/brisanjePredmeta/" + id_predmeta, { headers });

          this.$q.notify({
            color: "positive",
            position: "top",
            message: "Brisanje podataka uspješno!",
          });

          this.dohvatPredmeta(userId, headers);
        } catch (error) {
          console.log("Greška pri brisanju predmeta: " + error);
        }
      }
    },
    async dohvatPonude(userId, headers) {
  await axios
    .get("http://localhost:3000/api/vlastita-ponuda-korisnik/" + userId, { headers })
    .then((response) => {
      console.log("API Data:", response.data); // Log API data
      if (response.data.length === 0) {
        this.$refs.nema_predmete.textContent = "Nemate niti jednu ponudu koji je ili je bio na aukciji!";
      } else {
        this.vlastitePonude = response.data;
      }
    })
    .catch((error) => {
      console.error("API Error:", error); 
    });
},

    editBid(bid) {
      // Funkcija za uređivanje bid-a na aukciji
    },
    deleteBid(bid) {
      // Funkcija za brisanje bid-a na aukciji
    },
    getUserIdFromToken(token) {
      // Parse JWT token and extract user ID
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).id;
    },

    async fetchUserData(userId) {
      try {
        // Fetch user data from the server using user ID
        const response = await axios.get(`http://localhost:3000/api/korisnikinfo1/${userId}`);
        // Return user data
        return response.data[0];
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If an error occurs, you might want to handle it accordingly
        throw error;
      }
    }
  }
}

</script>
