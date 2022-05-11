import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 0,
    auth: null
  },
 
  mutations: {
    // modifica estados (state)
    aumentar(state){
      state.contador++;
    },
    actualizarAuth(state, usuario_token){
      state.auth = usuario_token
    }
  },
  actions: {
    // cambia o ejecuta la mutacion (mutation)
    incremetarContador(context){
      context.commit("aumentar")
    },
    login(context, u){
      context.commit("actualizarAuth", u)
    }
  },
  getters: {
    obtenerContador(state){
      return state.contador
    }
  },
  modules: {
  }
})
