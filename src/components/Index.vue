<template>
  <v-container>

    <!--Button layout -->
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large
               to="/blogs"
               class="secondary"
               aria-label="Press enter to View all blogs">View Blogs
        </v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large
               to="/blog/new"
               class="secondary"
               aria-label="Press enter to create a new blog">Create a Blog
        </v-btn>
      </v-flex>
    </v-layout>

    <!--The indeterminate loading-animation from vuetify with my stored colors-->
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

    <!--Carousel(header) layout. Only show this component IF loadingAnimation IS NOT loading. So only when firebase has loaded the blog-data-->
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer" tabindex="0">
          <v-carousel-item
            v-for="blog in blogs"
            :key="blog.id"
            :src="blog.imageURL"
            :alt="blog.imageDescription"
            @click="onLoadBlog(blog.id)">
            <div class="title">
              {{blog.title}}
            </div>
            <div class="intro">
              {{blog.intro}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!--Paragraph layout -->
    <v-layout row wrap class="mt-4">
      <v-flex xs12 class="text-xs-center">
        <p>The blogs</p>
      </v-flex>
    </v-layout>

    <!--the combobox-->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-combobox
            aria-haspopup="listbox"
            aria-label="Please select one of the following by using the arrow keys"
            aria-autocomplete="list"
            aria-expanded="false"
            v-model="select"
            :items="items"
            label="Select a favorite activity or create a new one">
          </v-combobox>
        </v-flex>
      </v-layout>
    </v-container>

    <!--the on-hover widget-->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-hover close-delay="2000">
            <v-card
              slot-scope="{ hover }"
              class="mx-auto"
              color="grey lighten-4"
              max-width="600">
              <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">

                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    aria-label="Press tab to view this button">
                    Click to view this blog
                  </div>
                </v-expand-transition>

              </v-img>
              <v-card-text
                class="pt-4"
                style="position: relative;">

                <v-btn
                  absolute
                  color="orange"
                  class="white--text"
                  fab
                  large
                  right
                  top>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>

                <h2 class="font-weight-light secondary--text  mb-2">For the perfect meal</h2>
                <h3 class="display-1 font-weight-light orange--text mb-2">QW cooking utensils</h3>
                <h3 class="font-weight-light  mb-2">
                  Our Vintage kitchen utensils delight any chef.<br>
                  Made of bamboo by hand
                </h3>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

  </v-container>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        select: 'Programming',
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ]
      }
    },
    computed: {
      blogs () {
        // get data from featured (sliced 0 to 3) blogs
        return this.$store.getters.featuredBlogs
      },
      loading () {
        // get the stored loading getter from store/index.js
        return this.$store.getters.loading
      }
    },
    methods: {
      // navigate when user clicks the image on the header to the corresponding blogID
      onLoadBlog (id) {
        this.$router.push('/blogs/' + id)
      }
    }
  }
</script>

<!--use "-ms-device-fixed" if "text-align: center" is needed-->
<style scoped>
  .title {
    position: -ms-device-fixed;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    text-align: center;
  }

  .intro {
    position: absolute;
    bottom: 50px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
  }

  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
