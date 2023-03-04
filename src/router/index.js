import { createRouter, createWebHistory } from 'vue-router';
import { routesConfig } from '@/common/routesConfig';

const routes = [
  {
    path: routesConfig.HOME,
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ "@/views/HomeView.vue")
  },
  {
    path: routesConfig.ADD_POST,
    name: 'addPost',
    component: () => import(/* webpackChunkName: "newpost" */ "@/views/AddPostView.vue")
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ "@/views/PostView.vue")
  },
  {
    path: routesConfig.SIGNIN,
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ "@/views/SigninView.vue")
  },
  {
    path: routesConfig.SIGNUP,
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ "@/views/SignupView.vue")
  },
  {
    path: routesConfig.ABOUT,
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: routesConfig.NOT_FOUND,
    name: 'PageNotfound',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { HOME, SIGNIN, SIGNUP, ABOUT } = routesConfig;
  const publicPages = [HOME, SIGNIN, SIGNUP, ABOUT];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next(routesConfig.SIGNIN);
  }
  
  next()
});

export default router
