<template>
  <v-container>
    <v-layout row wrap>
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
            <div> {{blog.intro}} </div>
          </v-card-text>

          <v-card-text>
            <div> {{blog.content}} </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="secondary" to="/signup">
              Sign up
            </v-btn>
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
      }
    }
  }
</script>

<style scoped>

</style>
