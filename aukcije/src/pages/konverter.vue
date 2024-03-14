<template>
  <q-card class="q-pa-sm flex justify-center">
    <div class="q-pa-xl q-gutter-xl">
      <input type="file" @change="onFileChange" />
      <q-input label="Unesi link slike" type="text" v-model="imageUrl" />
      <q-btn @click="convertImage">Konvertiraj u Base64</q-btn>
      <q-separator></q-separator>
      <div v-if="base64Image">
        <img :src="base64Image" />
        <q-separator></q-separator>
        <q-btn class="flex-flex-center" label="Kopiraj u međuspremnik" @click="copyToClipboard" />
        <div class="q-pa-sm" style="max-width: 700px; overflow-wrap: break-word">
          data:image/jpg;base64,{{ base64Text }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      base64Image: null,
      base64Text: null,
      imageUrl: "",
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async convertImage() {
      if (!this.file && !this.imageUrl) {
        return alert("Molimo odaberite sliku ili unesite URL slike.");
      }

      if (this.imageUrl) {
        try {
          const response = await fetch(this.imageUrl);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            this.base64Image = reader.result;
            this.base64Text = reader.result.replace(
              /^data:image\/[a-z]+;base64,/,
              ""
            );
          };
          reader.onerror = (error) => {
            console.error(error);
          };
        } catch (error) {
          console.error(error);
          return alert(
            "Došlo je do pogreške prilikom dohvaćanja slike s URL-a."
          );
        }
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.base64Image = reader.result;
          this.base64Text = reader.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
        };
        reader.onerror = (error) => {
          console.error(error);
        };
      }
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(
          "data:image/jpg;base64," + this.base64Text
        );
        alert("Tekst uspješno kopiran u međuspremnik!");
      } catch (err) {
        console.error(err);
        alert("Kopiranje nije uspjelo.");
      }
    },
  },
};
</script>
