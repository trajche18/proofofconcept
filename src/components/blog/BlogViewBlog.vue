<template>
  <v-container>
    <!-- loading-animation for each blog-->
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="secondary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title="">
            <h2 class="secondary--text">{{blog.title}}</h2>
            <v-spacer></v-spacer>
            <!-- pipeline date is for the better, locale supported, date-format -->
            <h5 class="dateColor--text pt-2">date: {{blog.date | date}} </h5>
          </v-card-title>

          <v-card-media>
            <!--Bind the imageURL to the card-->
            <v-img
              :src="blog.imageURL"
              height="350px"
            ></v-img>
          </v-card-media>

          <!--optional. For visualizing the introduction that the user sees in the blog page (/blogs)-->
          <v-card-text class="primary--text">
            <div> {{blog.intro}}</div>
          </v-card-text>

          <v-card-text>
            <div> {{blog.content}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="userPublisher">
              <app-edit-blog-dialog :blog="blog"></app-edit-blog-dialog>
            </template>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'BlogViewBlog',
    // get blogID by props, which is later used to load the corresponding 'loadedBlog'
    props: ['id'],
    computed: {
      blog () {
        return this.$store.getters.loadedBlog(this.id)
      },
      userAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userPublisher () {
        if (!this.userAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.blog.userId
      },
      loading () {
        // get the stored loading getter from store/index.js
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
