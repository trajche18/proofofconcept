<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" fixed>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>insert_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Blogs</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Welcome To My Blogs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>insert_comment</v-icon>
          Blogs
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>

    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false

    }
  },
  name: 'App'
}
</script>
