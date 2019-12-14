<template>
  <v-container  v-if="!loading">
    <v-row>
      <v-col>
        <v-card>
          <v-img contain="" height="300" :src="advert.imageSrc"></v-img>
          <v-card-title>{{advert.title}}</v-card-title>
          <v-card-text>{{advert.description}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <editModal :advert='advert' v-if="owner"></editModal>
            <modalBuy :advert='advert'></modalBuy>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-else style="height: 100%">
    <v-container style="height: 100%">
      <v-row style="height: 100%">
        <v-col class="d-flex justify-center align-center">
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-col>  
      </v-row>  
    </v-container>
  </div>
</template>

<script>
import editModal from './EditModal'
export default {
  components:  {
    editModal
  },
  props: ['id'],
  computed: {
    advert() {
      return this.$store.getters.advertById(this.id)
    },
    loading() {
      return this.$store.getters.load
    },
    owner() {
      return this.advert.ownerId === this.$store.getters.user.id
    }
  }
}
</script>