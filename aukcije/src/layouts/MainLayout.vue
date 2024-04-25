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
        <template v-if="isAuthenticated()">
          <div class="q-pa-md">
            <q-btn-dropdown color="primary" :label="`${userIme} ${userPrezime}`">
              <q-list>
                <router-link to="/Moj_profil" class="link-style" @click="toggleLeftDrawerClose">
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Moj profil</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
                <q-item clickable v-close-popup @click="confirmLogout">
                  <q-item-section>
                    <q-item-label>Odjava</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="text-bold text-black"> Mogućnosti </q-item-label>

        <div class="q-pa-sm col">
          <!--        Za navigaciju bez otvaranja novog tab-a-->
          <template v-if="!isAuthenticated()">
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
          </template>
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
          <template v-if="isAdmin()">
            <div class="q-pa-sm col">
              <router-link to="/admin/" class="link-style" @click="toggleLeftDrawer">
                <q-btn class="flex flex-center" color="primary" style="width: 280px">Admin Dashboard</q-btn>
              </router-link>
            </div>
          </template>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Logout Confirmation Dialog -->
    <q-dialog v-model="confirmLogoutDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Jeste li sigurni da želite se odjaviti?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" v-close-popup />
          <q-btn flat label="Odjavi se" color="negative" @click="logoutAndReload" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const confirmLogoutDialog = ref(false);

    const token = ref(localStorage.getItem("token"));

    // Decode the JWT token and extract the user's name and surname
    const userIme = computed(() => {
      if (token.value) {
        try {
          const decodedToken = jwtDecode(token.value);
          return decodedToken.ime; // Return user's name from token
        } catch (error) {
          console.error("Error decoding token:", error);
          return "";
        }
      }
      return "";
    });

    const userPrezime = computed(() => {
      if (token.value) {
        try {
          const decodedToken = jwtDecode(token.value);
          return decodedToken.prezime; // Return user's surname from token
        } catch (error) {
          console.error("Error decoding token:", error);
          return "";
        }
      }
      return "";
    });

    const isAdmin = () => {
      if (isAuthenticated() && token.value) {
        const decodedToken = jwtDecode(token.value);
        return decodedToken.uloga === "admin";
      }
      return false;
    };

    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleLeftDrawerClose = () => {
      leftDrawerOpen.value = false;
    };

    const confirmLogout = () => {
      confirmLogoutDialog.value = true;
    };

    const logoutAndReload = () => {
      // Clear JWT token from local storage
      localStorage.removeItem("token");
      // Reload the page
      window.location.reload();
    };

    return {
      leftDrawerOpen,
      confirmLogoutDialog,
      isAuthenticated,
      isAdmin,
      toggleLeftDrawer,
      toggleLeftDrawerClose,
      confirmLogout,
      logoutAndReload,
      userPrezime,
      userIme,
    };
  },
});
</script>
