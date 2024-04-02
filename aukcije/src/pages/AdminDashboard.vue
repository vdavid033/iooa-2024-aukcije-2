<template>
    <q-page class="bg-white">
        <div class=" q-px-xl">
            <h4>Upravljačka ploča administratora</h4>
        </div>
        <div class="q-px-xl q-gutter-lg">
            <q-btn class="q-px-lg" color="primary" label="Kategorije" to="/ErorrNotFound.vue"/>
            <q-btn class="q-px-lg" color="primary" label="Korisnički računi" to="/ErorrNotFound.vue" />
            <q-btn class="q-px-lg" color="primary" label="Aukcije" to="/ErorrNotFound.vue"/>
        </div>

        <!--ovo ce ici na poseban page kasnije-->
        <div class="column ">
            <div class="row">
                <h5>Unos kategorija</h5>
            </div>
            <div class="row">
                <q-card square bredered class="q-pa-md">
                    <q-card-section>
                        <q-form>
                            <q-input square filled v-model="naziv_kategorije" type="text" label="Naziv kategorije"/>
                            <div class="text-center"><q-btn size="lg" type="submit" label="Unesi kategoriju" class="color-primary"></q-btn></div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </div>

    </q-page>

    
</template>


<script>
    import { ref } from 'vue'

    export default {
    setup () {
        return {
        splitterModel: ref(150) // start at 150px
        }
    }
    }
</script>

<style>
.justify-center{
    justify-content: center;
}
</style>