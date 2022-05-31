<template>
  <div>
    <NavBar />
    <br />
    <div class="container">
      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-12"
          v-for="product in products"
          :key="product.title"
        >
          <Product :product="product" />
        </div>
      </div>
    </div>
    <br />
    <br />
    <Footer />
  </div>
</template>

<script>
import API from "../services/API";

import { NavBar, Footer, Product } from "@/components";

export default {
  name: "Home",
  components: {
    NavBar,
    Footer,
    Product,
  },
  data() {
    return {
      loading: true,
      products: [],
    };
  },
  beforeMount() {
    API.getProducts()
      .then((res) => {
        this.products = res.data.result.Items;
        console.log(this.products);
        this.loading = false;
      })
      .catch((err) => console.log(err));
  },
  methods: {},
};
</script>
