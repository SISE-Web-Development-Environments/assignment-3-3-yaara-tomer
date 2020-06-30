<template>
  <div id="div" class="bg">
    <navbar />
    <router-view />
    <MyFooter />
  </div>
</template>

<script>
import navbar from "./components/Navbar";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  data() {
    return {
      username: this.$store.userInfo.firstname,
      isloggedIn: this.$store.loggedIn,
      image_url: this.$store.userInfo.ProfilePicture,
      image_user: require("@/assets/user_icon.png")
    };
  },
  components: {
    navbar,
    MyFooter
  }
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
  background-image: url("./assets/food3.png");
  width: 100%;
   height: 100%;
  //height: 100vh;
  /* Full height */

  /* Center and scale the image nicely */
  //background-position: center;
  background-repeat: repeat;

  // background-size: cover;
}
</style>
