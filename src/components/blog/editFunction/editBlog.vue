<template>
  <v-dialog width="450px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator" class="secondary mb-1">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              <h4 class="secondary--text"> Edit Blog </h4>
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
                placeholder="Here comes the blog's title"
                counter="50"
                autofocus=true
                v-model="editedTitle"
                required
                aria-required="true">
              </v-text-field>

              <v-textarea
                name="intro"
                id="intro"
                placeholder="Write an intro for your blog"
                height="100"
                box=true
                counter="100"
                v-model="editedIntro"
                required>
              </v-textarea>

              <v-textarea
                name="content"
                id="content"
                placeholder="Start writing your blog"
                height="250"
                box=true
                v-model="editedContent"
                required>
              </v-textarea>

            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-btn flat class="secondary" @click="saveEditedBlog">
          Save
        </v-btn>
        <v-btn flat outline @click="editDialog = false">
          Close
        </v-btn>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    name: 'editBlog',
    props: ['blog'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.blog.title,
        editedContent: this.blog.content,
        editedIntro: this.blog.intro
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
          id: this.blog.id,
          title: this.editedTitle,
          content: this.editedContent,
          intro: this.editedIntro
        })
      }
    }
  }
</script>

<style scoped>

</style>
