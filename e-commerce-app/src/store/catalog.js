import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id:'catalog',
    state: () => {
        return {
            products: []
        }
    }
})