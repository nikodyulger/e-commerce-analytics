<template>
  <div>
    <NavBar />
    <br />
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-md-9">
          <AlertCart v-if="user.cart.length === 0" />
          <CartTable v-else />
        </div>
        <div class="col-md-3">
          <CartSummary v-if="user.cart.length !== 0" />
        </div>
      </div>
      <br />
      <br />
    </div>
    <Footer />
  </div>
</template>

<script>
import {
  NavBar,
  Footer,
  AlertCart,
  CartSummary,
  CartTable,
} from "@/components";
import { mapState } from "pinia";
import { useUserStore } from "../store/user";

export default {
  name: "Cart",
  components: {
    NavBar,
    Footer,
    AlertCart,
    CartSummary,
    CartTable,
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
};
</script>