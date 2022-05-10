import axios from "axios"

const urlbase = "http://127.0.0.1:8000/api";

export function http(){
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer token',
        },
        timeout: 15000
    });

    // captura de errores
    // 401, 403

    return interceptor;
}