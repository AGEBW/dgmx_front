<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="User Registration"
  >
    <v-container>
      <v-text-field
        v-model="user_d.name"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="user_d.last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="user_d.email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="user_d.password"
        color="primary"
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="user_d.password_confirmation"
        color="primary"
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      
      <v-switch
      v-model="user_d.terms"
      label="I agree to site terms and conditions"></v-switch>

    </v-container>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn  color="success" @click="register()">
        Complete Registration
      </v-btn>
      <v-btn  color="primary" @click="register_v()">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import { User } from '@/Models/Read_models';
import AuthService from '../Login_Component/auth'
import { mdiCheckCircle } from '@mdi/js';
export default {
  name: 'UserRegister',
  data() {
    return {
      user_d:new User(),
      path5:mdiCheckCircle
    };
  },
  methods: {
    register() {
      AuthService.register(this.user_d,0).then(
        () => {
            this.$router.push('/');
          },
          error => {
            console.log(error);
          }
      );
    },
    register_v() {
        this.$router.push('/');
      
    }
  }
};
</script>