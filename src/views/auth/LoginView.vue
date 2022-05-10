<template>
  <h1>Ingresar (login)</h1>

  <label for="">Ingrese Correo:</label> <br>
  <input type="email" v-model="usuario.email">
  <br>
  <label for="">Ingrese Contraseña:</label> <br>
  <input type="password" v-model="usuario.password">

<br>
  <button @click="ingresar()">Ingresar</button>

  {{ datos }}

</template>

<script>
import * as authService from "../../services/auth.service"

export default {
    data(){
        return {
            datos: "",
            usuario: {email: "admin3@mail.com", password: "admin54321"}
        }
    },
    methods: {
        async ingresar(){
            const res = await authService.loginConLaravel(this.usuario);
            console.log(res)
            this.datos = res.data
        }
    }

}
</script>

<style>

</style>