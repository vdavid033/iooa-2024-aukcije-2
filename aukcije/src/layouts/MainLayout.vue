<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link to="/" class="link-style">
            <q-avatar>
              <img src="~assets\aukcije_logo.jpg" alt="Logo" />
            </q-avatar>
          </router-link>
        </q-toolbar-title>
        <q-space></q-space>
        <q-space /><q-space /><q-space /><q-space /><q-space /><q-space /><q-space /><q-space />

        <router-link to="/Logout" class="link-style">
          <q-btn label="Odjava" color="negative" class="q-mr-md" />
        </router-link>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="text-bold text-black"> Mogućnosti </q-item-label>

        <div class="q-pa-sm col">
          <!--        Za navigaciju bez otvaranja novog tab-a-->
          <div class="q-pa-sm col">
            <router-link to="/prijava" class="link-style" @click="toggleLeftDrawerClose">
              <q-btn class="flex flex-center" style="width: 280px"> Prijava </q-btn>
            </router-link>
          </div>
          <div class="q-pa-sm col">
            <router-link to="/registracija" class="link-style" @click="toggleLeftDrawerClose">
              <q-btn class="flex flex-center" style="width: 280px"> Registracija </q-btn>
            </router-link>
          </div>
          <div class="q-pa-sm col">
            <router-link to="/" class="link-style" @click="toggleLeftDrawerClose">
              <q-btn class="flex flex-center" style="width: 280px"> Početna stranica </q-btn>
            </router-link>
          </div>
          <div class="q-pa-sm col">
            <router-link to="postavi" class="link-style" @click="toggleLeftDrawerClose">
              <q-btn class="flex flex-center" style="width: 280px"> Dodaj aukciju </q-btn>
            </router-link>
          </div>
          <div class="q-pa-sm col">
            <router-link to="/Moj_profil" class="link-style" @click="toggleLeftDrawerClose">
              <q-btn class="flex flex-center" style="width: 280px"> Moj profil </q-btn>
            </router-link>
          </div>
          <div class="q-pa-sm col">
            <router-link to="/admin/" class="link-style" @click="toggleLeftDrawer">
              <q-btn class="flex flex-center" color="primary" style="width: 280px"> Admin Dahsboard </q-btn>
            </router-link>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

const baseUrl = "http://localhost:3306/api/";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    const logout = () => {
      // Clear JWT token from local storage
      localStorage.removeItem("token");

      // Send logout request to the backend
      axios
        .get(baseUrl + "logout")
        .then((response) => {
          console.log(response.data.message);
          // Redirect to login page or any other appropriate action
          this.$router.push("/Pocetna");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          // Handle logout failure as needed
        });
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
});
</script>
