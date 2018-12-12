<template>
  <v-container>
    <h3 class="hidden" aria-label="Overview of the published blogs:"></h3>


    <!--Show loading animation while blogs from firebase are loaded & visualized-->
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="secondary"
          v-if="loading"
          aria-label="Loading blogs"
          onfocus
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <!--For-loop to show the blogs in the card (blogOverview, url: /blogs) -->
    <v-layout row wrap v-for="blog in blogs" :key="blog.id" class="mb-3">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>


              <v-flex xs5 sm4 md3>
                <v-responsive>
                  <!--Show the right image. Bind (with ':') the corresponding image, through the stored blog.imageURL-->
                  <v-img
                    href="#" tabindex="0"
                    :src="blog.imageURL"
                    height="130px"
                    :alt="blog.imageDescription">
                  </v-img>
                </v-responsive>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h1 class="hidden" id="blogTitle" aria-label="Blog title:"></h1>
                    <h2 class="white--text mb-0" tabindex="0" aria-describedby="blogTitle">{{blog.title}} </h2>

                    <h3 class="hidden" id="blogIntro" aria-label="Introduction of the blog:"></h3>
                    <h4 tabindex="0" aria-describedby="blogIntro">{{blog.intro}}</h4>

                    <h3 class="hidden" id="datePublished" aria-label="Date published"></h3>
                    <!-- pipeline date is for the better, locale supported, date-format -->
                    <div tabindex="0" aria-describedby="datePublished">{{blog.date | date}}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <!--Bind the 'read more' button to the corresponding blog, through the blogID-->
                  <v-btn flat :to="'/blogs/' + blog.id" aria-label="Press enter to read full blog!">
                    <v-icon>arrow_forward</v-icon>
                    Read More
                  </v-btn>

                  <v-btn flat to="" aria-label="Share this blog with your friends!">
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
      },
      loading () {
        // get the stored loading getter from store/index.js
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .hidden {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

</style>
