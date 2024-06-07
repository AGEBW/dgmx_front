<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>{{ user_data.name ? user_data.name : '' }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <svg-icon color="white" type="mdi" :path="user_i"></svg-icon>
          </v-btn>
        </template>
        <v-list style="background-color: #1976D2; color: white;">
          <v-list-item @click="viewUser">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div style="display: flex; align-items: center;">
                  <v-list-item-title>
                    <svg-icon v-on="on" color="white" type="mdi" :path="user_i"></svg-icon>
                  </v-list-item-title>
                  <span style="color:white">User</span>
                </div>
              </template>
            </v-tooltip>
          </v-list-item>
          <v-list-item @click="logout">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div style="display: flex; align-items: center;">
                  <v-list-item-title>
                    <svg-icon v-on="on" color="white" type="mdi" :path="logout_i"></svg-icon>
                  </v-list-item-title>
                  <span style="color:white">Logout</span>
                </div>
              </template>
            </v-tooltip>
          </v-list-item>
        </v-list>
        
      </v-menu>
    </v-app-bar>

    
    <v-main>
      <v-container class="justify-center" >
        
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn  v-bind="attrs" v-on="on" class="mx-2" fab dark small color="success" @click="viewUser()">
            <v-icon dark>{{ path6 }}</v-icon>
          </v-btn>
          </template>
          <span>Add User</span>
        </v-tooltip>
    

      <v-container>
        <!-- Imagen transitoria -->
        <v-expand-transition>
          <v-img
            v-if="showImage"
            src="https://pngimg.com/uploads/welcome/welcome_PNG12.png"
            class="my-4"
            max-height="200"
            contain
          ></v-img>
        </v-expand-transition>

        <!-- Tabla de datos -->
        
        </v-container>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark small color="primary" v-bind="attrs" v-on="on" @click="viewItem(item)">
              <v-icon dark>{{ path3 }}</v-icon>
            </v-btn>
            </template>
            <span>View </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark small color="red"  v-bind="attrs" v-on="on" @click="deleteDataU(item)">
              <v-icon dark>{{ path2 }}</v-icon>
            </v-btn>
          </template>
          <span>Delete </span>
        </v-tooltip>

          </template>
        </v-data-table>

        <!-- Modal para añadir/editar tareas -->
        <v-dialog v-model="modalEdit" max-width="320" persistent>
          <v-card>
            <v-container>
              <v-text-field
                label="Work"
                v-model="selectedWork.homework"
                :disabled="!edit"
              ></v-text-field>
              <v-textarea
                v-model="selectedWork.details"
                label="Details"
                :disabled="!edit"
              ></v-textarea>
              <v-row v-if="selectedWork.id" align="center" justify="center">
                <v-col cols="6">
                  <v-switch
                    v-model="selectedWork.status"
                    color="primary"
                    hide-details
                    :disabled="!edit"
                    @change="updateStatus"
                  ></v-switch>
                </v-col>
                <v-col cols="auto">
                  <v-label
                    :class="{
                      'green--text': selectedWork.status,
                      'yellow--text': !selectedWork.status
                    }"
                  >
                    <b>{{ selectedWork.status ? 'Concluido' : 'Pendiente' }}</b>
                  </v-label>
                </v-col>
              </v-row>
              <v-divider class="mt-3"></v-divider>
              <v-btn v-if="!edit" @click="editP()" class="white--text primary">Edit</v-btn>
              <v-btn v-if="edit" @click="createHomework()" class="white--text primary">Save</v-btn>
              <v-btn style="margin-left: 5px;" type="submit" @click="cleanHomework()" class="white--text red">Cancel</v-btn>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- Modal detalles usuario -->
        <v-dialog v-model="modalOpen" max-width="400px">
          <v-card>
            <v-img height="50px" width="100px" class="rounded-circle mx-auto d-block" :src="selectedRecord.image" cover></v-img>
            <v-divider class="mt-3"></v-divider>
            <v-container>
              <v-row no-gutters class="justify-center">
                <v-col cols="9">
                  <v-text-field :disabled="!enableUser" label="Nombre" v-model="selectedRecord.name" ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-center">
                <v-col cols="9">
                  <v-text-field :disabled="!enableUser"  label="Email" v-model="selectedRecord.email"  ></v-text-field>
                </v-col>
              </v-row>
              <div v-if="enableUser">
                <v-row no-gutters class="justify-center">
                  <v-col cols="9">
                    <v-text-field label="password" v-model="selectedRecord.password" type="password" ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters class="justify-center">
                  <v-col cols="9">
                    <v-text-field label="password confirms" v-model="selectedRecord.password_confirmation" type="password"></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <v-row no-gutters class="justify-center">
                <v-col cols="9">
                  <v-text-field v-if="!enableUser" label="Count Earrings" :value="selectedRecord.stand_by" readonly></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="!enableUser" class="justify-center">
                <v-list lines="three">
                  <v-list-item v-for="(n, index) in selectedRecord.homew" :key="n.id">
                    <v-list-item-content>
                      <v-simple-table dense class="w-100">
                        <thead>
                          <tr>
                            <th class="text-left" style="width: 10%">#</th>
                            <th class="text-left" style="width: 50%">Works</th>
                            <th class="text-left" style="width: 10%">Status</th>
                            <th class="text-left" style="width: 30%">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="number-circle">{{ index + 1 }}</span></td>
                            <td><span class="ml-3">{{ n.homework }}</span></td>
                            <td>
                              <template v-if="n.status == 0">
                                <svg-icon color="yellow" type="mdi" :path="path4"></svg-icon>
                              </template>
                              <template v-else>
                                <svg-icon color="green" type="mdi" :path="path5"></svg-icon>
                              </template>
                            </td>
                            <td>
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                              <v-btn icon small  v-bind="attrs" v-on="on" @click="viewHomework(n)"><svg-icon color="blue" type="mdi" :path="path1"></svg-icon></v-btn>
                              </template>
                              <span>View User</span>
                              </v-tooltip>

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                              <v-btn icon small  v-bind="attrs" v-on="on" @click="deleteData(n,0)"><svg-icon color="red" type="mdi" :path="path2"></svg-icon></v-btn>
                              </template>
                              <span>Delete</span>
                              </v-tooltip>

                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-container>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
              </div>
            </v-expand-transition>
            <v-card-actions class="justify-center">
             

              <v-tooltip bottom v-if="enableUser">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  class="white--text blue" v-bind="attrs" v-on="on" @click="updateUser()"><v-icon dark>{{ path1 }}</v-icon></v-btn>
                </template>
                <span>Edit User</span>
              </v-tooltip>
              
              <v-tooltip bottom v-if="!enableUser">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  class="white--text orange" v-bind="attrs" v-on="on" @click="editUser()"><v-icon dark>{{ path1 }}</v-icon></v-btn>
                </template>
                <span>Edit User</span>
              </v-tooltip>
              
              <v-tooltip bottom v-if="!enableUser">
                <template v-slot:activator="{ on, attrs }">
                <v-btn  class="white--text blue" v-bind="attrs" v-on="on" @click="newHomework(selectedRecord)"><v-icon dark>{{ path6 }}</v-icon></v-btn>
                </template>
                <span>Add Homework</span>
              </v-tooltip>

              <v-tooltip bottom v-if="!enableUser">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  class="white--text red" v-bind="attrs" v-on="on" @click="modalOpen = false"><v-icon dark>{{ path7 }}</v-icon></v-btn>
                </template>
                <span>Cancel</span>
              </v-tooltip>
              <v-tooltip bottom v-if="enableUser">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  class="white--text red" v-bind="attrs" v-on="on" @click="disableUser"><v-icon dark>{{ path7 }}</v-icon></v-btn>
                </template>
                <span>Editar User</span>
              </v-tooltip>

            <!--   <v-btn v-if="enableUser" class="white--text blue" @click="updateUser()"><v-icon dark>{{ path1 }}</v-icon></v-btn>
              <v-btn v-if="!enableUser" class="white--text orange" @click="editUser()"><v-icon dark>{{ path1 }}</v-icon></v-btn>
              <v-btn v-if="!enableUser" class="white--text blue" @click="newHomework(selectedRecord)"><v-icon dark>{{ path6 }}</v-icon></v-btn>
              <v-btn v-if="!enableUser" class="white--text red" @click="modalOpen = false"><v-icon dark>{{ path7 }}</v-icon></v-btn>
              <v-btn v-if="enableUser" class="white--text red" @click="disableUser"><v-icon dark>{{ path7 }}</v-icon></v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="modalUser" max-width="400px">
          <v-card>
            <v-card-title class="d-flex flex-column align-items-center">
              <v-img
                height="50px"
                width="100px"
                class="rounded-circle mx-auto d-block"
                :src="selectedRecord.image"
                cover
              ></v-img>
              <h3 class="new-user-title">New User</h3>
              <v-divider class="mt-3"></v-divider>
            </v-card-title>
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
                placeholder="Enter your password"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="user_d.password_confirmation"
                color="primary"
                label="Password"
                placeholder="Enter your password"
                variant="underlined"
              ></v-text-field>
              
            <!--   <v-switch
              v-model="user_d.terms"
              label="I agree to site terms and conditions"></v-switch> -->
        
            </v-container>
            
         <v-card-actions  class="justify-center">
            <v-btn color="success" @click="addUser()">
          Add  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
          </v-card>
        </v-dialog>  
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ReadMixin from './Read_c.js';

export default {
  name: 'Read_',
  mixins: [ReadMixin],
  data() {
    return {
      showImage: true,
    };
  },
  mounted() {
    // Ocultar la imagen después de 5 segundos
    setTimeout(() => {
      this.showImage = false;
    }, 5000);
  },
 
};
</script>


<style scoped>
.number-circle {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #42a5f5;
  color: white;
  text-align: center;
  font-weight: bold;
}
.ml-3 {
  margin-left: 1rem;
  margin-top: 3px;
}
.w-100 {
  width: 100%;
}
.my-4 {
  margin: 1.5rem 0;
}
.scroll-table {
  max-height: 300px;
  overflow-y: auto;
}
.swal2-popup {
  font-family: 'MyCustomFont', sans-serif;
}
.new-user-title {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5; 
  margin-top: 16px;
  text-align: center;
}
.v-list {
  background-color: #1976D2;
}
.v-list-item {
  color: white;
}
.v-menu__content--fixed {
  background-color: transparent;
  box-shadow: none;
}
/* Estilo para el texto de los elementos de la lista */
.v-list-item-title {
  color: white; /* Color blanco para el texto */
  font-weight: bold; /* Texto en negritas */
}
</style>