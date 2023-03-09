import { createRouter, createWebHistory } from 'vue-router';
import { routesConfig } from '@/common/routesConfig';
import TokenService from '@/services/token.service';

const routes = [
  {
    path: routesConfig.HOME,
    name: 'home',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "home" */ "@/views/HomeView.vue")
  },
  {
    path: routesConfig.ADD_POST,
    name: 'addPost',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "newpost" */ "@/views/AddPostView.vue")
  },
  {
    path: '/post/:id',
    name: 'post',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "post" */ "@/views/PostView.vue")
  },
  {
    path: routesConfig.SIGNIN,
    name: 'signin',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "signin" */ "@/views/SigninView.vue")
  },
  {
    path: routesConfig.SIGNUP,
    name: 'signup',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "signup" */ "@/views/SignupView.vue")
  },
  {
    path: routesConfig.ABOUT,
    name: 'about',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: routesConfig.NOT_FOUND,
    name: 'PageNotfound',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { ADD_POST } = routesConfig;
  const publicPages = [ADD_POST];
  const authRequired = publicPages.includes(to.path);
  const accessToken = TokenService.getLocalAccessToken();
  const iserInfo = TokenService.getLocalUserInfo();

  if (authRequired && !(accessToken && iserInfo)) {
    return next(routesConfig.SIGNIN);
  }
  
  return next();
});

export default router
