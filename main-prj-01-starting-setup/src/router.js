import { createRouter, createWebHistory } from 'vue-router';
//import CoachDetails from './components/pages/coaches/CoachDetails.vue';
import CoachesList from './components/pages/coaches/CoachesList.vue';
//import CoachRegistration from './components/pages/coaches/CoachRegistration.vue';
//import ContactCoach from './components/pages/requests/ContactCoach.vue';
import RequestsReceived from './components/pages/requests/RequestsReceived.vue';
import NotFound from './components/NotFound.vue';
import UserAuth from './components/pages/auth/UserAuth.vue';
import store from './store/index.js';

//Vue router runs on client, not server.
const CoachDetails = () =>
  import('./components/pages/coaches/CoachDetails.vue'); //Dynamic routing. Download when necessary

const CoachRegistration = () =>
  import('./components/pages/coaches/CoachRegistration.vue');

const ContactCoach = () =>
  import('./components/pages/requests/ContactCoach.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, //coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }, //CatchAll
  ],
});

//global navigation guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth'); //redirect the user
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches'); //Cant test because entering an url clear the data
  } else {
    next();
  }
});

export default router;
