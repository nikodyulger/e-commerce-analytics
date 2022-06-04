<template>
  <div class="card mb-3">
    <div class="card-body">
      <h2 class="card-title text-left mt-2 mb-4">Products</h2>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Unit Cost</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in user.cart" :key="product.id">
              <th class="align-middle">
                {{product.title}}
              </th>
              <td class="align-middle">
                {{product.description}}
              </td>
              <td class="align-middle">
                {{product.qty}}
              </td>
              <td class="align-middle">
                {{product.price | currency}}
              </td>
              <td class="align-middle">
                {{ product.total | currency}}
                
              </td>
              <td class="align-middle">
                  <b-button variant="outline-danger" @click="removeProduct(product.id)">Remove</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer bg-light p-2">
      <div class="d-flex flex-row-reverse text-dark">
        <div class="py-2 px-4 text-right">
          <p class="mb-2 font-weight-bold">Total amount</p>
          <div class="h5 font-weight-light">
            {{cartTotal | currency}}
          </div>
        </div>

        <div class="py-2 px-4 text-right">
          <p class="mb-2 font-weight-bold">Tax</p>
          <div class="h5 font-weight-light">
            {{tax | tax}}
          </div>
        </div>

        <div class="py-2 px-4 text-right">
          <p class="mb-2 font-weight-bold">Subtotal</p>
          <div class="h5 font-weight-light">
            {{cartSubtotal | currency}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/user";

export default {
  name: "CartTable",
  computed: {
      ...mapState(useUserStore, ['user', 'tax', 'cartSubtotal','cartTotal'])
  },
  methods: {
      ...mapActions(useUserStore, ['removeProduct'])
  }
};
</script>