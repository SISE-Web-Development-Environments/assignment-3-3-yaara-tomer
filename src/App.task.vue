<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" id="nav">
      <b-nav-item to="/" class="navbar-brand">Vue Recipes</b-nav-item>|
      <span v-if="!$root.store.username">
        Guest:
        <router-link to="/register">Register</router-link>|
        <router-link to="/login">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}:
        <button @click="Logout">Logout</button>|
      </span>
      <span>
        <router-link to="/search">Search</router-link>|
      </span>
    </b-navbar>
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
    }
  }
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

#nav a {
  font-weight: bold;
  color: lightgray;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
