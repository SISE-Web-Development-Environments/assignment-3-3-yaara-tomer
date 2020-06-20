<template>
  <div class="container">
     <div class="jumbotron text-center" style="width: 500px; background-color: #e6ffe6 ;">
    <h1 class="title" style="color:#0097a7" >Register</h1>
    <br>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="5"
        label="Username:"
        label-for="username"
         style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only English letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstname"
        label-cols-sm="5"
        label="First Name:"
        label-for="firstname"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstname.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">
          First name must contain only English letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="5"
        label="Last Name:"
        label-for="lastname"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastname.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
          Last name must contain only letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="5"
        label="Country:"
        label-for="country"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="5"
        label="Password:"
        label-for="password"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.strongPassword"
        >
          contain at least one special character and one digit
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="5"
        label="Confirm Password:"
        label-for="confirmedPassword"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="5"
        label="Email:"
        label-for="email"
          style="  font-weight: bold; color:#0097a7"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Invalid email address
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-url"
        label-cols-sm="5"
        label="Profile Picture URL:"
        label-for="url"
          style="  font-weight: bold; color:#0097a7; "
      >
        <b-form-input
          id="url"
          v-model="$v.form.url.$model"
          type="url"
          :state="validateState('url')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.url.url">
          Invalid URL address
        </b-form-invalid-feedback>
      </b-form-group>
        
        <b-button
        type="reset"
        class="btn btn-yellow"
        style="width:150px;"
      
        >Reset</b-button
      >
      <b-button
        type="submit"
        class="btn btn-light-green"
        style="width:150px;"
       
        >Register</b-button
      >
     

      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url,
} from "vuelidate/lib/validators";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        url: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstname: {
        required,
        alpha,
      },
      lastname: {
        required,
        alpha,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        strongPassword(password) {
          return (
            /[0-9]/.test(password) && // checks for 0-9
            // /\W|_/.test(password) && // checks for special char
            /[!@#\$%\^\&*\)\(+=_~]/.test(password) // checks for special char
          );
        },
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email: (e) => email(e),
      },
      url: {
        url: (e) => url(e),
      },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      //TODO encrypt password???????????????????????????????????????????????????????????????????????????????????? 
      this.Register();
    },
    async Register() {
      try {
        const response = await this.axios.post(
          //"https://test-for-3-2.herokuapp.com/user/Register",
          this.$store.server_domain + "register",
          {
            username: this.form.username,
            password: this.form.password, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            email: this.form.email,
            profilePicture: this.form.url,
          }
        );

        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        url: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
