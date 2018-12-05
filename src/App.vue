<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" fixed>
      <v-list dense>
        <!--This is the burger-menu. It is triggered to be shown if the app is resized to mobile resolution -->
        <v-list-tile @click="" v-for="item in menuFunctions" :keys="item.description">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.description}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--This will be the 'dynamic' navBar incl. all the items -->
    <!--The burgerMenu will be shown only on small(smartphone) devices AND The items on the standard navBar will ne hidden on these small devices.-->
    <v-toolbar class="primary"> <!--Colors could be managed in App.vue -->
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Welcome To My Blogs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuFunctions" :keys="item.description">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.description}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-vue></router-vue>
      <!-- -->
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuFunctions: [
        { icon: 'insert_comment', description: 'My Blogs' },
        { icon: 'clear_all', description: 'Read Blog' },
        { icon: 'person', description: 'User' },
        { icon: 'face', description: 'Sign Up' },
        { icon: 'lock_open', description: 'Log In' }
      ]
    }
  },
  name: 'App'
}
</script>
