import { defineStore } from "pinia";

export const useCatalogStore = defineStore({
  id: "catalog",
  state: () => {
    return {
      catalog: [],
      cart: [],
      tax: 21,
    };
  },
  getters: {
    cartSubtotal() {
      return this.cart.reduce((acc, p) => acc + p.total, 0);
    },
    cartTotal() {
      return this.cartSubtotal + (this.cartSubtotal * this.tax) / 100;
    },
  },
  actions: {
    addProductToCart(product) {
      if (this.cart.find((p) => p.id === product.id)) {
        const index = this.cart.indexOf(product);
        this.cart[index]["qty"] += 1;
        this.cart[index]["total"] += product["price"];
      } else {
        product["qty"] = 1;
        product["total"] = product["price"];
        this.cart.push(product);
      }
    },
    removeProduct(productId){
      this.cart = this.cart.filter((p) => p.id !== productId);
    }
  },
});
