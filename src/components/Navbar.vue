<template>
  <mdb-navbar color="default" dark>
    <mdb-navbar-brand :to="{ name: 'main' }">
     <i class="fas fa-utensils"></i> <strong> T&Y Website!</strong>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item :to="{ name: 'main' }" active>
          <i class="	fas fa-hamburger"></i> <strong>Home</strong>
        </mdb-nav-item>

        <mdb-nav-item :to="{ name: 'search' }">
          <i class="fas fa-search"></i><strong>Search</strong>
        </mdb-nav-item>

        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            color="default"
            slot="toggle"
            waves-fixed
            v-if="this.$store.loggedIn"
          >
            <i class="fas fa-pepper-hot"></i> <strong>Personal</strong>
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item :to="{ name: 'favorite' }"
              ><i class="	far fa-star"></i> My Favorite Recipe
            </mdb-dropdown-item>
            <mdb-dropdown-item :to="{ name: 'personalRecipe' }"
              ><i class="	far fa-hand-peace"> </i> My Personal Recipe
            </mdb-dropdown-item>
            <mdb-dropdown-item :to="{ name: 'family' }"
              ><i class="	far fa-heart"></i> &nbsp; &nbsp; My Family Recipe
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>

    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            color="default"
            slot="toggle"
            waves-fixed
            v-if="this.$store.loggedIn"
          >
            <i class="fas fa-pizza-slice"></i>
            <strong>Hi {{ this.$store.userInfo.firstname }} !</strong>
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item v-on:click="Logout()">
              Logout
            </mdb-dropdown-item>
          
          </mdb-dropdown-menu>
        </mdb-dropdown>

        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            color="default"
            slot="toggle"
            waves-fixed
            v-if="!this.$store.loggedIn"
          >
            <i class="fas fa-pizza-slice"></i> <strong>Hi Guest ! </strong>
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item :to="{ name: 'login' }">
              Login
            </mdb-dropdown-item>
            <mdb-dropdown-item :to="{ name: 'register' }">
              Register
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>

        <mdb-nav-item :to="{ name: 'about' }">
          <i class="fas fa-info-circle"></i><strong>About</strong>
        </mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbInput,
  mdbDropdownItem,
} from "mdbvue";
export default {
  name: "navbar",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
  },
  data() {
    return {
      username: this.$store.userInfo.firstname,
      isloggedIn: this.$store.loggedIn,
      image_url: this.$store.userInfo.ProfilePicture
    
    };
  },
  methods: {
    async Logout() {
      const response = await this.axios.post(
        this.$store.server_domain + "logout",
        {},
        { withCredentials: true }
      );
      this.$store.userInfo = {};
      this.$store.loggedIn = false;
      this.$store.recipesMetaData = undefined;
      this.$store.lastSearch = undefined;
      this.$root.toast("Logout", "User logged out successfully", "info");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style></style>
