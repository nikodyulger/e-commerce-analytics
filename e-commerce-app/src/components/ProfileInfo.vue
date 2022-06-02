<template>
  <div class="card mb-3">
    <div class="card-body">
      <h2 class="card-title text-left mt-2 mb-4">Profile</h2>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Name</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          {{name}}
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Surname</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          {{surname}}
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Birth</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          {{birthday | date}}
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Address</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          {{address}}
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">E-mail</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          {{email}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileInfo",
  props: ["name", "surname", "birthday", "address", "email"]
};
</script>