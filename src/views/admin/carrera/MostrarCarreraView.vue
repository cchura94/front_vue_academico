<template>
  <div class="card" v-if="carrera">
      <h1>{{ carrera.nombre }}</h1>
  </div>
  <div class="card">
      <Button label="Nueva Materia" icon="pi pi-external-link" @click="openModal()" />
        <Dialog header="Nueva Materia" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="grid p-fluid">
                <div class="col-12 md:col-12">
                    <InputText placeholder="Ingrese Nombre" v-model="materia.nombre" />                    
                </div>
                <div class="col-12 md:col-12">
                    <InputText placeholder="Ingrese sigla" v-model="materia.sigla" />                    
                </div>

            </div>

            
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarMateria()" autofocus />
            </template>
        </Dialog>

      <h5>Lista de Materias</h5>

       <DataTable v-if="carrera" :value="carrera.materias" responsiveLayout="scroll">
            <Column field="id" header="Id"></Column>
            <Column field="nombre" header="Nombre Materia"></Column>
            <Column field="sigla" header="Sigla"></Column>
        </DataTable>
  </div>
</template>

<script>
import * as carreraService from './../../../services/carrera.service.js'
import * as materiaService from './../../../services/materia.service.js'

export default {
    data(){
        return {
            id: 0,
            carrera: null,
            materia: {
                nombre: '',
                sigla: ''
            },
            displayModal: false
        }
    },
    async mounted(){
        this.listar();
    },
    methods: {
        async listar(){
            this.id = this.$route.params.id
            const { data } = await carreraService.mostrar(this.id);
            this.carrera = data
        },
        async guardarMateria(){
            this.materia.carrera_id = this.$route.params.id;

                const {data} = await materiaService.guardar(this.materia);
        
            this.listar()
            closeModal();
        },
        openModal() {
            this.displayModal = true;
        },

        closeModal(){
            this.displayModal = false;
        }
    }

}
</script>
