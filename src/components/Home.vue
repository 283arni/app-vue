<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="slid of promoSlid"
          :key="slid.id"
          class="center"
        >
        <v-img
        :src="slid.imageSrc"
        height="100%"
        contain
        >

        </v-img>
          <v-sheet tile>
            <v-btn 
              rounded
              outlined
              large 
              class="btn-link mb-4"
              :to="'/advert/' + slid.id"
            >
              Add {{slid.title}}</v-btn>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="slid of slids"
          :key="slid.id"
          class="pa-2"
        >
          <v-card
            class="mx-auto d-flex flex-column justify-space-between"
            max-width="400"
            height="100%"
            
          >
            <v-img
              class="orange--text align-end"
              :src="slid.imageSrc"
              style="flex: 1"
              contain
            >
              <v-card-title>{{slid.title}}</v-card-title>
            </v-img>
            <v-card-text class="text--primary" style="flex: 2">
              <div>{{slid.description}}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="orange"
                text
                :to="'/new/' + slid.id"
              >
                Open
              </v-btn>

              <modalBuy :advert='slid'></modalBuy>  
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
export default {
  computed: {
    promoSlid() {
      return this.$store.getters.promoSlid
    },
    slids() {
      return this.$store.getters.slids
    },
    loading() {
      return this.$store.getters.load
    }
  }
}
</script>

<style lang="scss" scoped>

  .btn-abs {
    position: relative;
  }

  .btn-link {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%)
  }

</style>