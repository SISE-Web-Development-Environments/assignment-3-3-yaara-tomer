<template>
  <div
    class="container"
    style="  display: flex;
  align-items: center;
  justify-content: center;"
  >
    <div
      class="jumbotron text-center"
      style="width: 500px; background-color: #ccffff;"
    >
      <Login @loginSucces="gotohome" />
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  components: {
    Login,
  },
  methods: {
    gotohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
