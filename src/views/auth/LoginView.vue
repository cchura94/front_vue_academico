<template>
    <h1>{{ $store.getters.obtenerContador }}</h1>
    <h1>{{ $store.state.auth }}</h1>
    <button @click="$store.dispatch('incremetarContador')">Aumentar contador</button>
    <hr>
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
import { Buffer } from 'buffer'
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
            // codificar
            const base64 = Buffer.from(JSON.stringify(res.data)).toString('base64');
            // decodificar
            // Buffer.from(data, 'base64').toString('ascii');
            localStorage.setItem("auth", base64)
            this.$store.dispatch('login', res.data)

        }
    }

}
</script>

<style>

</style>