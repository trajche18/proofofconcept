<template>
  <v-container>
    <h3 class="hidden" aria-label="Currently viewing the blog:" role="heading"/>

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
            <h3 id="blogTitle" class="hidden" aria-label="Blog's title:"></h3>
            <h2 class="secondary--text" tabindex="0" aria-describedby="blogTitle">
              {{blog.title}}</h2>
            <v-spacer></v-spacer>
            <!-- pipeline date is for the better, locale supported, date-format -->
            <h5 class="dateColor--text pt-2" tabindex="0"> date published: {{blog.date | date}}. </h5>
          </v-card-title>

          <!--Use tabindex=0 to make component tabbable. In order to do this for an IMG, used <a href="#"> -->
          <v-responsive>
            <!--Bind the imageURL to the card-->
            <!--We can use 2 alternatives: aria-describedby="<here comes the bonded paragraphID>" OR use alt="<long text here>" -->
            <v-img
              tabindex="0"
              :src="blog.imageURL"
              :alt="blog.imageDescription"
              height="280px">
            </v-img>
            <!-- aria-describedby="p1" -->
            <!--<p hidden id="p1" aria-hidden="false"> This is the description that is used by aria-describedby</p>-->
          </v-responsive>

          <!--optional. For visualizing the introduction that the user sees in the blog page (/blogs)-->
          <v-card-text class="primary--text">
            <h3 id="blogIntro" class="hidden" aria-label="Blog's introduction:"></h3>
            <!--the css-class="hidden" is not mandatory in these situations, since the heading is empty-->
            <div tabindex="0" aria-describedby="blogIntro"> {{blog.intro}}</div>
          </v-card-text>

          <v-card-text>
            <h3 class="hidden" aria-label="The blog:"></h3>
            <div tabindex="0" aria-describedby="blogEnd"> {{blog.content}}</div>
            <h3 id="blogEnd" class="hidden" aria-label="This is the end of this blog."></h3>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="userPublisher">
              <!--Custom property 'app-edit-blog-dialog', coming from blog/EditBlog-->
              <app-edit-blog-dialog :blog="blog"></app-edit-blog-dialog>
            </template>
            <!--Loading animation implemented in the button. Bind to :loading and :disabled, which are stored in store/index.js (as  mutations that are later get from the getters)-->
            <v-btn
              flat
              to="/blogs"
              type="submit"
              aria-label="Go back to all blogs">
              Back
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
      },
      // only auth-user, who was the actual Publisher of the concrete blog could see the EDIT-blog button
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
  .hidden {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
