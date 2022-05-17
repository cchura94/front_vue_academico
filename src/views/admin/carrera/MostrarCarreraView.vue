<template>
  <div class="card">
      <h1>{{ carrera.nombre }}</h1>
  </div>
  <div class="card">
      <h5>Lista de Materias</h5>
       <DataTable :value="carrera.materias" responsiveLayout="scroll">
            <Column field="id" header="Id"></Column>
            <Column field="nombre" header="Nombre Materia"></Column>
            <Column field="sigla" header="Sigla"></Column>
        </DataTable>
  </div>
</template>

<script>
import * as carreraService from './../../../services/carrera.service.js'

export default {
    data(){
        return {
            id: 0,
            carrera: ''
        }
    },
    async mounted(){
        this.id = this.$route.params.id
        const { data } = await carreraService.mostrar(this.id);
        this.carrera = data
    }

}
</script>
