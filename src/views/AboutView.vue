<template>
  <div class="card" v-if="perfil">
    <h1>Mi Perfil</h1>
    <h5>Nombre: {{perfil.name}}</h5>
    <h5>Correo: {{perfil.email}}</h5>

  </div>
</template>

<script>
import * as authService from "./../services/auth.service.js"
export default {
  data(){
    return {
      perfil: null
    }
  },
  async mounted(){
    const {data} = await authService.perfil()
    this.perfil = data
  }

}
</script>

<style>

</style>
