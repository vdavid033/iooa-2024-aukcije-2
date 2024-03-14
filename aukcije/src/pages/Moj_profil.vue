<template>
  <div>
    <!-- podaci o korisniku -->
    <div class="user-info">
      <div class="user-info-header">
        <!--<h2>{{ currentUser.name }} {{ currentUser.surname }}</h2>
        <p>{{ currentUser.dateOfBirth }}</p>
        <p>{{ currentUser.oib }}</p>-->
        <h2>Ime i prezime: Ivo Ivic</h2>
        <p>Datum rođenja: 7.8.1996.</p>
        <p>E-mail: ivoivic@gmail.com</p>
        <p>OIB: 12345678908</p>
      </div>
      <div class="user-info-image">
        <img src="~assets\profilna.png" alt="Profilna slika">
      </div>
    </div>
 
    <!-- predmeti na aukciji koje je korisnik postavio -->
    <h3>Vaši predmeti na aukciji</h3>
    <q-card-group class="card-group">
    <q-card-row class="q-ml-sm flex flex-start q-gutter-sm">
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Rolex Daytona</h5>
            <p class="card-description">Mehanički ručni sat s automatskim navijanjem, proizveden u Švicarskoj.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Cartier Tank</h5>
            <p class="card-description">Elegantni mehanički ručni sat s kožnom narukvicom.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Breitling Navitimer</h5>
            <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Breitling Navitimer</h5>
            <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Breitling Navitimer</h5>
            <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
      <q-card-column>
        <q-card class="card">
          <img class="card-img-top" src="" alt="">
          <q-card-section>
            <h5 class="card-title">Breitling Navitimer</h5>
            <p class="card-description">Mehanički ručni sat s automatskim navijanjem, dizajniran za pilote.</p>
            <p>Trenutna ponuda: 100 €</p>
            <p>Preostalo vrijeme: 10:20:58</p>
            <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
          </q-card-section>
        </q-card>
      </q-card-column>
    </q-card-row>
  </q-card-group>
    <!--<q-card v-for="item in userAuctionItems" :key="item._id">
      <q-card-section>
        <h4>{{ item.name }}</h4>
        <p>Trenutna ponuda: {{ item.currentBid }} kn</p>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" label="Uredi" @click="editAuctionItem(item)" />
        <q-btn color="negative" label="Obriši" @click="deleteAuctionItem(item)" />
      </q-card-actions>
    </q-card>-->

    <!-- predmeti na koje je korisnik postavio bid -->
    <h3>Vaše ponude</h3>
    <q-card-group class="card-group">
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
      </q-card-column>
      <q-card-column>
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
  </q-card-group>
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
export default {
  data() {
    return {
      currentUser: {}, // Korisnički podaci
      userAuctionItems: [], // Predmeti koje je korisnik postavio na aukciju
      userBids: [] // Predmeti na koje je korisnik postavio bid
    }
  },
  methods: {
    editAuctionItem(item) {
      // Funkcija za uređivanje predmeta na aukciji
    },
    deleteAuctionItem(item) {
      // Funkcija za brisanje predmeta na aukciji
    },
    editBid(bid) {
      // Funkcija za uređivanje bid-a na aukciji
    },
    deleteBid(bid) {
      // Funkcija za brisanje bid-a na aukciji
    }
  }
}
</script>
