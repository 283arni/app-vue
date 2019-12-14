<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{on}">
      <v-btn color="orange" dark="" v-on="on">buy</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="primary--text" >
              You sure?
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Name"
                name="name"
                placeholder="Your name"
                :rules = "[v => !!v || 'Name is required']"
                v-model="name"
                required
              />

              <v-text-field
                label="Phone"
                placeholder="Your phone"
                :rules = "[v => !!v || 'Name is required']"
                name="phone"
                v-model="phone"
                required
              />
                   
            </v-card-text>
            <v-card-actions>
              <v-btn 
                outlined="" 
                @click="cancelModal"
                :disabled="localLoad"
              >
                cancel
              </v-btn>
              <v-btn 
                color="green" 
                dark 
                @click="saveModal"
                :loading="localLoad"
              >
                Buy now!
              </v-btn>
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
      name: '',
      phone: '',
      localLoad: false
    }
  },
  methods: {
    cancelModal() {
      this.name = ''
      this.phone = ''
      this.modal = false

    },
    saveModal() {
      if(this.name !== '' && this.phone !== '') {
        this.localLoad = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          advertId: this.advert.id,
          ownerId: this.advert.ownerId
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoad = false 
          this.modal = false
        })
      }
    }
  }
}
</script>