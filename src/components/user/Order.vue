<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="md-6">
        <h1>Order</h1>
        <v-progress-circular
          v-if="loading"
          :size="100"
          :width="4"
          color="purple"
          indeterminate
        ></v-progress-circular>
        <v-list
          v-else-if="!loading && orders.length !== 0"
          two-line
        >

          <v-list-item-group
            multiple
          >
            <v-list-item
              v-for="order of orders"
              :key="order.id"
            >
              <v-list-item-action>
                <v-checkbox
                  color="light-blue lighten-3"
                  v-model="order.done"
                  @change="markItem(order)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{order.name}}</v-list-item-title>
                <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" :to="'/advert/'+ order.advertId" >open</v-btn>
              </v-list-item-action>
            </v-list-item>

          </v-list-item-group>
        </v-list>
        <div v-else>
          <h2>You have no orders</h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.load
    },
    orders() {
      return this.$store.getters.orders
    }
  },
  methods: {
    markItem(order) {
      this.$store.dispatch('markOrder', order.id)
      .then(() => {
        order.done = true
      })
      .catch(()=>{})
      
    }
  },
  created() {
    this.$store.dispatch('getOrders')
  }
}
</script>