<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/" onclick="navigateTo('/', event)">
      Pet Shop
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarsExampleDefault"
    >
      <ul class="navbar-nav">
        <li class="nav-item dropdown" v-if="false">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center"
            id="dropdown01"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            &nbsp;Cart&nbsp;
            <span class="badge badge-pill badge-danger">
              {{ this.user.shoppingCart.qty }}
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdown01"
          >
            <a class="dropdown-item" onclick="navigateTo('/cart',event)">
              Show cart
            </a>
            <a class="dropdown-item" onclick="navigateTo('/purchase', event)">
              Purchase
            </a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="dropdown01"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="far fa-user"></i>
            &nbsp;User
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdown01"
          >
            <a
              class="dropdown-item"
              href="/signup"
              v-if="true"
              onclick="navigateTo('/signup', event)"
            >
              Sign Up
            </a>
            <a
              class="dropdown-item"
              v-if="false"
              href="/signin"
              onclick="navigateTo('/signin', event)"
            >
              Sign In
            </a>
            <a
              class="dropdown-item"
              v-if="false"
              onclick="navigateTo('/profile', event)"
            >
              Profile
            </a>
            <a
              class="dropdown-item"
              v-if="false"
              onclick="signout_clicked(event)"
            >
              Sign Out
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>