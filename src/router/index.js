import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BlogsOverview from '@/components/blog/BlogsOverview'
import BlogViewBlog from '@/components/blog/BlogViewBlog'
import BlogCreate from '@/components/blog/BlogCreate'
import UserProfile from '@/components/user/UserProfile'
import UserSignUp from '@/components/user/UserSignUp'
import UserLogIn from '@/components/user/UserLogIn'
import AuthGuard from './authGuard'

Vue.use(Router)

/* router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
}) */

export default new Router({
  // default vue-mode is /#/. I used the 'history' mode to get rid of the hashtag, which will give our URL a more natural look
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: 'The homepage of the application'
      }
    },
    {
      path: '/blogs',
      name: 'BlogsOverview',
      component: BlogsOverview,
      meta: {
        title: 'Blog overview'
      }
    },
    {
      path: '/blog/new',
      name: 'BlogCreate',
      component: BlogCreate,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Create a blog'
      }
    },
    {
      path: '/blogs/:id',
      name: 'BlogViewBlog',
      props: true,
      component: BlogViewBlog,
      meta: {
        title: 'View blog'
      }
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Your profile'
      }
    },
    {
      path: '/signup',
      name: 'UserSignUp',
      component: UserSignUp,
      meta: {
        title: 'Sign-up page'
      }
    },
    {
      path: '/login',
      name: 'UserLogIn',
      component: UserLogIn,
      meta: {
        title: 'Log-in page'
      }
    }
  ]
})
