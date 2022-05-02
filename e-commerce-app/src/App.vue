<template>
  <div id="app">
    <!-- <SignIn/> -->
    <SignUp/>
  </div>
</template>

<script>
// import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

export default {
  name: 'App',
  components: {
    // SignIn,
    SignUp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
