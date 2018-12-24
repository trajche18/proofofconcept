<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text" aria-label="Fill in all the fields to publish your new blog">Create a Blog</h2>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="submitCreatedBlog">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-2">
              <v-text-field
                name="title"
                id="title"
                counter="50"
                autofocus
                v-model="title"
                required
                :rules="textfieldRules"
                label="Blog title"
                hint="Please enter the title of your blog"
                aria-label="The Title Text-field is selected. Enter the title of your blog."
                aria-required="true">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-3">
              <v-textarea
                name="content"
                id="content"
                height="250"
                box
                v-model="content"
                required
                :rules="textfieldRules"
                label="Main blog content"
                hint="Begin writing your blog"
                aria-label="Start writing your blog"
                aria-multiline="true"
                aria-required="true">
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <v-textarea
                name="intro"
                id="intro"
                height="150"
                box
                counter="100"
                v-model="intro"
                required
                :rules="textfieldRules"
                label="Blog intro"
                hint="Write an introduction for your blog"
                aria-label="Write the introduction for your blog"
                aria-multiline="true"
                aria-required="true">
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <v-text-field
                name="imageURL"
                id="imgURL"
                v-model="imageURL"
                hint="Copy an img-URL from the internet and paste it here"
                required
                :rules="textfieldRules"
                label="Paste the IMG-URL"
                aria-label="Paste the URL of the chosen image in this text-field"
                aria-required="true">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1"
                    aria-label="Here is a preview of your chosen picture">
              <img :src="imageURL" height="180">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <v-text-field
                name="imageDescription"
                id="imageDescription"
                v-model="imageDescription"
                required
                :rules="textfieldRules"
                label="Image description"
                hint="Please describe the picture for the visually impaired"
                aria-label="Please describe the picture you have chosen. This will help the visually impaired users feel what the picture is about through your description. Press tab to publish blog."
                aria-required="true">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <!--btn disabled if !formCompleted | if all form-fields are filled, button becomes enabled/ clickable -->
              <v-btn
                class="secondary"
                :disabled="!formCompleted"
                type="submit"
                aria-label="Press enter to save changes and publish your blog. You will be redirected to your new blog afterwards.">
                Publish
              </v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    name: 'blogCreate',
    data () {
      return {
        title: '',
        content: '',
        intro: '',
        imageURL: '',
        imageDescription: '',
        id: '',
        date: new Date(),
        textfieldRules: [
          v => !!v || 'Please fill out this field'
        ]
      }
    },
    computed: {
      // formCompleted when textfields are not empty
      formCompleted () {
        return this.title !== '' && this.content !== '' && this.intro !== '' && this.imageURL !== ''
      }
    },
    methods: {
      submitCreatedBlog () {
        if (!this.formCompleted) {
          return
        }
        // JS-object to store data that is stored in data () above. This will be passed to the VuexStore
        // submit stored data
        const blogData = {
          title: this.title,
          content: this.content,
          intro: this.intro,
          imageURL: this.imageURL,
          imageDescription: this.imageDescription,
          id: this.id,
          date: new Date()
        }
        this.$store.dispatch('createBlog', blogData)
        this.$router.push('/blogs')
      }
    }
  }
</script>

<style scoped>

</style>
