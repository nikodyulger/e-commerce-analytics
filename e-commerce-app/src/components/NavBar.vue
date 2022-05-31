<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">Petshop</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" right></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/cart">
          <b-icon icon="cart">
          </b-icon>
          Cart
          </b-nav-item>
            
          <b-nav-item-dropdown no-caret>
            <template #button-content>
              <b-icon icon="person-circle"></b-icon> User
            </template>
            <b-dropdown-item href="/signup" v-if="!isLogged">Sign Up</b-dropdown-item>
            <b-dropdown-item href="/signin" v-if="!isLogged">Sign In</b-dropdown-item>
            <b-dropdown-item href="/profile" v-if="isLogged">Profile</b-dropdown-item>
            <b-dropdown-item  v-if="isLogged">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
            {{user}}
            {{isLogged}}
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useUserStore } from '../store/user';

export default {
  name: "NavBar",
  computed: {
    ...mapState(useUserStore, ['isLogged', 'user'])
  }
};
</script>

<style>
</style>