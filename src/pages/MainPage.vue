<template>
  <div class="container">
    <h6  class="mb-14 " style=" color:#008080; font-size: 26px;text-align: center;">Randome recipes: </h6>     
    <RecipePreviewGrid  :recipes="demoRecipes"  />

 <h4 v-if="!this.$store.LoggedIn" class="mb-14 " style=" color:#008080; font-size: 26px;">If you want to see this, you need to <b-link :to="{ name: 'login' }">Login</b-link> </h4>  
  <br>
   <h6  class="mb-14 "  v-if="!this.$store.LoggedIn" style=" color:#008080; font-size: 26px;
   text-align: center;  filter: blur(3px);">Last Watched Recipes: </h6>
   <h6  class="mb-14 " v-if="this.$store.LoggedIn" style=" color:#008080; font-size: 26px;text-align: center;">Last Watched Recipes: </h6>
    <RecipePreviewGrid 
     
      :class="{
        RandomRecipes: true,
        blur: !this.$store.LoggedIn,
        center: true,
      }"
      disabled
      :recipes="demoRecipes"
    >
    </RecipePreviewGrid>
  
  </div>
</template>

<script>
  import { mdbBtn } from 'mdbvue';
import RecipePreviewGrid from "../components/RecipePreviewGrid";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
   // RecipePreviewList,
    RecipePreviewGrid,

  },
data(){
  return{
      RandomRecipes: [],
      demoRecipes: this.$store.demoRecipes,
      LastWatchedRecipes: [],
       username: this.$store.username
    };
  },
 async created() {
    const response1 = await this.axios.get(
          "https://test-for-3-2.herokuapp.com/recipes/randomRecipesPreview"
        ); 
        const RandomRecipesResult = response1.data.recipes;
         this.RandomRecipes = [];
         this.RandomRecipes.push(...RandomRecipesResult);

        if (this.$store.LoggedIn) {
         const response2 = await this.axios.get(
          "https://test-for-3-2.herokuapp.com//user/lastWatchedRecipesPreview"
        ); 
        const LastWatchedResult = response1.data.recipes;
         this.demoRecipes = [];
         this.demoRecipes.push(...LastWatchedResult);
        }
}
  
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 2px 0 10px;
}
.blur {
  -webkit-filter: blur(6px); /* Safari 6.0 - 9.0 */
  filter: blur(3px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
