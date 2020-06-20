<template>
  <div class="container">
  
  

    <div class="jumbotron text-center" style="width: 500px;">

  <!-- Title -->
   <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only English letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >

      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>

    <div class="d-flex justify-content-center mb-3">
      <b-spinner
        v-if="isLoading"
        class="m-4"
        variant="primary"
        label="Spinning"
      ></b-spinner>
    </div>

   </div>
  <b-alert

      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required, alpha } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
      isLoading: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        alpha,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      this.isLoading = true;
      try {
        const response = await this.axios.post(
          this.$store.server_domain + "login",
          {
            username: this.form.username,
            password: this.form.password,
          },
          { withCredentials: true }
        );

        //if login succseed get from server user data and metaData for exist recipes
        await Promise.all([
          this.updateUserInfo(),
          this.updateAllExistRecipesMetaData(),
        ]);

        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
      this.isLoading = false;
    },
    onLogin() {
      console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("login method go");

      this.Login();
    },
    async updateAllExistRecipesMetaData() {
      console.log("updateAllRecipesMetaDta started");

      if (this.$store.lastSearch) {
        //search results recipes ids
        let ids = this.$store.lastSearch.results.map((recipe) => recipe.id);
        console.log("all ids: " + ids);

        //get meta data from server for new recipes
        if (ids.length > 0) {
          let MetaDataresponse = await this.axios
            .get(this.$store.server_domain + "user/recipeInfo/[" + ids + "]", {
              withCredentials: true,
            })
            .catch((error) => {
              console.log("failed get recipes metadata: " + error);
            });

          // add New recipes meta data to shared store
          ids.map((recipe_id) => {
            this.$store.recipesMetaData[recipe_id] =
              MetaDataresponse.data[recipe_id];
          });
          console.log("updateAllRecipesMetaDta finish");
        }
      }
    },
    async updateUserInfo() {
      const userInfoResponse = await this.axios.get(
        this.$store.server_domain + "user/userInfo",

        { withCredentials: true }
      );
      //update shared data
      this.$store.userInfo = userInfoResponse.data;
      this.$store.loggedIn = true;

      console.log("sharedData loggedin: " + this.$store.loggedIn);
      console.log(this.$store.userInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
