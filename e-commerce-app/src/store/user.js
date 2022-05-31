import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            isLogged: false,
            user: {}
        }
    },
    actions: {
        logUser(username){
            console.log("Antes confirm",this.user);
            this.isLogged = true;
            this.user['username'] = username; // llamada a la API
            console.log("Despues confirm",this.user);
        }
    }

})