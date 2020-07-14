<template>
    <div class="container" style="background-color:#fff2e6;"> 
      <br> 
    <h6  class="mb-14 " style=" color:#BC8F8F; font-size: 26px;text-align: center; font-family: Impact, Charcoal, sans-serif;">My Personal Recipes: </h6>     
    <RecipePreviewGrid  :recipes="PersonalRecipes"  />
    <br>
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
      PersonalRecipes: [],   
      };
  },
  async created() {
    try{
 const response1 = await this.axios.get(
               this.$store.server_domain + "user/PersonalRecipesPreview" ,{
            withCredentials: true,
          });
         console.log(response1.data);
         //add recipe type to all recipe - (r=regular, p=personal, f=family)
    
        const PersonalRecipesResult = response1.data;
         this.PersonalRecipes = PersonalRecipesResult;
             this.PersonalRecipes.forEach(function(recipe) {
          recipe.type = "p";
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