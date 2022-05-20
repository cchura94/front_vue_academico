import { http } from './http'

export function listar(){
    return http().get("/persona/?orderby=id&q=&limit=5&page=1");
}

export function guardar(datos){
    return http().post("/persona", datos);
}
