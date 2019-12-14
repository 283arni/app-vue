<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="md-8" v-if="!loading && myAds.length !== 0">
        <h1>All ad</h1>
        <v-card 

          class="elevation-6 mb-5"
          v-for="slid of myAds"
          :key="slid.id"
        >
          <v-row class="d-block d-sm-flex">
            <v-col cols="sm-4">
              <v-img :src="slid.imageSrc"></v-img>
            </v-col>
            <v-col cols="sm-8" class="d-flex flex-column justify-space-between">
              <v-card-title>{{slid.title}}</v-card-title>
              <v-card-text>{{slid.description}}</v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/advert/' + slid.id">open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8" v-else-if="!loading && myAds.length === 0">
        <h1>You have no adverts</h1>
      </v-col>
      <v-col cols="8" v-else class="d-flex" justify="center">
        <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds
    },
    loading() {
      return this.$store.getters.load
    }
  }
}
</script>