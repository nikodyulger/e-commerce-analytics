<template>
  <div>
    <NavBar />
    <div class="container align-start-center">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signup my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              <form
                id="signup-form"
                class="form-signup needs-validation"
                validate
                @submit="onSubmit"
              >
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="person-badge"></b-icon
                      ></span>
                    </div>
                    <input
                      id="name"
                      v-model="userAttributes.Name"
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      aria-label="Name"
                      aria-describedby="basic-addon1"
                      required
                      autofocus
                    />
                    <div class="invalid-feedback">
                      The name field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="calendar"></b-icon
                      ></span>
                    </div>
                    <input
                      id="birth"
                      v-model="userAttributes.BirthDate"
                      type="date"
                      class="form-control"
                      placeholder="BirthDate"
                      aria-label="BirthDate"
                      aria-describedby="basic-addon1"
                      required
                    />
                    <div class="invalid-feedback">
                      The birth date field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="geo-alt-fill"></b-icon
                      ></span>
                    </div>
                    <input
                      id="address"
                      v-model="userAttributes.Address"
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      aria-label="Address"
                      aria-describedby="basic-addon1"
                      required
                    />
                    <div class="invalid-feedback">
                      The address field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="person-circle"></b-icon
                      ></span>
                    </div>
                    <input
                      id="username"
                      v-model="authenticationData.Username"
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      autofocus
                    />
                    <div class="invalid-feedback">
                      The name field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="at"></b-icon
                      ></span>
                    </div>
                    <input
                      id="email"
                      v-model="authenticationData.Email"
                      type="email"
                      class="form-control"
                      placeholder="E-mail"
                      aria-label="E-mail"
                      aria-describedby="basic-addon1"
                      required
                    />
                    <div class="invalid-feedback">
                      The e-mail field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="key"></b-icon
                      ></span>
                    </div>
                    <input
                      id="password1"
                      v-model="authenticationData.Password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      required
                    />
                    <div class="invalid-feedback">
                      The password field cannot be empty
                    </div>
                  </div>
                </div>
                <div class="form-label-group mx-2 my-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><b-icon icon="key-fill"></b-icon
                      ></span>
                    </div>
                    <input
                      id="password2"
                      v-model="authenticationData.PasswordConfirm"
                      type="password"
                      class="form-control"
                      placeholder="Confirm Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      required
                    />
                    <div class="invalid-feedback">
                      You must confirm your password
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-lg btn-primary btn-block text-camelcase"
                  type="submit"
                >
                  Sign up
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
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default {
  name: "SignUp",
  props: {},
  data() {
    return {
      authenticationData: {
        Username: "",
        Email: "",
        Password: "",
        PasswordConfirm: "",
      },
      userAttributes: {
        Name: "",
        BirthDate: "",
        Address: "",
      },
    };
  },
  components: {
    NavBar,
    Footer,
  },
  methods: {
    onSubmit(event) {
      var navigate = this.$router;
      event.preventDefault();
      console.log(this.userAttributes);
      if (
        this.authenticationData.Password !==
        this.authenticationData.PasswordConfirm
      ) {
        alert("Passwords do not match! Try again!");
      } else {
        var poolData = {
          UserPoolId: process.env.VUE_APP_USER_POOL_ID, 
          ClientId: process.env.VUE_APP_CLIENT_ID,
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var dataEmail = {
          Name: "email",
          Value: this.authenticationData.Email,
        };
        var attributeList = [
          {
            Name: "name",
            Value: this.userAttributes.Name,
          },
          {
            Name: "birthdate",
            Value: this.userAttributes.BirthDate,
          },
          {
            Name: "address",
            Value: this.userAttributes.Address,
          },
        ];

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
          dataEmail
        );

        attributeList.push(attributeEmail);

        userPool.signUp(
          this.authenticationData.Username,
          this.authenticationData.Password,
          attributeList,
          null,
          function (err, result) {
            if (err) {
              alert(err.message || JSON.stringify(err));
              return;
            }
            var cognitoUser = result.user;
            console.log("result,", result);
            console.log("user name is " + cognitoUser.getUsername());
            if (result.user) {
              navigate.push({
                name: "Confirmation",
                params: {
                  username: cognitoUser.getUsername(),
                },
              });
            }
          }
        );
      }
    },
    goToConfirmation() {
      this.$route.push({
        name: "Confirmation",
        params: {
          username: this.authenticationData.Username,
        },
      });
    },
  },
};
</script>


<style>
</style>
