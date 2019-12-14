<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="aside">
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="link of pages"
          :key="link.header"
          :to="link.page"
          link
        >
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{link.header}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="loginTrue"
          @click="logOut"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-arrow-right-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon @click="aside = !aside" class="d-sm-flex d-md-none"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" class="pointer" tag="span">Title</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items  class="d-none d-md-flex">
          <v-btn 
            v-for="link of pages"
            :key="link.header"
            :to="link.page"
            text
          >
            <v-icon left>{{link.icon}}</v-icon>
              {{link.header}}
          </v-btn>
          <v-btn
            v-if="loginTrue"
            @click="logOut"
            text
          >
            <v-icon left>mdi-clipboard-arrow-right-outline</v-icon>
              Log Out
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>
    </div>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <router-view></router-view>
    </v-content >
    <template v-if="err">
      <v-snackbar
        @input="closeErr"
        color="error"
        :multi-line="true"
        :timeout="5000"
        :value="true"
      >
        {{err}}
        <v-btn
          dark
          text
          @click="closeErr"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      aside: false,
    }
  },
  computed: {
    err() {
      return this.$store.getters.err
    },
    loginTrue() {
      return this.$store.getters.loginTrue
    },
    pages() {
      if(this.loginTrue) {
        return [
          {header:'new ad', icon: "mdi-tilde", page: '/new/:id'},
          {header:'order', icon: "mdi-book", page: '/order'},
          {header:'all', icon: "mdi-book-open-variant", page: '/all'},
        ]
      }
      return [
        {header:'open', icon: "mdi-lock-open", page: '/enter'},
        {header:'registration', icon: "mdi-face", page: '/reg'}
      ]
    }
  },
  methods: {
    closeErr() {
      this.$store.dispatch('resetErr')
    },
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>