<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Programacion de actividades DGMX</v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main>
      <v-container >
        
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>