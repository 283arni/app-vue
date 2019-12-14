<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="sm-8">
        <h1>New orders</h1>
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="Title"
            name="title"
            v-model="title"
            :rules="[v => !!v || 'Password is required']"
            required
          />

          <v-textarea
            id="description"
            label="Description"
            name="description"
            v-model="description"
            :rules="[v => !!v || 'Password is required']"
            required
          />
        </v-form>
        <v-btn
          color="light-blue lighten-3"
          class="ma-2 white--text"
          @click="clickUpload"
        >
          Upload
          <input ref="fileInput" type="file" class="d-none" accept="image/*" @change="changeImg">
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>

        <v-row>
          <v-col>
            <img :src="imageSrc" alt="Картинка" v-if="imageSrc" height="100">
          </v-col>
        </v-row>

        <v-switch v-model="promo" label="Add to promo" color="light-blue lighten-3"></v-switch>
        <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn 
            @click="sendForm" 
            class="light-blue lighten-3 white--text" 
            x-large="" :disabled="!valid || !image || loading" 
            :loading="loading"
            >send</v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      valid: false,
      promo: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters.load
    }
  }
  ,
  methods: {
    sendForm() {
      if(this.$refs.form.validate() && this.image) {
        const val = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image          
        }

        this.$store.dispatch('newAdvert', val)
          .then(() => {
            this.$router.push('/all')
          })
          .catch(() => {})
      }
    },
    clickUpload() {
      this.$refs.fileInput.click()
    },
    changeImg(event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>