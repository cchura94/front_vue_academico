<template>
<div class="card">
  <h3>Asignacion materias</h3>
  <strong>Nombres: </strong> {{persona.nombres}}
  <strong>Apellidos: </strong> {{persona.apellidos}}
  <strong>Ci / Nit: </strong> {{persona.ci_nit}}

</div>
<div class="card">
     <h5>Carrera</h5>
     <Dropdown v-model="datos.carrera" :options="carreras" optionLabel="nombre" optionValue="id" placeholder="Seleccionar Carrera" @change="seleccionado()" />

    
     <MultiSelect v-model="datos.materias" :options="materias" optionLabel="nombre" optionValue="id" placeholder="Seleccionar Materia" />
    <InputText type="text" v-model="datos.rol" />

    
    <Button label="Asignar" @click="asignarMaterias()" />
    <!--pre>{{ datos }}</pre-->
</div>
<div class="card">
    <DataTable v-if="persona" :value="persona.materias" responsiveLayout="scroll">
            <Column field="id" header="Id"></Column>
            <Column field="nombre" header="Nombre Materia"></Column>
            <Column field="sigla" header="Sigla"></Column>
            <Column field="pivot.nota" header="Nota"></Column>
        </DataTable>
</div>
</template>

<script>
import * as personaService from "../../../services/persona.service.js"
import * as materiaService from './../../../services/materia.service.js'
import * as carreraService from './../../../services/carrera.service.js'

export default {
    data(){
        return {
            persona: {},
            carreras: [],
            materias: [],
            datos: {
                carrera: null,
                materias: null,
                gestion: 1,
                rol: 'Estudiante'

            }
        }
    },
    async mounted(){
        this.mostrarPersona();

        const carr = await carreraService.listar();
        this.carreras = carr.data

    },
    methods:{
        async asignarMaterias(){
            await personaService.asignarMaterias(this.datos, this.$route.params.id)
        },
        async mostrarPersona(){
            const {data} = await personaService.mostrar(this.$route.params.id)
            this.persona = data
        },
        async seleccionado(){
            // this.materias = datos.carrera
            console.log(this.datos.carrera)
            const {data} = await carreraService.mostrar(this.datos.carrera)
            this.materias = data.materias;
        }
    }

}
</script>

<style>

</style>