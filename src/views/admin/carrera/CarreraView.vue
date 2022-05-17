<template>
    <div class="card">
        <h1>Carreras</h1>

        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="positionDialog"></ConfirmDialog>

        <Button label="Nueva Carrera" icon="pi pi-external-link" @click="openModal" />
        <Dialog :header="(edit)?'Editar Carrera':'Nueva Carrera'" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="grid p-fluid">
                <div class="col-12 md:col-12">
                    <InputText placeholder="Ingrese Nombre" v-model="carrera.nombre" />                    
                </div>
                <div class="col-12 md:col-12">
                    <Textarea rows="3" cols="30" v-model="carrera.detalle" />                  
                </div>
            </div>

            
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarCarrera()" autofocus />
            </template>
        </Dialog>

         <DataTable :value="lista_carreras" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="Detalle"></Column>
            <Column field="materias" header="Materias">                
                <template #body="{data}">
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-help" @click="redireccionar(data.id)"/>
                </template>
            </Column>
            <Column header="Acciones">                
                <template #body="{data}">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editarModalCarrera(data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="eliminar(data)" />
                </template>
            </Column>
        </DataTable>

    </div>  
</template>

<script>

import { ref, onMounted } from 'vue';
import * as carrearService from './../../../services/carrera.service.js'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from 'vue-router'

export default {
    setup(){
        const router = useRouter()
        const route = useRoute()

        const lista_carreras = ref();
        const displayModal = ref(false);
        const carrera = ref({
            nombre: "",
            detalle: ""
        })
        const edit = ref(false)
        const idEditar = ref()
        const confirm = useConfirm();
        const toast = useToast();
        
        onMounted(async () => {
            // carrearService.listar().then(res => lista_carreras.value = res.data)
            listarCarrera();
        });

        const openModal = () => {
            displayModal.value = true;
        };

        const closeModal = () => {
            displayModal.value = false;
        }

        const listarCarrera = async () => {
            const {data} = await carrearService.listar();
            lista_carreras.value = data;
        }

        const guardarCarrera = async () => {
            if(edit.value){
                const {data} = await carrearService.modificar(idEditar.value, carrera.value);
            }else{

                console.log(carrera.value)
                const {data} = await carrearService.guardar(carrera.value);
            }

            listarCarrera();
            closeModal();
            idEditar.value = 0
            edit.value = false
            carrera.value = {nombre: '', detalle: ''}
        }

        const editarModalCarrera = (data) => {
            idEditar.value = data.id
            edit.value = true
            carrera.value = data
            displayModal.value = true;
        };

        const eliminar = (data) => {
            let id = data.id
            confirm.require({
                message: '¿Esta seguro de eliminar la carrera?',
                header: 'Confirmar eliminación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                    await carrearService.eliminar(5);
                    toast.add({severity:'info', summary:'Confirmado', detail:'Eliminado', life: 3000});
                },
                reject: () => {
                    toast.add({severity:'error', summary:'Cancelado', detail:'Cancelado', life: 3000});
                }
            });
        }

        const redireccionar = (id) => {
           
            router.push(`/admin/carrera/${id}`)
        }



        return {
            lista_carreras,
            displayModal,
            openModal,
            closeModal,
            guardarCarrera,
            carrera,
            editarModalCarrera,
            edit,
            eliminar,
            redireccionar
        };
    }
}
</script>
