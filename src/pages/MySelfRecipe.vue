<template>
    <div class="container">  
    <h6  class="mb-14 " style=" color:#008080; font-size: 26px;text-align: center;">My Personal Recipes: </h6>     
    <RecipePreviewGrid  :recipes="PersonalRecipes"  />
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
               this.$store.server_domain + " /user/PersonalRecipesPreview" ,{
            withCredentials: true,
          });
         console.log(response1.data);
        const PersonalRecipesResult = response1.data;
         this.PersonalRecipes = PersonalRecipesResult;
        // this.RandomRecipes.push(...RandomRecipesResult);
   } catch (error) {
        console.log(error);
  }
  }
};
</script>

<style>

</style>