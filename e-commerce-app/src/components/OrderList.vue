<template>
  <div class="card mb-3">
    <div class="card-body">
      <h2 class="card-title text-left mt-2 mb-4">Order List</h2>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th
                scope="col"
                data-type="date"
                data-format-string="Do MMMM YYYY"
              >
                Date
              </th>
              <th scope="col">ID</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in user.orders" :key="order.id" >
              <th class="align-middle">
                {{ order.date | date}}
              </th>
              <td class="align-middle">
                {{ order.id | orderId }}
              </td>
              <td class="align-middle">
                {{ order.total | currency}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '../store/user';
export default {
  name: "OrderList",
  computed: {
    ...mapState(useUserStore, ['user'])
  }
};
</script>