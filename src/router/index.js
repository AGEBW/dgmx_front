import Vue from 'vue';
import Router from 'vue-router';
import Read from '../components/Read_Component/Read.vue';
import UserLogin from '../components/Login_Component/UserLogin.vue';
import UserRegister from '../components/Login_Component/UserRegister.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/read', component: Read },
   
  ]
});
