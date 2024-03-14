<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      
      <q-toolbar>
          <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      <q-toolbar-title>
    <q-avatar>
        <img src="~assets\aukcije_logo.jpg" alt="Logo">
    </q-avatar>
  </q-toolbar-title>
<q-space></q-space>
          
      
          <q-input
            v-model="search"
            filled
            placeholder="Search"
            dense
            class="w-200"
            @keyup.enter="searchItems"
          />
      
          <q-btn
            icon="search"
            color="primary"
            class="q-mr-md"
            @click="searchItems"
          />
      
          <q-btn
            icon="clear"
            color="primary"
            @click="clearSearch"
          />

          <div class="q-pa-md">
            <q-btn-dropdown color="primary" :label="selectedCategory">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick('Photos')">
                  <q-item-section>
                    <q-item-label>Kategorija 1</q-item-label>
                  </q-item-section>
                </q-item>
          
                <q-item clickable v-close-popup @click="onItemClick('Videos')">
                  <q-item-section>
                    <q-item-label>Kategorija 2</q-item-label>
                  </q-item-section>
                </q-item>
          
                <q-item clickable v-close-popup @click="onItemClick('Articles')">
                  <q-item-section>
                    <q-item-label>Kategorija 3</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <q-btn
            icon="refresh"
            color="primary"
            @click="refresh"
          />

         <q-space /><q-space /><q-space /><q-space /><q-space /><q-space /><q-space /><q-space />
       <!-- <router-link to="/Moj_profil" class="link-style">
          <q-btn label="My Profile" color="primary" class="q-mr-md" />
        </router-link>-->
        <router-link to="/Prijava_m" class="link-style">
          <q-btn label="Odjava" color="negative" class="q-mr-md" />
        </router-link>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-bold text-black">
          Mogućnosti
        </q-item-label>
        
        <div class="q-pa-sm col">
          <!--        Za navigaciju bez otvaranja novog tab-a-->
          <div class="q-pa-sm col">
            <q-btn class="flex flex-center" style="width: 280px">
              <router-link to="/prijava" class="link-style"
                >Prijava
              </router-link>
            </q-btn>
          </div>
          <div class="q-pa-sm col">
            <q-btn class="flex flex-center" style="width: 280px">
              <router-link to="/registracija" class="link-style"
                >Registracija
              </router-link>
            </q-btn>
          </div>
          <div class="q-pa-sm col">
            <q-btn class="flex flex-center" style="width: 280px">
              <router-link to="/" class="link-style"
                >Početna stranica</router-link>
            </q-btn>
            
          </div>
          <div class="q-pa-sm col">
            <q-btn class="flex flex-center" style="width: 280px">
              <router-link to="postavi" class="link-style"
                >Dodaj aukciju
              </router-link>
            </q-btn>
          </div>
          <div class="q-pa-sm col">
            <q-btn class="flex flex-center" style="width: 280px">
              <router-link to="/Moj_profil" class="link-style"
                >Moj profil
              </router-link>
            </q-btn>
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

  methods: {
    handleClick() {
      axios
        .get(baseUrl + "all-predmet", {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style>
.q-avatar{
  height: 64px;
  width: 64px;
}
</style>