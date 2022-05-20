import { http } from './http'

export function listar(page=1, rows=3){
    // return http().get("/persona/?orderby=id&q=&rows=3&page=1");
    return http().get(`/persona/?orderby=id&q=&limit=${rows}&page=${page}`);
}

export function guardar(datos){
    return http().post("/persona", datos);
}


export function modificar(datos, id){
    return http().put("/persona/"+id, datos);
}
