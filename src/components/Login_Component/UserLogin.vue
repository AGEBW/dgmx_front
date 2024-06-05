
  <template>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          type="password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
      </v-container>
  
      <v-divider></v-divider>
  
      <v-card-actions  class="justify-center">
        <v-btn color="success" @click="login()">
          Login
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

  <script>
  import AuthService from '../Login_Component/auth';
  
  export default {
    name: 'UserLogin_',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        AuthService.login({ email: this.email, password: this.password }).then(
          () => {
            this.$router.push('/read');
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  };
  </script>
  
