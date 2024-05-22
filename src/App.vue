<template>
  <div id="app" class="Hello">
    
      <nav>
        <!-- <router-link to="/create">Crear</router-link> -->
        <router-link to="/read">Leer</router-link>
       <!--  <router-link to="/update">Actualizar</router-link>
        <router-link to="/delete">Eliminar</router-link>   -->
      <router-view/>
      </nav>
  </div>

</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
