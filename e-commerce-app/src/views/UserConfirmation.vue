<template>
  <div>
    <NavBar />
    <div class="container align-start-center">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">User confirmation</h5>
              <form
                id="signin-form"
                class="form-signin needs-validation"
                novalidate
                @submit="onSubmit"
              >
                <div class="form-label-group mx-2 my-3">
                  <label for="code"> Confirmation Code </label>
                  <input
                    type="password"
                    id="code"
                    v-model="confirmationCode"
                    class="form-control"
                    placeholder="Code"
                    required="true"
                  />
                  <div class="invalid-feedback">
                    The confirmation code cannot be empty
                  </div>
                </div>
                <button
                  class="btn btn-lg btn-primary btn-block text-camelcase"
                  type="submit"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { NavBar, Footer } from "@/components";
import { mapActions } from "pinia";
import { useUserStore } from "../store/user";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default {
  components: {
    NavBar,
    Footer,
  },
  props: ["username"],
  data() {
    return {
      confirmationCode: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["logUser"]),
    onSubmit(event) {
      event.preventDefault();
      var poolData = {
        UserPoolId: process.env.VUE_APP_USER_POOL_ID,
        ClientId: process.env.VUE_APP_CLIENT_ID,
      };

      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
        Username: this.username, // username from state after correct registration
        Pool: userPool,
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmRegistration(
        this.confirmationCode,
        true,
        (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          if (result === "SUCCESS") {
            console.log("Usuario confirmado",this.username);
            this.logUser(this.username);
            this.$router.push("/");
          }
        }
      );
    },
  },
};
</script>

