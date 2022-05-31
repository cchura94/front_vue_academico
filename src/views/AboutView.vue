<template>
  <div class="card" v-if="perfil">
    <h1>Mi Perfil</h1>
    <h5>Nombre: {{perfil.name}}</h5>
    <h5>Correo: {{perfil.email}}</h5>
    <hr>
    {{perfil.perfil}}
    <img :src="`${url}/${perfil.perfil}`" alt="" width="300">
    <hr>
    {{imagen_seleccionada}}
    <input type="file" @change="onImagenSeleccionada">
    <button @click="guardarPerfil()">Actualizar Perfil</button>
  </div>
</template>

<script>
import { urlbaseImagen } from "./../services/http.js"
import * as authService from "./../services/auth.service.js"
export default {
  data(){
    return {
      perfil: null,
      imagen_seleccionada: null,
      url: ''
    }
  },
  async mounted(){
    const {data} = await authService.perfil()
    this.perfil = data
    this.url = urlbaseImagen
  },
  methods: {
    onImagenSeleccionada(event){
      console.log(event.target.files[0])
      this.imagen_seleccionada = event.target.files[0]
    },
    async guardarPerfil(){
      
      let fd = new FormData;
      fd.append("user_id", this.perfil.id);
      fd.append("imagen", this.imagen_seleccionada);

      await authService.actualizarPerfil(fd);
    }
  }

}
</script>

<style>

</style>
