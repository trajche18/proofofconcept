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

            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title>
                  <!--pay attention to the title, make it focusable-->
                  <h2 class="secondary--text" aria-label="Please sign-up." role="heading"> Sign Up </h2>
                </v-card-title>
              </v-flex>
            </v-layout>

            <v-container>
              <!--Prevent the default submit action for the signedUp method-->
              <form @submit.prevent="signedUp">

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Your e-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="emailRules"
                      autofocus
                      required
                      hint="Enter your email"
                      aria-required="true"
                      aria-label="The email text field is automatically selected. Enter your email address">
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Your Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      required
                      hint="Password must be at least 6 characters"
                      aria-required="true"
                      aria-label="Enter your password. Password must be at least 6 characters">
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                      hint="Confirm password"
                      aria-required="true"
                      aria-label="Confirm your password.">
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-checkbox
                  role="checkbox"
                  aria-checked="false"
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree with the terms and conditions in order to continue.']"
                  label="I agree to the Terms and Conditions"
                  aria-label="You must agree with the terms and conditions in order to continue. Press space to agree."
                  required>
                </v-checkbox>
                <!--aria-required="true" is not used, since I tested it with a colleague and it seems like this tag leads to misunderstanding-->

                <v-layout row>
                  <v-flex xs12>
                    <!--Loading animation implemented in the button. Bind to :loading and :disabled, which are stored in store/index.js (as  mutations that are later get from the getters)-->
                    <v-btn
                      type="submit"
                      class="secondary"
                      :disabled="loading"
                      :loading="loading"
                      aria-pressed="false"
                      aria-label="Sign up. You will be automatically logged in into your account.">
                      Sign Up
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
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ],
        confirmPassword: '',
        checkbox: false
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Your passwords does not match' : true
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
