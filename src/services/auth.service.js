import { http } from './http'

/*
export function login(datos){
    fetch("http://127.0.0.1:8000/api/v1/auth/login", datos).then(
        (res) => {
            console.log(res)        
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
}
*/
export const loginConLaravel = function (datos){
    return http().post('/v1/auth/login', datos);
    /*axios.post("http://127.0.0.1:8000/api/v1/auth/login", datos).then(
        (res) => {
            console.log(res) 
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )*/
}

export const perfil = function (){
    return http().get('/v1/auth/perfil');
}

export const logout = () => {

}

export const actualizarPerfil = function(data){
    return http().post("/user/cambiar-perfil", data)
}
