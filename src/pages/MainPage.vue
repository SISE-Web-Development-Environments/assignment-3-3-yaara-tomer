<template>
  <div class="container" style=" background-color: #e6ffff;">
    <br />
    <div class="row">
      <div class="col">
        <h6
          class="mb-14"
          style=" color:#6495ED ; font-family: Impact, Charcoal, sans-serif; font-size: 26px; text-align: center; align-items: center; justify-content: center;"
        >
         Explore these recipes!
        </h6>
        <RecipePreviewGrid :recipes="RandomRecipes" :itemsPerRow="1" style="margin-left:100px;" />
        <button
          type="button"
          v-on:click="newRandom()"
          style=" margin-left: 200px; "
          class="btn btn-info btn-rounded"
        >New Random!</button>
      </div>

      <div class="col-6" style=" align-items: center; text-align: center; justify-content: center;">
        <Login v-on:when-Log-in="updateWatch" v-if="!this.isloggedIn" />

        <h6
          class="mb-14"
          v-if="this.$store.loggedIn"
          style=" color:#008080; font-size: 26px;text-align: center; color:#6495ED;  text-align: center; align-items: center; justify-content: center;  font-family: Impact, Charcoal, sans-serif;"
        >
         Last Watched Recipes:
        </h6>
        <RecipePreviewGrid
          :recipes="LastWatchedRecipes"
          :itemsPerRow="1" style="margin-left:100px;"
          v-if="this.$store.loggedIn"
        ></RecipePreviewGrid>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
import RecipePreviewGrid from "../components/RecipePreviewGrid";
import Login from "../components/Login";
export default {
  components: {
    // RecipePreviewList,
    RecipePreviewGrid,
    Login
  },
  data() {
    return {
      RandomRecipes: [],
      LastWatchedRecipes: [],
      isloggedIn: this.$store.loggedIn
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
      if (this.$store.loggedIn) {
        this.getlastWatchRecipe();
      }

      // this.RandomRecipes.push(...RandomRecipesResult);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async updateWatch() {
      this.getlastWatchRecipe();
    },
    async updateRandomRecipesMetaData() {
      //search results recipes ids
      let all_ids = this.RandomRecipes.map(recipe => recipe.id);

      //filter only recipes we dont have meta data on in store memory
      let ids = all_ids.filter(id => !this.$store.recipesMetaData[id]);
      console.log("relevant ids: " + ids);
      //get meta data from server for new recipes
      if (ids.length > 0) {
        let MetaDataresponse = await this.axios
          .get(this.$store.server_domain + "user/recipeInfo/[" + ids + "]", {
            withCredentials: true
          })
          .catch(error => {
            console.log("failed get recipes metadata: " + error);
          });

        // add New recipes meta data to shared store
        ids.map(recipe_id => {
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

        if (this.$store.loggedIn) {
          this.updateRandomRecipesMetaData();
        }
        // this.RandomRecipes.push(...RandomRecipesResult);
      } catch (error) {
        console.log(error);
      }
    },
    async getlastWatchRecipe() {
      try {
        if (this.$store.loggedIn) {
          const response2 = await this.axios.get(
            this.$store.server_domain + "user/lastWatchedRecipesPreview",
            {
              withCredentials: true
            }
          );
          const LastWatchedResult = response2.data;
          console.log(LastWatchedResult);
          this.LastWatchedRecipes = LastWatchedResult;
          // this.LastWatchedRecipes = this.$store.demoRecipes;
          //TODO send to meta data also?
        }
      } catch (error) {
        console.log(error);
      }
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
// .container {

//   height: 100vh;
// }
</style>
