<template>
  <div>
    <NavBar/>
    <div class="container align-start-center">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign In</h5>
              <form
                id="signin-form"
                class="form-signin needs-validation"
                novalidate
                @submit="onSubmit"
              >
                <div class="form-label-group mx-2 my-3">
                  <label for="username"> Username </label>
                  <input
                    id="username"
                    v-model="authenticationData.Username"
                    class="form-control"
                    placeholder="Username"
                    required=""
                    autofocus=""
                  />
                  <div class="invalid-feedback">
                    The email field cannot be empty
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <label for="inputPassword"> Password </label>
                  <input
                    type="password"
                    id="password"
                    v-model="authenticationData.Password"
                    class="form-control"
                    placeholder="Password"
                    required=""
                  />
                  <div class="invalid-feedback">
                    The password cannot be empty
                  </div>
                </div>
                <button
                  class="btn btn-lg btn-primary btn-block text-camelcase"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { NavBar, Footer } from "@/components/";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default {
  name: "SignIn",
  props: {},
  data() {
    return {
      authenticationData: {
        Username: "",
        Password: "",
      },
    };
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      var authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails(
          this.authenticationData
        );

      var poolData = {
        UserPoolId: process.env.VUE_APP_USER_POOL_ID,
        ClientId: process.env.VUE_APP_CLIENT_ID,
      };

      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      var userData = {
        Username: this.authenticationData.Username,
        Pool: userPool,
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log(
            "access token + " + result.getAccessToken().getJwtToken()
          );
          console.log("id token + " + result.getIdToken().getJwtToken());
          console.log("refresh token + " + result.getRefreshToken().getToken());
          console.log(result);
        },

        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
