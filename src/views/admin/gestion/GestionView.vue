<template>
  <div class="card">
        <h1>Gestiones</h1>

        <Toast />

        <ConfirmDialog></ConfirmDialog>
        <Button @click="confirm1()" icon="pi pi-check" label="Confirm" class="mr-2"></Button>

        <Button label="Nueva gestion" icon="pi pi-external-link" @click="nuevoGestion()" />
        <Dialog header="Nueva Gestion" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="grid p-fluid">
                <div class="col-12 md:col-12">
                    <InputText placeholder="Ingrese Gestion" v-model="gestion.gestion" />                    
                </div>
                <div class="col-12 md:col-12">
                    <Textarea rows="3" cols="30" v-model="gestion.detalle" />                  
                </div>
            </div>

            
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarGestion()" autofocus />
            </template>
        </Dialog>

        <DataTable :value="gestiones" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="gestion" header="GESTION"></Column>
            <Column field="detalle" header="Detalle"></Column>
            <Column field="estado" header="ESTADO">                
                <template #body="{data}">
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-help" @click="confirm1(data.id)"/>
                    <Badge v-if="data.estado" value="activo" class="mr-2"></Badge>
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
import * as gestionService from "./../../../services/gestion.service.js"

export default {
    data(){
        return {
            gestiones: [],
            gestion: {
                gestion: 2022,
                detalle: '',
                estado: false
            },
            displayModal: false

        }
    },
    mounted(){
        this.listarGestiones();
    },
    methods: {
        async listarGestiones(){
            const {data} = await gestionService.listar();
            this.gestiones = data;
        },
        async guardarGestion() {
            try{
                const { data } = await gestionService.guardar(this.gestion)
                this.listarGestiones();
            }catch(error){
                console.log(error)
            }
        },
        nuevoGestion(){
            this.displayModal = true;
        },
         confirm1(id) {
            this.$confirm.require({
                message: 'Está seguro de cambiar la gestion?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    console.log(id)
                    await gestionService.cambiarGestion(id);
                    this.$toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
                    this.listarGestiones()
                },
                reject: () => {
                    console.log(id)
                    this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                    this.listarGestiones()
                }
            });
        },

    }

}
</script>
