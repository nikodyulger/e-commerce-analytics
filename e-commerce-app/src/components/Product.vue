<template>
  <div class="card border-light mb-3">
    <div class="card-header border-light"></div>
    <img class="card-img-top" :src="product.url" :alt="product.url" />
    <div class="card-body">
      <h4 class="card-title">{{ product.title }}</h4>
      <p class="card-text">{{ product.description }}</p>
    </div>

    <div class="card-footer bg-white text-right">
      <div class="d-flex justify-content-between align-items-stretch">
        <span>
          <h4>{{ product.price }}</h4>
        </span>
        <button class="btn btn-primary" :disabled="!isLogged" onclick="">
          <b-icon icon="cart-plus-fill"></b-icon>&nbsp;Buy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useUserStore } from '../store/user';

export default {
  name: "Product",
  props: ["product"],
  computed: {
    ...mapState(useUserStore, ['isLogged'])
  },
  filters: {
    currency(curr) {
      const formatter = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      });
      if (isNaN(curr)) return "-";
      return formatter.format(curr);
    },
  },
};
</script>