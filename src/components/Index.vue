<template>
  <v-container>

    <!--Button layout -->
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large
               to="/blogs"
               class="secondary">View Blogs
        </v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large
               to="/blog/new"
               class="secondary">Create a Blog
        </v-btn>
      </v-flex>
    </v-layout>

    <!--Carousel(header) layout -->
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="blog in blogs"
            :key="blog.id"
            :src="blog.imageURL"
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
  </v-container>
</template>

<script>
  export default {
    name: 'Index',
    computed: {
      blogs () {
        // get data from featured (sliced 0 to 3) blogs
        return this.$store.getters.featuredBlogs
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
</style>
