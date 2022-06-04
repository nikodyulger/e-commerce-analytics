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
        <b-button class="col-7" variant="primary" @click="purchase()"
          ><i class="fa fa-shopping-cart"></i>&nbsp;Purchase</b-button
        >
        <b-link role="button" class="btn btn-danger col-4" :to="'/'">Cancel</b-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/user";

export default {
  name: "CartSummary",
  computed: {
    ...mapState(useUserStore, ['cartTotal'])
  },
  methods: {
    ...mapActions(useUserStore, ['purchase'])
  }
};
</script>