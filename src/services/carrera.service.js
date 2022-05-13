import { http } from './http'

export function listar(){
    return http().get("/carrera");
}

export function guardar(datos){
    return http().post("/carrera", datos);
}

export function modificar(id, datos){
    return http().put("/carrera/"+id, datos);
}

export function mostrar(id){
    return http().get("/carrera/"+id);
}

export function eliminar(){
    return http().delete("/carrera/"+id);
}