<template>
  <div>
    <NavBar />
    <br />
    <div class="container">
      <div class="col-xl-12 col-lg-10 col-md-10 col-12">
        <ProfileInfo />
      </div>
    </div>
    <br />
    <div class="container">
      <div class="col-xl-12 col-lg-10 col-md-10 col-12">
        <AlertOrder v-if="user.orders.length === 0" />
        <OrderList v-else />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import {
  NavBar,
  Footer,
  ProfileInfo,
  AlertOrder,
  OrderList,
} from "@/components";
import { mapState } from "pinia";
import { useUserStore } from "../store/user";

export default {
  name: "Profile",
  components: {
    NavBar,
    Footer,
    ProfileInfo,
    AlertOrder,
    OrderList,
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
};
</script>
