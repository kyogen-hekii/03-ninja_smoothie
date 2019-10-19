import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import AddSmoothie from '@/components/AddSmoothie.vue';
import EditSmoothie from '@/components/EditSmoothie.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie,
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie,
    },
  ],
});
