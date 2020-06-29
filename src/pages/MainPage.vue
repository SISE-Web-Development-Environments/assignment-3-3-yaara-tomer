<template>
  <div class="container" style="background-color:#ffe6f2">
    <br />
    <h6
      class="mb-14 "
      style=" color:#26c6da  ; font-size: 26px;text-align: center;"
    >
      <strong>Explore these recipes! </strong>
      <button
        type="button"
        v-on:click="newRandom()"
        style=" margin-left: 120px; "
        class="btn btn-info btn-rounded"
      >
        New Random!
      </button>
    </h6>

    <RecipePreviewGrid :recipes="RandomRecipes" />

    <h4
      v-if="!this.$store.loggedIn"
      class="mb-14 "
      style=" color:#008080; font-size: 26px;"
    >
      If you want to see this, you need to
      <b-link :to="{ name: 'login' }" class="text-success">Login</b-link>
    </h4>
    <br />
    <h6
      class="mb-14 "
      v-if="!this.$store.loggedIn"
      style=" color:#008080; font-size: 26px;
   text-align: center;  filter: blur(3px);"
    >
      Last Watched Recipes:
    </h6>
    <h6
      class="mb-14 "
      v-if="this.$store.loggedIn"
      style=" color:#008080; font-size: 26px;text-align: center;"
    >
      Last Watched Recipes:
    </h6>
    <RecipePreviewGrid
      :class="{
        RandomRecipes: true,
        blur: !this.$store.loggedIn,
        center: true,
      }"
      disabled
      :recipes="LastWatchedRecipes"
    >
    </RecipePreviewGrid>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
import RecipePreviewGrid from "../components/RecipePreviewGrid";
export default {
  components: {
    // RecipePreviewList,
    RecipePreviewGrid,
  },
  data() {
    return {
      RandomRecipes: [],
      LastWatchedRecipes: [],
      isloggedIn: this.$store.loggedIn,
    };
  },

  async created() {
    try {
      //  const response1 = await this.axios.get(
      //           this.$store.server_domain + "recipes/randomRecipesPreview"
      //         );
      //          console.log(response1.data);

      //         const RandomRecipesResult = response1.data;
      //  this.RandomRecipes = RandomRecipesResult;
      this.RandomRecipes = this.$store.demoRecipes;
      this.RandomRecipes.forEach(function(recipe) {
        recipe.type = "r";
      });
      if (this.$store.loggedIn) {
        this.updateRandomRecipesMetaData();
      }
      // this.RandomRecipes.push(...RandomRecipesResult);
    } catch (error) {
      console.log(error);
    }
    try {
      if (this.$store.LoggedIn) {
        const response2 = await this.axios.get(
          this.$store.server_domain + " /user/lastWatchedRecipesPreview",
          {
            withCredentials: true,
          }
        );
        const LastWatchedResult = response2.data;
        this.LastWatchedRecipes = LastWatchedResult;
        //TODO send to meta data also?
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async updateRandomRecipesMetaData() {
      //search results recipes ids
      let all_ids = this.RandomRecipes.map((recipe) => recipe.id);

      //filter only recipes we dont have meta data on in store memory
      let ids = all_ids.filter((id) => !this.$store.recipesMetaData[id]);
      console.log("relevant ids: " + ids);
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
    async newRandom() {
      try {
        //  const response1 = await this.axios.get(
        //           this.$store.server_domain + "recipes/randomRecipesPreview"
        //         );
        //          console.log(response1.data);
        //         const RandomRecipesResult = response1.data;
        //  this.RandomRecipes = RandomRecipesResult;
        //add recipe type to all recipe - (r=regular, p=personal, f=family)

        this.RandomRecipes = this.$store.demoRecipes;
        this.recipes.forEach(function(recipe) {
          recipe.type = "r";
        });
        if (this.$store.loggedIn) {
          this.updateRandomRecipesMetaData();
        }
        // this.RandomRecipes.push(...RandomRecipesResult);
      } catch (error) {
        console.log(error);
      }
    },
  },
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
