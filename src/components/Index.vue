<template>
  <v-container>

    <!--Button layout -->
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn
          large
          to="/blogs"
          class="secondary"
          aria-label="Press enter to View all blogs">View Blogs
        </v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn
          large
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
          aria-label="Loading blogs. Please wait."
          aria-live="assertive"
          aria-atomic="true"
          onfocus
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <!--Carousel(header) layout. Only show this component IF loadingAnimation IS NOT loading. So only when firebase has loaded the blog-data-->
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <!--hid the delimiters & controls from the carousel. Used aria-atomic to indicate that the carousel consists of more components (more blogs within the carousel)-->
        <!--Used aria-live="assertive" to indicate that, when the state of the carousel changes, each change gets presented immediately to the end user, opposed to "polite" where we first wait for the label to be read and afterwards the content when users hover-over (since there is only one component: the hover message)-->
        <v-carousel
          style="cursor: pointer"
          tabindex="0"
          aria-atomic="true"
          aria-live="polite"
          hide-delimiters
          hide-controls>
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
          <!--aria-current=true Represents the current item within a set.-->
          <v-combobox
            role="combobox"
            aria-autocomplete="list"
            aria-label="Please select one of the following by using the arrow keys and pressing enter afterwards"
            v-model="select"
            :items="items"
            label="Select a favorite activity or create a new one">
          </v-combobox>
        </v-flex>
      </v-layout>
    </v-container>

    <!--the tooltip widget-->
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-hover close-delay="2000">
            <v-card
              slot-scope="{ hover }"
              class="mx-auto"
              color="grey lighten-4"
              max-width="600">

              <!--aria-live='polite' indicate that there is more than 1 element (the hover-content in this situation). Polite means that the screenreader should 1st wait for the first element to be read (the label of the Elon-img), and afterwards read the second element (the content when the user hovers)-->
              <v-img
                aria-describedby="imgDescription"
                tabindex="0"
                :aspect-ratio="16/9"
                aria-haspopup="true"
                aria-live="polite"
                src="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/09/29/104740719-GettyImages-855370048-elon-musk.530x298.jpg?v=1544455606">

                <!--the css-class="hidden" is in this situation crucial, because the heading h2 actually has value and needs to be hidden from the human eye-->
                <h2 id="imgDescription"
                    class="hidden">
                  A tooltip is shown. A picture of the futurist Elon Mask is visualized within the
                  tooltip-component. On hover, one of his famous quotes is revealed: I could either
                  watch it happen or be a part of it. Tab to read more!</h2>

                <v-expand-transition>
                  <!--aria-atomic='true' -> Assistive technologies will present the entire changed region= "hover" as a whole, including the author-defined label if one exists.-->
                  <div
                    aria-atomic="true"
                    aria-expanded="true"
                    v-if="hover"
                    class="wrap xs12 sm10 md8 offset-sm1 offset-md2 transition-fast-in-fast-out secondary darken-2 v-card--reveal display-1 white--text"
                    style="height: 100%; width: 100%"
                    aria-label="You just hovered over the component">
                    "I could either watch it happen or be a part of it." <br><br> -Elon Musk
                  </div>
                </v-expand-transition>
              </v-img>

              <v-card-text
                class="pt-4"
                style="position: relative;">
                <h2 class="font-weight-light black--text  mb-2" tabindex="0">Tesla Taken in Space!</h2>
                <h3 class="display-1 font-weight-light secondary--text mb-2" tabindex="0">Elon Musk, the CEO of Tesla and SpaceX, and his team made this historical moment happen.</h3>
                <h3 class="font-weight-light  mb-2" tabindex="0">
                  The 2008-model Roadster was previously used by Musk for commuting to work, and is the first production car in space.</h3>

                <v-btn
                  to="blogs/-LTNL_uPHWxpF2LAJqqS"
                  absolute
                  color="secondary"
                  class="white--text"
                  fab
                  large
                  right
                  top
                  aria-label="Press enter to read full blog">
                  <v-icon>notes</v-icon>
                </v-btn>
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
        // get data from featured (sliced to blogs)
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
    bottom: 0;
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

  .hidden {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
