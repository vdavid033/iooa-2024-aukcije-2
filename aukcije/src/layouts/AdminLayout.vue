<template>
    <q-layout view="hHh LpR fFf">
  
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            <router-link to="/" class="link-style">
                <q-avatar>
                    <img src="~assets\aukcije_logo.jpg" alt="Logo">
                </q-avatar>
            </router-link>
            Admin dashboard
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
        <q-list>
            <q-item-label header class="text-bold text-black">
                Polja
            </q-item-label>
            <!-- veze za druge stranice podlayouta-->
            <div class="q-pa-sm col">
                <router-link to="kategorije" class="link-style" @click="toggleLeftDrawerClose">
                    <q-btn class="flex flex-center" color="positive" style="width: 280px">
                        Kategorije
                    </q-btn>
                </router-link>
            </div>
            <div class="q-pa-sm col">
                <router-link to="racuni" class="link-style" @click="toggleLeftDrawerClose">
                    <q-btn class="flex flex-center" color="positive" style="width: 280px">
                        Računi
                    </q-btn>
                </router-link>
            </div>
            <div class="q-pa-sm col">
                <router-link to="pregledkorisnika" class="link-style" @click="toggleLeftDrawerClose">
                    <q-btn class="flex flex-center" color="positive" style="width: 280px">
                        Pregled korisnika
                    </q-btn>
                </router-link>
            </div>
            <div class="q-pa-sm col">
                <router-link to="/" class="link-style" @click="toggleLeftDrawerClose">
                    <q-btn class="flex flex-center" color="negative" style="width: 280px">
                    Izlazak
                    </q-btn>
                </router-link>
            </div>
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view/>
      </q-page-container>
  
    </q-layout>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>