<template>
  <div>
    <h1>Componente de lectura</h1>
    <v-app>
      <v-container>
       <v-data-table
  :headers="headers"
  :items="items"
  class="elevation-1"
>
  <!-- Contenido para añadir imagen que proviene de una URL -->
    <!-- <template v-for="(header) in headers" v-slot:[`item.${header.value}`]="{ item }">
        <div :key="header.value + '-' + item.id">
        <template v-if="header.value === 'image'">
            <v-img   class="rounded-circle mx-auto d-block" :src="item.image" :alt="item.name" height="50px" width="50px"></v-img>
        </template>
        <template v-else>
            {{ item[header.value] }}
        </template>
        </div>
    </template> -->
  <!-- Contenido para añadir botones de acciones -->
    <template v-slot:[`item.actions`]="{ item }">
        <div>
      <!--   <v-btn class="mx-2" fab dark small color="red" @click="deleteItem(item)">
            <v-icon dark>{{ path2 }}</v-icon>
        </v-btn> -->
        <v-btn class="mx-2" fab dark small color="primary" @click="viewItem(item)">
            <v-icon dark>{{ path3 }}</v-icon>
        </v-btn>
        </div>
    </template>
</v-data-table>

  <!-- Modal para añadir/ editar tareas -->
  <template>
    <v-dialog v-model="modalEdit"  max-width="320" persistent>
      <v-card>
        <v-container class="bg-surface-variant">
          <v-text-field
            label="Tarea"
            v-model="selectedWork.homework"
            :value="selectedWork.homework"
            :disabled="!edit"
          ></v-text-field>

          <v-textarea
            v-model="selectedWork.details"
            label="Detalles"
            :value="selectedWork.details"
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
            </v-col>
            <v-col cols="auto">
              <v-label
              v-bind:class="{
                'green--text': selectedWork.status,
                'yellow--text': !selectedWork.status
              }"
              > <b>
                {{ selectedWork.status ? 'Concluido' : 'Pendiente' }}
              </b>
              </v-label>
            </v-col>
          </v-row>
          <v-divider class="mt-3"></v-divider>
          
            <v-btn
              v-if="!edit"
              @click="editP()"
              class="white--text primary" 
            >
            Editar
            </v-btn>
          
            <v-btn
              v-if="edit"
              @click="createHomework()"
              class="white--text primary" 
            >
            Guardar
            </v-btn>

          
        
          <v-btn
          style="margin-left: 5px;"
          type="submit" 
          @click="cleanHomework()"
          class="white--text red" 
          >
           Cancelar
          </v-btn>
        
            </v-container>
      </v-card>
  
  
  
     
    </v-dialog>
  </template>


        <!-- Modal detalles usuario -->
        <v-dialog v-model="modalOpen"  max-width="400px">
          <v-card>
             <v-img
        height="50px"
        width="100px"
         class="rounded-circle mx-auto d-block"
        :src="selectedRecord.image"
        cover
    ></v-img>

    <v-divider class="mt-3"></v-divider>

  <v-container class="bg-surface-variant">
        <v-row no-gutters class="justify-center">
          <v-col cols="9">
            <v-responsive
            class="mx-auto"
            max-width="344"
          >
          <v-text-field
          label="Nombre"
            :value="selectedRecord.name"
            readonly
          ></v-text-field>
        </v-responsive>
          </v-col>
        </v-row>

        <v-row no-gutters class="justify-center">
          <v-col cols="9">
            <v-responsive
            class="mx-auto"
            max-width="344"
          >
          <v-text-field
          label="Email"
            :value="selectedRecord.email"
            readonly
          ></v-text-field>
        </v-responsive>
          </v-col>
        </v-row>

        <v-row no-gutters class="justify-center">
          <v-col cols="9">
            <v-responsive
            class="mx-auto"
            max-width="344"
          >
          <v-text-field
          label="Conteo de Pendientes"
            :value="selectedRecord.stand_by"
            readonly
            
          ></v-text-field>
        </v-responsive>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-list lines="three">
            <v-list-item
              v-for="(n, index) in selectedRecord.homew"
              :key="n.id"
            >
                <v-list-item-content>
                  <v-simple-table dense class="w-100">
                    <thead>
                      <tr>
                        <th class="text-left"  style="width: 10%" >#</th>
                        <th class="text-left"  style="width: 50%">Homework</th>
                        <th class="text-left"  style="width: 10%">Status</th>
                        <th class="text-left"  style="width: 30%">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span class="number-circle">{{ index + 1 }}</span>
                        </td>
                        <td>
                          <span class="ml-3">{{ n.homework }}</span>
                        </td>
                        <td>
                          <template v-if="n.status == 0">
                            <svg-icon color="yellow" type="mdi" :path="path4"></svg-icon>
                          </template>
                          <template v-else>
                            <svg-icon color="green" type="mdi" :path="path5"></svg-icon>
                          </template>
                        </td>
                        <td>
                          <v-btn icon small @click="viewHomework(n)" >  <svg-icon color="blue" type="mdi" :path="path1"></svg-icon></v-btn>
                          <v-btn icon small @click="deleteData(n)">  <svg-icon color="red" type="mdi" :path="path2"></svg-icon></v-btn>
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
      <v-btn class="white--text blue" @click="newHomework(selectedRecord)">Añadir</v-btn>   
      <v-btn class="white--text red" @click="modalOpen = false">Cancelar</v-btn>   
    </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import ReadMixin from './Read_c.js';

export default {
  name: 'Read_',
  mixins: [ReadMixin],
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
.scroll-table {
  max-height: 300px; /* Altura máxima del contenedor */
  overflow-y: auto; /* Agrega scrollbar vertical si el contenido excede la altura */
}


.swal2-popup {
  font-family: 'MyCustomFont', sans-serif;
}
</style>