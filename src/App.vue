<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'login' }" v-if="!$root.store.username"
            >Login</b-nav-item
          >
          <b-nav-item :to="{ name: 'register' }" v-if="!$root.store.username"
            >Register</b-nav-item
          >

          <b-nav-item-dropdown
            text="Personal"
            left
            v-if="!$root.store.username"
          >
            <b-dropdown-item :to="{ name: 'favorite' }"
              >My Favorite Recipe</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'personalRecipe' }"
              >My Personal Recipe</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'family' }"
              >My Family Recipe</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item
            :to="{ name: 'MakeYourRecipe' }"
            v-if="!$root.store.username"
            >Make your Own Recipe</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout" v-if="!$root.store.username"
            >Logout</b-nav-item
          >
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

//  #nav {
//    padding: 30px;
//    font-family: Avenir, Helvetica, Arial, sans-serif;
//    -webkit-font-smoothing: antialiased;
//    -moz-osx-font-smoothing: grayscale;   color: #2c3e50;
//    min-height: 100vh;
//  }

// #nav a {
//   font-weight: bold;
//   color: lightgray;
// }

// #nav a.router-link-exact-active {
//   color: white;
// }
</style>
