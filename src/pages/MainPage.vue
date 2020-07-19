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
        <RecipePreviewGrid
          :recipes="RandomRecipes"
          :itemsPerRow="1"
          style="margin-left:100px;"
        />
        <button
          type="button"
          v-on:click="getRandomRecipes()"
          style="margin-left: 200px; "
          class="btn btn-info btn-rounded mb-4"
        >
          Explore More!
        </button>
      </div>
      <div
        class="col-6"
        style=" align-items: center; text-align: center; justify-content: center;"
      >
        <Login
          @loginSucces="updateWatchAfterLogedIn"
          v-if="!isloggedIn"
        ></Login>

        <h6
          class="mb-14"
          style=" color:#6495ED ; font-family: Impact, Charcoal, sans-serif; font-size: 26px;  margin-left:-200px;  text-align: center; align-items: center; justify-content: center;"
          v-if="isloggedIn"
        >
          Last Watched Recipes:
        </h6>
        <RecipePreviewGrid
          :recipes="LastWatchedRecipes"
          :itemsPerRow="1"
          v-if="isloggedIn"
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
    RecipePreviewGrid,
    Login,
  },
  data() {
    return {
      RandomRecipes: [],
      LastWatchedRecipes: [],
    };
  },
  computed: {
    isloggedIn() {
      return this.$store.loggedIn;
    },
  },
  async created() {
    try {
      await this.getRandomRecipes();

      if (this.$store.loggedIn) {
        await Promise.all([
          this.updateRecipesMetaData(this.RandomRecipes),
          this.getlastWatchRecipe(),
        ]);
      }
    } catch (error) {
      // console.log(error);
    }
  },
  methods: {
    async updateWatchAfterLogedIn() {
      this.LastWatchedRecipes = [];

      await Promise.all([
        this.updateRecipesMetaData(this.RandomRecipes),
        this.getlastWatchRecipe(),
      ]);
    },
    async updateRecipesMetaData(array) {
      //search results recipes ids
      let all_ids = array.map((recipe) => recipe.id);

      //filter only recipes we dont have meta data on in store memory and regular one (numeric id)
      let ids = all_ids.filter(
        (id) => !this.$store.recipesMetaData[id] && /^\d+$/.test(id)
      );
      // console.log("relevant ids: " + ids);

      //get meta data from server for new recipes
      if (ids.length > 0) {
        let MetaDataresponse = await this.axios
          .get(this.$store.server_domain + "user/recipeInfo/[" + ids + "]", {
            withCredentials: true,
          })
          .catch((error) => {
            // console.log("failed get recipes metadata: " + error);
          });

        // add New recipes meta data to shared store
        ids.map((recipe_id) => {
          this.$store.recipesMetaData[recipe_id] =
            MetaDataresponse.data[recipe_id];
        });
        // console.log(this.$store.recipesMetaData);
      }
    },
    async getRandomRecipes() {
      try {
        const response1 = await this.axios.get(
          this.$store.server_domain + "recipes/randomRecipesPreview"
        );
        const RandomRecipesResult = response1.data;
        this.RandomRecipes = RandomRecipesResult;

        // this.RandomRecipes = this.$store.demoRecipes;

        if (this.$store.loggedIn) {
          this.updateRecipesMetaData(this.RandomRecipes);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async getlastWatchRecipe() {
      try {
        //already exist in shared store
        if (this.$store.lastWatched) {
          this.LastWatchedRecipes = this.$store.lastWatched.slice(0, 3);
        } else {
          //first time - get from server
          const response2 = await this.axios.get(
            this.$store.server_domain + "user/lastWatchedRecipesPreview",
            {
              withCredentials: true,
            }
          );
          const LastWatchedResult = response2.data;
          // console.log(LastWatchedResult);
          this.$store.lastWatched = LastWatchedResult; //add to shared store too for later use
          // console.log("before update metadata of lastwatched:");

          await this.updateRecipesMetaData(LastWatchedResult); //update recipes metadata
          this.LastWatchedRecipes = LastWatchedResult; //update local data
          // console.log("update lastwatched array");
        }
      } catch (error) {
        // console.log(error);
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
// .container {

//   height: 100vh;
// }
</style>
