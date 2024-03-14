<template>
    <q-page class="bg-blue window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h5 class="text-h3 text-white q-my-md">Prijava</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="ime_korisnika" type="ime_korisnika" label="Vaše korisničko ime" />
                <q-input square filled clearable v-model="password" type="lozinka" label="Lozinka" />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Prijava" />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <router-link to="Registracija_m" class="link-style">
            <p class="text-grey-6">Nemate račun? Registrirajte se!</p>
            </router-link>
              
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>

  </script>
  
  <style>
  .q-card {
    width: 360px;
  }
  </style>