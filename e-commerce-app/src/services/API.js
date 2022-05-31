import api from "../http-common";

class API {
    getProducts(){
        return api.get('/products');
    }

    getUser(username) {
        const params = new URLSearchParams([['id',username]]);
        return api.get('/user', {params});
    }
}

export default new API();