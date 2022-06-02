<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="card-title">
        <h5>Cart Summary</h5>
      </div>
      <span> Total </span>
      <h2 class="font-bold">
        {{ cartTotal | currency }}
      </h2>

      <hr />
      <span class="text-muted small">
        *Taxes do not include shipping costs
      </span>
    </div>
    <div class="container mb-3 mx-2">
      <div class="row">
        <a role="button" class="btn btn-primary col-7"
          ><i class="fa fa-shopping-cart"></i>&nbsp;Purchase</a
        >
        <a role="button" class="btn btn-danger col-4" href="/">Cancel</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useCatalogStore } from "../store/catalog";

export default {
  name: "CartSummary",
  computed: {
    ...mapState(useCatalogStore, ['cartTotal'])
  }
};
</script>