<template>
    <div>
        <div class="card">
             <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nueva Persona" icon="pi pi-plus" class="p-button-success mr-2" @click="openNuevo" />
                    <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Importar" class="mr-2 inline-block" />
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>
        </div>

        <!--DataTable ref="dt" :value="personas" v-model:selection="selectedPersonas" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Gestion Personas</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
        </DataTable-->
        <DataTable v-if="personas" :value="personas.data" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="id" header="Id"></Column>
            <Column field="nombres" header="Nombre"></Column>
            <Column field="apellidos" header="Apellidos"></Column>
            
        </DataTable>    

        <Dialog v-model:visible="personaDialog" :style="{width: '450px'}" header="Nueva Persona" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombres</label>
                <InputText id="name" v-model.trim="persona.nombres" required="true" autofocus :class="{'p-invalid': submitted && !persona.nombres}" />
                <small class="p-error" v-if="submitted && !persona.nombres">El Nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="ap">Apellidos</label>
                <InputText id="ap" v-model.trim="persona.apellidos" required="true" autofocus :class="{'p-invalid': submitted && !persona.nombres}" />
                <small class="p-error" v-if="submitted && !persona.apellidos">El Apellido es requerido.</small>
            </div>
            <div class="field">
                <label for="cn">Ci/Nit</label>
                <InputText id="cn" v-model.trim="persona.ci_nit" required="true" autofocus :class="{'p-invalid': submitted && !persona.ci_nit}" />
                <small class="p-error" v-if="submitted && !persona.ci_nit">El ci_nit es requerido.</small>
            </div>
            <div class="field">
                <label for="cn">Dirección</label>
                <InputText id="cn" v-model.trim="persona.direccion" required="false" autofocus />
            </div>
            <div class="field">
                <label for="tel">Telefono</label>
                <InputText id="tel" v-model.trim="persona.telefono" required="false" autofocus />
            </div>
            

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="guardarPersona"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarPersona" />
            </template>
        </Dialog>

    </div>
  
</template>

<script>
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue';
import * as personaService from "../../../services/persona.service.js"
import { FilterMatchMode } from 'primevue/api';

export default {
    setup(){

        onMounted(async() => {
            const {data} = await personaService.listar()
            personas.value = data
        })

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

        const toast = useToast();
        // declarar datos
        const persona = ref({});
        const submitted = ref(false); 
        const personaDialog = ref(false);

        const personas = ref();
        const selectedPersonas = ref();
/*
        nombres
apellidos
ci_nit
direccion
telefono
user_id
*/

        // metodos
        const openNuevo = () => {
            persona.value = {};
            submitted.value = false;
            personaDialog.value = true;
        }

        const guardarPersona = async () => {
            submitted.value = true;
            if (persona.value.nombres) {
                    // modificar
                    // console.log("Prueba")
                await personaService.guardar(persona.value)
                toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                
            }else{
                console.log("Prueba")
                await personaService.guardar(persona.value)
                toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }
        }

        const test = () => {
            alert("Prueba")
        }

        return {
            openNuevo,
            personaDialog,
            persona,
            submitted,
            guardarPersona,
            test,
            personas,
            selectedPersonas,
            filters
        }
    }

}
</script>

<style>

</style>