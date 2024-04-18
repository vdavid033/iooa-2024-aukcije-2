<template>
  <q-page class="bg-blue window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h3 text-white q-my-md">Prijava</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="login">
              <q-input square filled v-model="email_korisnika" type="email" label="Vaš email" />
              <q-input square filled v-model="lozinka_korisnika" type="password" label="Lozinka" />
              <div class="text-center"><q-btn size="lg" type="submit" label="Prijava" color="light-blue-7" /></div>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none">
            <router-link to="registracija" class="link-style"><p class="text-grey-6">Registrirajte se!</p></router-link>
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
      email_korisnika: "",
      lozinka_korisnika: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: this.email_korisnika,
          password: this.lozinka_korisnika,
        });

        if (response.data.success) {
          // Save the JWT token to local storage
          localStorage.setItem("token", response.data.token);

          // Redirect to the desired page
          this.$router.push("/Pocetna");
        } else {
          // Show error message if login fails
          this.$q.notify({
            color: "negative",
            position: "top",
            message: response.data.message,
            icon: "warning",
          });
        }
      } catch (error) {
        console.error("Login failed:", error);
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Prijava nije uspjela. Provjerite podatke i pokušajte ponovno.",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style>
.q-pa-lg {
  width: 360px;
}
</style>
