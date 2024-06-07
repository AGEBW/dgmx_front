import { User } from '@/Models/Read_models';
import Swal from 'sweetalert2';
import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/api/';
const user_data = JSON.parse(localStorage.getItem('user'));

class AuthService {
  UserData = new User;
  async login(user) {
    return axios
      .post(API_URL + 'login', {email: user.email,password: user.password})
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          console.log(user_data);
        }
        return response.data;
      });
  }

  async logout(router) {
    Swal.fire({
      title: 'Advice',
      text: 'Are you sure to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        router.push('/');
       }
    });
  }

  async register(user, flag) {
    if (!user.terms) {
      this.messagef('warning', '!Oh no¡', 'You need to accept the Terms and Conditions');
      return Promise.reject('Terms not accepted');
    }

    try {
      const response = await axios.post(API_URL + 'register', user);
      if (response.data.status === 200) {
        console.log('contenido de respuesta', response.data);
        this.messagef('success', '!Welcome a board¡', 'Register Succesful');
        if (flag !== 1) {
          return response.data;
        }
      } else {
        this.messagef('warning', '!Oh no¡', response.data.response);
        return Promise.reject(response.data.response);
      }
    } catch (error) {
      this.messagef('error', '!Oh no¡', 'Registration Failed');
      return Promise.reject(error);
    }
  }

  messagef(icono,titulo,texto){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      showConfirmButton: false,
      timer: 1500 // Duración en milisegundos antes de cerrar automáticamente
    });
  }
}

export default new AuthService();
