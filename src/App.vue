<template>
  <div id="div" class="bg">
    <navbar />
    <br />
    <router-view/>
    <footerB />
  </div>
</template>

<script>
import navbar from "./components/Navbar";
import footerB from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      username: this.$store.userInfo.firstname,
      isloggedIn: this.$store.loggedIn,
      image_url: this.$store.userInfo.ProfilePicture,
      image_user: require("@/assets/user_icon.png"),
    };
  },
  components: {
    navbar,
    footerB,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

@import "@/scss/form-style.scss";

html,
body {
  margin: 0;
}
.bg {
  /* The image used */
  background-image: url("./assets/images.jpg");
  width: 100%;
  height: 100%;
  /* Full height */

  /* Center and scale the image nicely */
  //background-position: center;
  background-repeat: repeat;
  // background-size: cover;
}
</style>
