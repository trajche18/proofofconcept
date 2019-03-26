<template>
  <v-app :dark="toggleDarkTheme"><h1></h1>
    <v-navigation-drawer
      temporary=""
      v-model="sideNav"
      fixed
      mobile-break-point
      role="menuitem"
      aria-orientation="vertical"
    >

      <v-list dense>
        <!--These are the items in the burger-menu. It is triggered to be shown if the app is resized to mobile resolution -->
        <!--Set hidden for the screen reader, since there are 2 nav-bars (burger menu(this one) and the actual nav-bar. -->
        <v-list-tile
          @click=""
          v-for="item in menuFunctions"
          :key="item.content"
          :to="item.link"
          role="menuitem"
        >
          <!--role="menuitem" -> If this tag is used, then the TAB-navigation gets interrupted when tabbing out the last btn-component off the card,
          that is why i combined it with tabindex="-1", to make it untabbable-->

          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>{{item.content}}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userAuthenticated" @click="onSignOut" aria-hidden="false" role="menuitem">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Log Out</v-list-tile-content>
        </v-list-tile>

        <v-spacer></v-spacer>
        <v-switch tabindex="-1" dense :label="`Dark Theme`" v-model="toggleDarkTheme"></v-switch>

      </v-list>
    </v-navigation-drawer>

    <!--This will be the 'dynamic' navBar incl. all the items -->
    <!--The burgerMenu will be shown only on small(smartphone) devices AND The items on the standard navBar will ne hidden on these small devices.-->
    <v-toolbar class="toolbarColor" role="menu" aria-orientation="horizontal">

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
                     aria-label="Welcome to the blog app. Press tab to navigate through the menu">Accessibility
        </router-link>
      </v-toolbar-title>

      <!--Colors can be managed in src/main.js -->
      <!--Burgermenu icon -->
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        tabindex="0"
        aria-label="Tap to expand the menu items"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn role="menuitem"
               flat
               v-for="item in menuFunctions"
               :key="item.content"
               :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.content}}
        </v-btn>

        <v-btn flat v-if="userAuthenticated" @click="onSignOut" role="menuitem" aria-label="Log Out" aria-hidden="false">
          <v-icon left>exit_to_app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
      <!-- -->
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
        // the menu-components are made dynamic, linked to the corresponding route (page)
      }
    },
    name: 'App',
    computed: {
      menuFunctions () {
        // if user not authenticated: visualize 'Read Blogs' and 'Login/Signup'
        let menuFunctions = [
          {icon: 'insert_comment', content: 'Blogs', link: '/blogs'},
          {icon: 'face', content: 'Sign Up', link: '/signup'},
          {icon: 'lock_open', content: 'Log In', link: '/login'}
        ]
        if (this.userAuthenticated) {
          // if user is authenticated, then open functions: 'Blogs', 'Create new Blog' and 'See My Profile'
          menuFunctions = [
            //  { icon: 'clear_all', content: 'View Blog', link: '/blog/:id' }, // niet nodig? Moet binnen '/blogs' zijn
            {icon: 'insert_comment', content: 'Blogs', link: '/blogs'},
            {icon: 'clear_all', content: 'Create Blog', link: '/blog/new'},
            {icon: 'account_circle', content: 'User', link: '/profile'}
          ]
        }
        return menuFunctions
      },
      // user is Auth when user.uid already exists
      userAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onSignOut () { // call signOut() from store/index.js
        this.$store.dispatch('signOut')
        this.$router.push('/') // redirect to the homepage after 'Log Out' is licked
      }
    }
  }
</script>
