import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BlogsOverview from '@/components/blog/BlogsOverview'
import BlogViewBlog from '@/components/blog/BlogViewBlog'
import BlogCreate from '@/components/blog/BlogCreate'
import UserProfile from '@/components/user/UserProfile'
import UserSignUp from '@/components/user/UserSignUp'
import UserLogIn from '@/components/user/UserLogIn'

Vue.use(Router)

export default new Router({
  // default vue-mode is /#/. I used the 'history' mode to get rid of the hashtag, which will give our URL a more natural look
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/blogs',
      name: 'BlogsOverview',
      component: BlogsOverview
    },
    {
      path: '/blog/new',
      name: 'BlogCreate',
      component: BlogCreate
    },
    {
      path: '/blogs/:id',
      name: 'BlogViewBlog',
      props: true,
      component: BlogViewBlog
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/signup',
      name: 'UserSignUp',
      component: UserSignUp
    },
    {
      path: '/login',
      name: 'UserLogIn',
      component: UserLogIn
    }
  ]
})
