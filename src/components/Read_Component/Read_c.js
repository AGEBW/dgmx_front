import { 
  mdiFileEdit, 
  mdiDelete, 
  mdiEye,
  mdiClockTimeEight,
  mdiCheckCircle,
  mdiPlusCircle,
  mdiAlphaXCircle  
} from '@mdi/js';
import {User, Homework}  from '@/Models/Read_models';
import Swal from 'sweetalert2';
import auth from '../Login_Component/auth.js';
export default {
  
  name: 'Read_',
  
  
  data() {
    return {

        path1:mdiFileEdit,
        path2:mdiDelete,
        path3:mdiEye,
        path4:mdiClockTimeEight ,
        path5:mdiCheckCircle ,
        path6:mdiPlusCircle,
        path7:mdiAlphaXCircle ,

      headers: [
        { text: 'ID', value: 'id' , style: 'color: red;' },
        { text: 'Nombre', value: 'name', style: 'color: blue;' },
        { text: 'Email', value: 'email', style: 'color: blue;' },
        { text: 'Total', value: 'total', style: 'color: blue;' },
        { text: 'Pendientes', value: 'stand_by', style: 'color: blue;' },
        { text: 'Acciones', value: 'actions', style: 'color: blue;' },
      
      ],
      items:[],
      user_d: new User(),
      modalDelete:false,
      modalUser:false,
      modalOpen: false,
      modalEdit:false,
      modalEditU:false,
      enableUser:false,
      show: false,
      selectedRecord: new User(),
      selectedWork: new Homework(),
      id_user:'',
      id_homework:'',
      user:new User(),
      edit:false,
    };
  },

  watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    },

  methods: {
    
    async fetchDataFromAPI() {
      try {
        const response = await this.$http.get('http://127.0.0.1:8000/api/datos');
        this.items = response.data.response
        console.log(this.items)
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    },

    async sendDelete() {
      try {
        const response = await this.$http.post('http://127.0.0.1:8000/api/delete',{id:this.id_homework});
        this.items = response.data.response
        console.log(this.items)
        Swal.fire({
          icon: 'success',
          title: '¡Cambio realizado!',
          showConfirmButton: false,
          timer: 1500 // Duración en milisegundos antes de cerrar automáticamente
        });
        this.fetchDataFromAPI()
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    },

    async sendDeleteU(id) {
      try {
        await this.$http.post('http://127.0.0.1:8000/api/deleteU',{id:id});
        Swal.fire({
          icon: 'success',
          title: '¡Cambio realizado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.fetchDataFromAPI();
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    },

    async sendData(){
      try{
        const response = await this.$http.post('http://127.0.0.1:8000/api/update',this.selectedWork);
        console.log(response.data)
        Swal.fire({
          icon: 'success',
          title: '¡Cambio realizado!',
          showConfirmButton: false,
          timer: 1500 // Duración en milisegundos antes de cerrar automáticamente
        });
      }catch(error){
        console.error('Error al obtener datos de la API:', error);
      }
    },

    addUser(){
      this.user_d.terms=true;
      auth.register(this.user_d,1).then(res=>{
        console.log(res);
        this.fetchDataFromAPI();
        this.modalUser=false;
      }).catch(error=>{
        console.log('error:',error);
      });
    },

    viewUser(){
      this.modalUser=true;
    },

    editUser(){
      this.enableUser=true;
    },

    updateUser(){
    this.selectedRecord.terms=1;
    auth.register(this.selectedRecord,1).then(res=>{
      console.log(res);
      this.fetchDataFromAPI();
      this.modalEdit=false;
    }).catch(error=>{
      console.log('error:',error);
    });
    },

    disableUser(){
      this.enableUser=false;
    },

    viewItem(item) {
      this.selectedRecord = item;
      this.id_user=item.id;
      this.modalOpen = true;
    },

    viewHomework(item) {
      this.selectedWork=item;
      this.modalEdit = true;
      console.log('contenido en objeto',this.selectedWork)
    },
    
    newHomework(item){
      this.modalEdit=true;
      this.selectedWork={};
      this.selectedWork.id_user=item.id;
      this.editP();
      console.log('contenido de select nuevo',this.selectedWork)
    },

    createHomework(){
      
      Swal.fire({
        title: 'Atencion',
        text: '¿Estás seguro guardar los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
         console.log('hizo la accion')
         this.selectedWork.id_user= this.id_user;
         this.selectedWork.status=this.selectedWork.status!=0?this.selectedWork.status:0;
         this.modalEdit=false;
         this.modalOpen=false;
         this.sendData();
        }
      });
      console.log('datos a enviar',this.selectedWork);
    },

    cleanHomework(){
      this.modalEdit=false;
      this.selectedWork={};
    },

    deleteItem(item) {
      this.modalDelete = true;
      this.selectedRecord = item;
        console.log(item)
    },

    deleteData(item){
      this.id_homework =item.id
      Swal.fire({
        title: 'Atencion',
        text: '¿Estás seguro de eliminar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('id para eliminar',this.id_homework)
          this.sendDelete();
         }
      });
      console.log('datos a enviar',this.selectedWork);
    },
    deleteDataU(item){
      Swal.fire({
        title: 'Atencion',
        text: '¿Estás seguro de eliminar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sendDeleteU(item.id);
         }
      });
    },

    updateStatus() {
      this.selectedWork.status != this.selectedWork.status;
      console.log(this.selectedWork.status)
    },
     editP() {
      this.edit = !this.edit;
    },

  },
  
  mounted() {
    this.fetchDataFromAPI();
  }
};