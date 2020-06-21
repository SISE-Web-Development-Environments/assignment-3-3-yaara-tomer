<template >
  <div id=div class="bg">
    <mdb-navbar color="default" dark>
      <mdb-navbar-brand :to="{ name: 'main' }">
        <strong>Our Recipe Website!</strong>
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
                ><i class="	far fa-star"></i> My Favorite Recipe   </mdb-dropdown-item
              >
              <mdb-dropdown-item :to="{ name: 'personalRecipe' }"
                ><i class="	far fa-hand-peace"> </i> My Personal Recipe  </mdb-dropdown-item
              >
              <mdb-dropdown-item :to="{ name: 'family' }"
                ><i class="	far fa-heart"></i> 	&nbsp;	&nbsp; My Family Recipe  </mdb-dropdown-item
              >
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
                <!-- <img v-if="this.$store.userInfo.ProfilePicture === undefined" src="image_user" class="rounded-circle z-depth-0"
                alt="avatar image" height="35"> <strong>Hi {{this.$store.userInfo.firstname}} !</strong>
                <img  v-else :src="image_url" class="rounded-circle z-depth-0"
                alt="avatar image" height="35"> <strong>Hi {{this.$store.userInfo.firstname}} !</strong> -->
              <i class="fas fa-pizza-slice"></i>  <strong>Hi {{this.$store.userInfo.firstname}} !</strong>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item v-on:click="Logout()" >
                Logout
               </mdb-dropdown-item
              >    
               <mdb-dropdown-item  >
                Update Profile picture
               </mdb-dropdown-item
              >                                 
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
              <mdb-dropdown-item :to="{ name: 'login' }" >
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
    <br />

  <router-view :key="counter"/>
<!-- <MainPage/> -->
    <mdb-navbar color="default-color-dark" position="bottom" dark>
      <p class="mb-0 white-text">© 2020 Copyright : Yaara Rumney & Tomer Godelli</p>

      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <a class="fb-ic ml-0">
            <i class="fab fa-facebook white-text mr-lg-4"></i>
          </a>
          <a class="tw-ic">
            <i class="fab fa-twitter white-text mr-lg-4"></i>
          </a>
          <a class="gplus-ic">
            <i class="fab fa-google-plus white-text mr-lg-4"></i>
          </a>
          <a class="li-ic" >
            <i class="fab fa-linkedin-in white-text mr-lg-4"></i>
          </a>
          <a class="ins-ic">
            <i class="fab fa-instagram white-text mr-lg-4"></i>
          </a>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
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
  mdbDropdownItem,
} from "mdbvue";
import MainPage from "./pages/MainPage";
export default {
  name: "App",
  data() {
    return {
      username: this.$store.userInfo.firstname,
      isloggedIn: this.$store.loggedIn,
     image_url: this.$store.userInfo.ProfilePicture,
     image_user: require('@/assets/user_icon.png'),
      counter:0,

    };
  },
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

  methods: {
    Logout() {
    
      this.$store.userInfo = undefined;
      this.$store.loggedIn = false;
      this.counter+=1;
      // this.$refs.MainPage.newRandom();
      this.$root.toast("Logout", "User logged out successfully", "info");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

@import "@/scss/form-style.scss";

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
//   min-height: 100vh;
// }


html, body {
 
  margin: 0;
}
  .bg {
    /* The image used */
    background-image: url("./assets/images.jpg");
      width:100%;
      height: 100%;
    /* Full height */
  

    /* Center and scale the image nicely */
    //background-position: center;
    background-repeat: repeat;
    // background-size: cover;
   
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
