import { defineStore } from "pinia";
import API from "../services/API";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      isLogged: false,
      user: {},
      tax: 21,
      catalog: []
    };
  },
  getters: {
    cartSubtotal() {
      return this.user.cart.reduce((acc, p) => acc + p.total, 0);
    },
    cartTotal() {
      return this.cartSubtotal + (this.cartSubtotal * this.tax) / 100;
    },
  },
  actions: {
    signIn(username) {
      API.getUser(username).then((res) => {
        this.user = res.data.result.Items[0];
        this.isLogged = true;
      });
    },
    signOut() {
      this.user = {};
      this.isLogged = false;
    },
    addProductToCart(product) {
      if (this.user.cart.find((p) => p.id === product.id)) {
        const index = this.cart.indexOf(product);
        this.user.cart[index]["qty"] += 1;
        this.user.cart[index]["total"] += product["price"];
      } else {
        product["qty"] = 1;
        product["total"] = product["price"];
        this.user.cart.push(product);
      }
      this.updateUser();
    },
    removeProduct(productId){
      this.user.cart = this.user.cart.filter((p) => p.id !== productId);
      this.updateUser();
    },
    purchase(){
      console.log()
      const id = this.user.orders.length; //handmade
      const products = this.user.cart.map((p) => {
        return {
          id: p.id,
          title: p.title,
          qty: p.qty,
          price: p.price
        }
      })
      this.user.orders.push({
        id: id,
        date: new Date(),
        products: products,
        total: this.cartTotal
      });
      this.user.cart = [];
      console.log("orders", this.user.orders)
      console.log("cart", this.user.cart)
      this.updateUser();
      this.sendPurchase();
    },
    updateUser() {
      API.updateUser(this.user)
      .then((res) => {
        console.log(res);
      })
    },
    sendPurchase(){
      API.sendPurchase(this.user.phone, this.user.orders[this.user.orders.length - 1])
      .then((res) => console.log(res))
    }
  },
});
