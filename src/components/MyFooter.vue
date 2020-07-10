<template>
  <mdb-navbar color="default-color-dark" position="bottom" dark>
    <p class="mb-0 white-text">
      © 2020 Copyright : Yaara Rumney & Tomer Godelli
    </p>

    <mdb-navbar-toggler>
      <mdb-navbar-nav right> 
        
        <a class="fb-ic ml-0" href="https://www.facebook.com/yaara.rumney">
          <i class="fab fa-facebook white-text mr-lg-4"   ></i>
        </a>     
         <a class="li-ic" href="https://www.linkedin.com/in/yaara-rumney-4911961a2/">
          <i class="fab fa-linkedin-in white-text mr-lg-4"   ></i>
        </a>
        <a class="ins-ic"  href="https://www.instagram.com/yaara_rumney/" >
          <i class="fab fa-instagram white-text mr-lg-4"   ></i>
        </a>

        <a class="gplus-ic" href="mailto:tomergodelli@gmail.com">
          <i class="fab fa-google-plus white-text mr-lg-4" ></i>
        </a>
         <a class="fb-ic ml-0" href="https://www.facebook.com/godelli">
          <i class="fab fa-facebook white-text mr-lg-4"   ></i>
        </a>
         <a class="fb-ic ml-0" href="https://github.com/TomerGodelli">
          <i class="fab fa-github white-text mr-lg-4"></i>
        </a>
      

      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav } from "mdbvue";
export default {
  name: "MyFooter",
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
  },
};
</script>

<style></style>
