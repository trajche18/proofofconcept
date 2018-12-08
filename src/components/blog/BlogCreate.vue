<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Create a Blog</h2>
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
                placeholder="Here comes the blog's title"
                counter="50"
                autofocus="true"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-3">
              <v-textarea
                name="content"
                id="content"
                placeholder="Start writing your blog"
                height="250"
                box="true"
                v-model="content"
                required>
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <v-textarea
                name="intro"
                id="intro"
                placeholder="Write an intro for your blog"
                height="150"
                box="true"
                counter="100"
                v-model="intro"
                required>
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <v-text-field
                name="imageURL"
                id="imgURL"
                placeholder="Enter image URL"
                v-model="imageURL"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
              <img :src="imageURL" height="180">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <!--btn disabled if !formCompleted | if all form-fields are filled, button becomes enabled/ clickable -->
              <v-btn class="secondary"
                     :disabled="!formCompleted"
                     type="submit"
              >Publish
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
        id: '',
        date: new Date()
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
