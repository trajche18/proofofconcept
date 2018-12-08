<template>
  <v-container>

    <!--if there is an error-->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <!--Pass the error that has a message via 'text' that is declared in alerts/Alert.vue (under props)-->
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <!--Prevent the default submit action-->
              <form @submit.prevent="signedUp">

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email"
                                  label="Your E-mail"
                                  id="email"
                                  v-model="email"
                                  type="email"
                                  autofocus="true"
                                  required>
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password"
                                  label="Your Password"
                                  id="password"
                                  v-model="password"
                                  type="password"
                                  required>
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="confirmPassword"
                                  label="Confirm Password"
                                  id="confirmPassword"
                                  v-model="confirmPassword"
                                  type="confirmPassword"
                                  :rules="[comparePasswords]">
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12> <!--Loading animation implemented in the button. Bind to :loading and :disabled, which are stored in store/index.js (as  mutations that are later get from the getters)-->
                    <v-btn type="submit" class="secondary" :disabled="loading" :loading="loading">Sign Up
                      <span slot="leader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>

              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'UserSignUp',
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Your password does not match' : ''
      },
      user () {
        // get stored value, from store/index.js and redirect user to '/'
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      signedUp () {
        // Vuex
        this.$store.dispatch('signUpUser', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    },
    watch: {
      // watch if the user-value (coming from store/index.js) is !null and !undefined. If it is not null and not undefined (with no errors), redirect the end-user to the home page
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
