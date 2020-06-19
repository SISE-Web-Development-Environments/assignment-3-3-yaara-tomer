<template>
  <div class="container">
    <h6 class="mb-14" style=" color:#008080; font-size: 26px;text-align: center;">My Family Recipes:</h6>
    <RecipePreviewGrid :recipes="demoRecipes" />
  </div>
</template>



<script>
import RecipePreviewGrid from "../components/RecipePreviewGrid";


export default {
  components: {
    RecipePreviewGrid
  },
  data() {
    return {
      RandomRecipes: [],
      demoRecipes: this.$store.demoRecipes
    };
  }
  
};
</script>

<style>
</style>