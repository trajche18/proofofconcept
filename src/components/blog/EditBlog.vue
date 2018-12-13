<template>
  <v-dialog width="450px" persistent v-model="editDialog">
    <!--This is the editBtn users see in /blog/:id -> the global component: 'app-edit-blog-dialog' initialized in main.js-->
    <v-btn
      accent
      slot="activator"
      class="secondary mb-1"
      aria-haspopup="dialog"
      aria-expanded="true"
      aria-label="Press enter to edit this blog.">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              <!--pay attention to the title, make it focusable-->
              <h3 class="secondary--text" aria-label="Edit Blog Dialog Opened." role="heading"> Edit Blog </h3>
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                id="title"
                counter="50"
                autofocus
                v-model="editedTitle"
                required
                :rules="textfieldRules"
                aria-label="Edit the title of your blog. Current title is:"
                aria-required="true">
              </v-text-field>

              <v-textarea
                name="intro"
                id="intro"
                height="100"
                box
                counter="100"
                v-model="editedIntro"
                required
                :rules="textfieldRules"
                aria-label="Edit the intro of your blog. Current intro is:"
                aria-multiline="true"
                aria-required="true">
              </v-textarea>

              <v-textarea
                name="content"
                id="content"
                height="250"
                box
                v-model="editedContent"
                required
                :rules="textfieldRules"
                aria-label="Edit the content of your blog. Current blog content is:"
                aria-multiline="true"
                aria-required="true">
              </v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-card-actions>
          <a href="#" tabindex="0"
             aria-label="Press tab to close the dialog and discard changes. Press tab again to save changes"></a>
          <v-spacer></v-spacer>
          <v-btn flat outline @click="editDialog = false"
                 aria-label="Close this dialog. Changes won't be saved.">
            Close
          </v-btn>

          <v-btn
            flat :disabled="loading"
            :loading="loading"
            class="secondary"
            @click="saveEditedBlog"
            aria-label="Press to save changes. You will be automatically redirected back to your blog.">
            Save
          </v-btn>
        </v-card-actions>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditBlog',
    props: ['blog'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.blog.title,
        editedContent: this.blog.content,
        editedIntro: this.blog.intro,
        textfieldRules: [
          v => !!v || 'Please fill out this field'
        ]
      }
    },
    methods: {
      // check if all text-field are NOT empty and compare the data/input of each blog-obj
      saveEditedBlog () {
        // used trim() to remove any white spaces
        if (this.editedTitle.trim() === '' || this.editedContent.trim() === '' || this.editedIntro.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateBlogData', {
          id: this.blog.id, // unique blog.id stays the same in firebase
          title: this.editedTitle,
          content: this.editedContent,
          intro: this.editedIntro
        })
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
