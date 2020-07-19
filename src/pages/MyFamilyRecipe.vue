<template>
  <div class="container" style=" background-color: #f3e5f5 ;">
    <br>
    <h6 class="mb-14" style="  font-size: 26px; color: #a871a8 ;font-family: Impact, Charcoal, sans-serif;  text-align: center; align-items: center; justify-content: center;">My Family Recipes:</h6>
    <RecipePreviewGrid :recipes="FamilyRecipes" />
    <br>
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
      FamilyRecipes: [],    
    };
  },
  async created() {
   try{
 const response1 = await this.axios.get(
               this.$store.server_domain + "user/familyRecipesPreview" ,{
            withCredentials: true,
          });
         console.log(response1.data);
         //add recipe type to all recipe - (r=regular, p=personal, f=family)
     
        const familyRecipesResult = response1.data;
         this.FamilyRecipes = familyRecipesResult;
            this.FamilyRecipes.forEach(function(recipe) {
          recipe.type = "f";
        });
        // this.RandomRecipes.push(...RandomRecipesResult);
   } catch (error) {
        console.log(error);
  }

  }
};
</script>

<style>

</style>