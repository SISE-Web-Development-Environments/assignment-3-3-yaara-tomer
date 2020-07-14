<template>
  <div class="container" style=" background-color:  #ffe6e6 ;">
    <br />
    <h6
      class="mb-14"
      style=" color:#DB7093; font-size: 26px;text-align: center; font-family: Impact, Charcoal, sans-serif;"
    >
      My Favorite Recipes:
    </h6>
    <RecipePreviewGrid :recipes="FavoriteRecipes" />
    <br />
  </div>
</template>

<script>
import RecipePreviewGrid from "../components/RecipePreviewGrid";
export default {
  components: {
    RecipePreviewGrid,
  },
  data() {
    return {
      FavoriteRecipes: [],
    };
  },
  async created() {
    try {
      console.log("created");
      const response1 = await this.axios.get(
        this.$store.server_domain + "user/favoriteRecipesPreview",
        {
          withCredentials: true,
        }
      );
      console.log(response1.data);
      const favoriteRecipesResult = response1.data;
      await this.updateRecipesMetaData(favoriteRecipesResult);
      this.FavoriteRecipes = favoriteRecipesResult;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async updateRecipesMetaData(array) {
      console.log("update Favorive Recipes MetaDta started");

      //search results recipes ids
      let ids = array.map((recipe) => recipe.id);

      //get meta data from server for new recipes
      if (ids.length > 0) {
        let MetaDataresponse = await this.axios
          .get(this.$store.server_domain + "user/recipeInfo/[" + ids + "]", {
            withCredentials: true,
          })
          .catch((error) => {
            console.log("failed get recipes metadata: " + error);
          });

        // add New recipes meta data to shared store
        ids.map((recipe_id) => {
          this.$store.recipesMetaData[recipe_id] =
            MetaDataresponse.data[recipe_id];
        });
      }
    },
  },
};
</script>

<style></style>
