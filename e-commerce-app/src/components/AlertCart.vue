<template>
  <div class="alert alert-danger" role="alert">
    <div class="d-flex flex-row text-center no-gutters">
      <i class="fas fa-exclamation-triangle fa-5x"></i>
      <div class="d-flex">
        <div class="py-2 px-4 text-left">
          <p class="mb-2 font-weight-bold">Your shopping cart is empty</p>
          <div class="h5 font-weight-light">
            No product items in the basket yet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertCart",
};
</script>