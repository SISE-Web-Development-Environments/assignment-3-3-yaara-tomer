<template>
  <div>
    <mdb-navbar color="default" dark>
      <mdb-navbar-brand :to="{ name: 'main' }">
        <strong>Our Recipe Website!</strong>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <h6
            class="mb-9 white-text"
            style=" padding-top: 10px; padding-left : 10px; padding-right : 10px;"
            v-if="!username"
          >Hi Guest!</h6>
          <h6
            class="mb-9 white-text"
            style=" padding-top: 10px; padding-left : 10px; padding-right : 10px;"
            v-if="username"
          >Hi {{username}} !</h6>

          <mdb-nav-item :to="{ name: 'main' }" active>
            <strong>Home</strong>
          </mdb-nav-item>

          <mdb-nav-item :to="{ name: 'search' }">
            <strong>Search</strong>
          </mdb-nav-item>

          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle
              tag="a"
              navLink
              color="default"
              slot="toggle"
              waves-fixed
              v-if="isLoggedIn"
            >
              <strong>Personal</strong>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item :to="{ name: 'favorite' }">My Favorite Recipe</mdb-dropdown-item>
              <mdb-dropdown-item :to="{ name: 'personalRecipe' }">My Personal Recipe</mdb-dropdown-item>
              <mdb-dropdown-item :to="{ name: 'family' }">My Family Recipe</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-nav-item :to="{ name: 'about' }">
            <strong>About</strong>
          </mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item :to="{ name: 'login' }" v-if="!isLoggedIn">
            <strong>Login</strong>
          </mdb-nav-item>
          <mdb-nav-item :to="{ name: 'register' }" v-if="!isLoggedIn">
            <strong>Register</strong>
          </mdb-nav-item>
          <mdb-nav-item v-on:click="logout" v-if="isLoggedIn">
            <strong>Logout</strong>
          </mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <br />

    <router-view />

    <mdb-navbar color="default-color-dark" position="bottom" dark>
      <mdb-row class="py-4 d-flex align-items-center">
        <mdb-col md="20" lg="200" class="text-center text-md-left mb-4 mb-md-0">
          <h6 class="mb-0 white-text">Get connected with us on social networks!</h6>
        </mdb-col>
        <mdb-col md="4" lg="6" class="text-center text-md-right">
          <a class="fb-ic ml-0">
            <i class="fab fa-facebook white-text mr-lg-4"></i>
          </a>
          <a class="tw-ic">
            <i class="fab fa-twitter white-text mr-lg-4"></i>
          </a>
          <a class="gplus-ic">
            <i class="fab fa-google-plus white-text mr-lg-4"></i>
          </a>
          <a class="li-ic">
            <i class="fab fa-linkedin-in white-text mr-lg-4"></i>
          </a>
          <a class="ins-ic">
            <i class="fab fa-instagram white-text mr-lg-4"></i>
          </a>
        </mdb-col>
      </mdb-row>
    </mdb-navbar>
  </div>
</template>

<script>
import {
  mdbFooter,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbInput,
  mdbDropdownItem
} from "mdbvue";
export default {
  name: "App",
  data() {
    return {
      username: this.$store.username,
      isLoggedIn: this.$store.LoggedIn
    };
  },
  components: {
    mdbRow,
    mdbCol,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem
  },
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
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

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
