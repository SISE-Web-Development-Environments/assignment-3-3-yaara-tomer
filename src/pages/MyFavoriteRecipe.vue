<template>
    <div class="container">  
      <h6  class="mb-14 " style=" color:#008080; font-size: 26px;text-align: center;">My Favorite Recipes: </h6>     
    <RecipePreviewGrid  :recipes="FavoriteRecipes"  />
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
      };
  },
  async created() {
    try{
 const response1 = await this.axios.get(
               this.$store.server_domain + " /user/favoriteRecipesPreview" ,{
            withCredentials: true,
          });
         console.log(response1.data);
        const favoriteRecipesResult = response1.data;
         this.FavoriteRecipes = favoriteRecipesResult;
        // this.RandomRecipes.push(...RandomRecipesResult);
   } catch (error) {
        console.log(error);
  }
  }

};
</script>

<style>

</style>