<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>

          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                label="Login"
                name="login"
                :rules="nameRules"
                prepend-icon="mdi-face"
                type="text"
                v-model="login"
                required
              />

              <v-text-field
                id="password"
                label="Password"
                :rules="pasRules"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click='send' :disabled="!valid || loading" :loading="loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be a lot than 2 characters',
      ],
      pasRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be a lot than 6 characters',
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.load
    }
  },
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        const v = { 
          email: this.login,
          password: this.password
        }
        this.$store.dispatch('logTo', v)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  },
  created() {
    if(this.$route.query['loginError']) {
      this.$store.dispatch('setErr', 'Please to Log In')
    }
  }
}
</script>