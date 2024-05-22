import Vue from 'vue';
import Router from 'vue-router';
import Create from '../components/Create.vue';
import Read from '../components/Read_Component/Read.vue';
import Update from '../components/Update.vue';
import Delete from '../components/Delete.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/create', component: Create },
    { path: '/read', component: Read },
    { path: '/update', component: Update },
    { path: '/delete', component: Delete },
  ]
});
