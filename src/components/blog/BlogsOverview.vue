<template>
  <v-container>
    <!--For-loop to show the blogs in the card (blogOverview, url: /blogs) -->
    <v-layout row wrap v-for="blog in blogs" :key="blog.id" class="mb-3">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>

              <v-flex xs5 sm4 md3>
                <v-card-media>
                  <!--Show the right image. Bind (with ':') the corresponding image, through the stored blog.imageURL-->
                  <v-img
                    :src="blog.imageURL"
                    height="130px"
                  ></v-img>
                </v-card-media>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2 class="white--text mb-0">{{blog.title}} </h2>
                    <h4>{{blog.intro}}</h4>
                    <!-- pipeline date is for the better, locale supported, date-format -->
                    <div>{{blog.date | date}}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <!--Bind the 'read more' button to the corresponding blog, through the blogID-->
                  <v-btn flat :to="'/blogs/' + blog.id">
                    <v-icon>arrow_forward</v-icon>
                    Read More
                  </v-btn>

                  <v-btn flat to="">
                    <v-icon>arrow_forward</v-icon>
                    Share Blog
                  </v-btn>
                </v-card-actions>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'BlogOverview',
    computed: {
      blogs () {
        return this.$store.getters.loadedBlogs
      }
    }
  }
</script>

<style scoped>

</style>
