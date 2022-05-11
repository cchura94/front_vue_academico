import axios from "axios"
import { Buffer } from "buffer"

const urlbase = "http://127.0.0.1:8000/api";

export function http(){

    let auth = localStorage.getItem("auth");
    let token = ''
    if(auth){
        const authJson = JSON.parse(Buffer.from(auth, 'base64').toString('ascii'));
        token  = authJson.access_token
    }

    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        timeout: 15000
    });

    // captura de errores
    // 401, 403
    interceptor.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log("******///// ", error)
            if(error.response.status === 401){
                localStorage.removeItem("auth")
                window.location.href = "/login"
            }
        }
    )

    return interceptor;
}