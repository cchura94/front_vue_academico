<template>
  <!--
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

-->

<div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo electrónico</label>
                        <InputText id="email1" v-model="usuario.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordar</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Se te olvidó tu contraseña?</a>
                        </div>
                        <Button label="Ingresar" @click="ingresar()" class="w-full p-3 text-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import * as authService from "../../services/auth.service"
import { Buffer } from 'buffer'
export default {
    data(){
        return {
            datos: "",
            usuario: {email: "admin3@mail.com", password: "admin54321"},
            checked: false
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

            // redireccionar
            this.$router.push("/admin")

        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }

}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>