<template>
  <div class="container">
    <h6  class="mb-14 " style=" color:#008080; font-size: 26px;text-align: center;">Explore these recipes </h6>     
    <RecipePreviewGrid  :recipes="RandomRecipes"  />

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
      :recipes="LastWatchedRecipes"
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
   try{
 const response1 = await this.axios.get(
          this.$store.server_domain + "recipes/randomRecipesPreview" 
        ); 
         console.log(response1.data);
        const RandomRecipesResult = response1.data;
         this.RandomRecipes = RandomRecipesResult;
        // this.RandomRecipes.push(...RandomRecipesResult);
   } catch (error) {
        console.log(error);
  }
   try{
  if (this.$store.LoggedIn) {
         const response2 = await this.axios.get(
          this.$store.server_domain + " /user/lastWatchedRecipesPreview" ,{
            withCredentials: true,
          }); 
        const LastWatchedResult = response2.data;
         this.LastWatchedRecipes = LastWatchedResult;
  }
  } catch (error) {
        console.log(error);
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
