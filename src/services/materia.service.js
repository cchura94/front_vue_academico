import { http } from './http'

export function listar(){
    return http().get("/materia");
}

export function guardar(datos){
    return http().post("/materia", datos);
}

export function modificar(id, datos){
    return http().put("/materia/"+id, datos);
}

export function mostrar(id){
    return http().get("/materia/"+id);
}

export function eliminar(){
    return http().delete("/materia/"+id);
}