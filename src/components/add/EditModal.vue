<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{on}">
      <v-btn color="light-blue lighten-3" outlined="" v-on="on">edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="primary--text" >
              Edit advert
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Title"
                name="title"
                :rules = "[v => !!v || 'Name is required']"
                v-model="title"
                required
              />

              <v-textarea
                label="Description"
                :rules = "[v => !!v || 'Name is required']"
                name="description"
                v-model="description"
                
                required
              />
                   
            </v-card-text>
            <v-card-actions>
              <v-btn outlined="" @click="cancelModal">cancel</v-btn>
              <v-btn color="green" dark @click="saveModal">Ok</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['advert'],
  data() {
    return {
      modal: false,
      title: this.advert.title,
      description: this.advert.description
    }
  },
  methods: {
    cancelModal() {
      this.title = this.advert.title
      this.description = this.advert.description
      this.modal = false

    },
    saveModal() {
      if(this.title !== '' && this.description !== '') {
        this.$store.dispatch('updateAd', {
          title: this.title,
          description: this.description,
          id: this.advert.id
        })
        this.modal = false
      }
    }
  }
}
</script>