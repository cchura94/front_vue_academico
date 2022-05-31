import { http } from './http'

export function listar(){
    return http().get("/gestion");
}

export function guardar(datos){
    return http().post("/gestion", datos);
}

export function modificar(id, datos){
    return http().put("/gestion/"+id, datos);
}

export function mostrar(id){
    return http().get("/gestion/"+id);
}

export function eliminar(){
    return http().delete("/gestion/"+id);
}

export function cambiarGestion(id){
    return http().post("/gestion/"+id+"/cambiar-gestion");
}