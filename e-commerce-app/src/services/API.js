import api from "../http-common";

class API {
  getProducts() {
    return api.get("/products");
  }

  getUser(username) {
    const params = new URLSearchParams([["id", username]]);
    return api.get("/user", { params });
  }

  updateUser(user) {
    return api.post("/userupdate", { user : user } );
  }

  sendPurchase(phone, order) {
    console.log("sms_order", order)
    return api.post('/sms', {
      phone: phone,
      order: order
    });
  }
}

export default new API();
