<template>
  <div>
    <NavBar />
    <br />
    <div class="container">
      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-12"
          v-for="product in catalog"
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
import { mapWritableState } from 'pinia';
import { useCatalogStore } from '../store/catalog';

export default {
  name: "Home",
  components: {
    NavBar,
    Footer,
    Product,
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapWritableState(useCatalogStore, ['catalog','cart'])
  },
  mounted() {
    if (this.catalog.length === 0){
      API.getProducts()
        .then((res) => {
          this.catalog = res.data.result.Items;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {},
};
</script>
