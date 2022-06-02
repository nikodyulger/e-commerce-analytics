<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand :to="'/'">Petshop</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" right></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/cart'">
            <b-icon icon="cart"/>
            Cart
          </b-nav-item>

          <b-nav-item-dropdown no-caret>
            <template #button-content>
              <b-icon icon="person-circle"></b-icon> User
            </template>
            <b-dropdown-item :to="'/signup'" v-if="!isLogged"
              >Sign Up</b-dropdown-item
            >
            <b-dropdown-item :to="'/signin'" v-if="!isLogged"
              >Sign In</b-dropdown-item
            >
            <b-dropdown-item :to="'/profile'" v-if="isLogged"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item v-if="isLogged" @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../store/user";

export default {
  name: "NavBar",
  computed: {
    ...mapState(useUserStore, ["isLogged"]),
  },
  methods: {
    ...mapActions(useUserStore, ['signOut'])
  }
};
</script>

<style>
</style>