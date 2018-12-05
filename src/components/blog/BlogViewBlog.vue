<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <v-card-title primary-title="">
            <h2 class="secondary--text">{{blog.title}}</h2>
            <v-spacer></v-spacer>
            <h5 class="dateColor--text pt-2">date: {{blog.date}} </h5>
          </v-card-title>

          <v-card-media>
            <v-img
              :src="blog.imageURL"
              height="350px"
            ></v-img>
          </v-card-media>

          <v-card-text>
            <div> {{blog.content}} </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="secondary" to="">
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
    name: 'blogWinter',
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
