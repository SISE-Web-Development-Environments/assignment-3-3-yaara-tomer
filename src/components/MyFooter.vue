<template>
  <mdb-navbar color="default-color-dark" position="bottom" dark>
    <p class="mb-0 white-text">
      © 2020 Copyright : Yaara Rumney & Tomer Godelli
    </p>

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
        <a class="li-ic">
          <i class="fab fa-linkedin-in white-text mr-lg-4"></i>
        </a>
        <a class="ins-ic">
          <i class="fab fa-instagram white-text mr-lg-4"></i>
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
