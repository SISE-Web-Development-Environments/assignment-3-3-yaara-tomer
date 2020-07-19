<template>
  <div id="app">
    <navbar />
    <router-view class="mt-5" />

    <MyFooter />
  </div>
</template>

<script>
import navbar from "./components/Navbar";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  components: {
    navbar,
    MyFooter,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

html,
body {
  background-image: url("./assets/food3.png");
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}
.bg {
  background-image: url("./assets/food3.png");
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}
</style>
