<template>
    <div class="container">  
      <h6  class="mb-14 " style=" color:#008080; font-size: 26px;text-align: center;">My Favorite Recipes: </h6>     
    <RecipePreviewGrid  :recipes="demoRecipes"  />
  </div>
</template>

<script>
import RecipePreviewGrid from "../components/RecipePreviewGrid";
export default {
components:{
RecipePreviewGrid,
},
data(){
  return{
      FavoriteRecipes: [],
      demoRecipes: this.$store.demoRecipes,
      };
  },
  async created() {
    const response1 = await this.axios.get(
          "https://test-for-3-2.herokuapp.com/recipes/favoriteRecipesPreview"
        ); 
        const FavoriteRecipesResult = response1.data.recipes;
         this.FavoriteRecipes = [];
         this.FavoriteRecipes.push(...FavoriteRecipesResult);
  }

}
</script>

<style>

</style>