<template>
  <div class="container">
    <div
      class="jumbotron text-center"
      style="width:100%; background-color:#ffddcc;"
    >
      <h4 class="title" style="color: #d65cad ;font-family: Impact, Charcoal, sans-serif;">{{ recipe.title }}</h4> <br />
      <img :src="recipe.image" class="center" style=" border-radius: 25px;" />

      <br />   <br />
      <div class="row" style="width:100%;">
        <!-- background-color: lightblue; -->
        <div class="col-md-auto">
          <mdb-icon icon="clock" size="lg" class="orange-text" />
          {{ recipe.readyInMinutes }} min
        </div>
        <div v-if="type === 'r'" class="col-md-2">
          <mdb-icon icon="thumbs-up" size="lg" class=" cyan-text pr-2" />
          {{ recipe.aggregateLikes }}
          Likes
        </div>
        <div class="col-md-auto">
          <mdb-icon icon="users" size="lg" class=" purple-text pr-2" />
          {{ recipe.servings }}
          Servings
        </div>
        <div class="col-md-auto" v-if="recipe.glutenFree">
          <p>
            <mdb-icon
              icon="bread-slice"
              size="lg"
              class="amber-text pr-1"
            />Gluten Free
          </p>
        </div>
          <div class="col-md-auto" v-else>
          <p>
            <mdb-icon
              icon="bread-slice"
              size="lg"
              class="amber-text pr-1"
            />with Gluten
          </p>
        </div>
        <div class="col-md-auto" v-if="recipe.vegan || recipe.vegetarian">
          <p>
            <mdb-icon icon="leaf" size="lg" class="green-text pr-2" />{{
              recipe.vegan ? "Vegan" : "Vegetarian"
            }}
          </p>
        </div>

        <div class="col  px-lg-1" v-if="isLoggedIn && type === 'r'">
          <a v-if="!isFavorite" @click="handleFavorite" class="px-2"
            ><mdb-icon far icon="star" size="lg" /> Add To Favorite</a
          >
          <a v-if="isFavorite" @click="handleFavorite" class="px-2"
            ><mdb-icon class="pink-text" fas icon="star" size="lg" />
            Favorite</a
          >
        </div>
      </div>
      <br />
      <div class="row" v-if="isFamily">
        <div class="col-8" style=" border-radius: 25px;padding :10px; background: #ffffe6;margin-left:165px;" >
          <h4 style="color: #d65cad; text-align: left">
            Made By: {{ recipe.byWho }}, {{ recipe.when }}.
          </h4>
           <h4 style="color: #d65cad ; text-align: left">
          Origin cousine: {{ recipe.country }}      
           <img
              :src="flagImage"
              class=" z-depth-0 mr-2"
              alt="image"
              height="26"
            />
         
          </h4> 
        </div>
      </div>

      <br />
 <br />

      <div class="row">
        <div class="col-4">
          <h4 style="color: #d65cad">Ingredients:</h4>
          <div
            style="  font-weight: normal; text-align: left; border-radius: 25px;padding :10px; background: #ffffe6;"
          >
            <ul style=" list-style-type: none;  ">
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                <div
                  style=" text-align: left; margin-left:-30px;  padding:4px 1px 4px 1px;"
                >
                  {{ r.originalString }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-8">
          <h4 style="color: #d65cad">Instructions:</h4>
          <div
            v-for="(phase, index) in recipe.analyzedInstructions"
            :key="index"
            style="font-size: 18px; font-weight: bold; "
          >
            <h5
              class="indigo-text h5 mb-2"
              style="text-align: left; margin-left: 40px;"
            >
              {{ phase.name }}
            </h5>
            <ol>
              <li
                v-for="(s, index) in phase.steps"
                :key="index"
                style="  font-weight: normal; text-align: left; border-radius: 25px; background: #ffffe6; padding: 20px; "
                class="mb-4"
              >
                {{ s.step }}
                <br />
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from "mdbvue";
export default {
  components: {
    mdbIcon,
  },
  data() {
    return {
      recipe: {},
      flag_url:"",
      isFamily: false,
      isLoggedIn: false,
      isFavorite: false,
      type: "",
      isReady: false,
    };
  },
    computed: {
    flagImage() {
      if (this.$store.loggedIn && this.recipe.flag) {
        return this.recipe.flag
      } else {
        return undefined
      }
    },
  },
  async created() {
    this.isLoggedIn = this.$store.loggedIn;
    let response;
    let type = this.$route.params.recipeType;
    let recipeId = this.$route.params.recipeId;
    this.type = type;
    try {
      //get recipe from server
      if (type === "r") {
        response = await this.axios.get(
          this.$store.server_domain + "recipes/fullRecipeByid",
          {
            params: { id: recipeId },
          }
        );
      } else if (type === "p") {
        response = await this.axios.get(
          this.$store.server_domain + "user/personalRecipeByid?id=" + recipeId,
          {
            withCredentials: true,
          }
        );
      } else if (type === "f") {
        this.isFamily=true;
        response = await this.axios.get(
          this.$store.server_domain + "user/familyRecipeByid?id=" + recipeId,
          {
            withCredentials: true,
          }
        );
      } else {
        // console.log("type error:", type);
        this.$router.push("/NotFound");
        return;
      }
    } catch (err) {
      this.$router.push("/NotFound");
      return;
    }

    this.recipe = response.data; //this.$store.FullRecipeDemo;
    this.flag = this.recipe.flag;
    if (this.isLoggedIn) {
      if (type === "r"){
      //get metaData if needeed
      this.updateRecipeMetadata();
    }
      //mark As Watched
      this.markAsWatched();
    }
  },
  methods: {
    async handleFavorite() {
      //update icon display
      this.isFavorite = !this.isFavorite;

      //update local store

      this.$store.recipesMetaData[this.recipe.id].favorite = !this.$store
        .recipesMetaData[this.recipe.id].favorite;

      //update server
      if (this.isFavorite === true) {
        this.addToFavorite();
      } else {
        this.removeFromFavorite();
      }

      //update server
    },
    async addToFavorite() {
      const response = await this.axios
        .post(
          this.$store.server_domain +
            "user/markAsFavorite?id=" +
            this.recipe.id,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          //if server failed restore previous value
          if (response.status !== 200) {
            // console.log(
            //   " not 200 server failed to set as favorite. id: " + recipe.id
            // );
            this.isFavorite = !this.isFavorite;
            this.$store.recipesMetaData[
              this.recipe.id
            ].favorite = this.isFavorite;
          }
        })
        .catch((error) => {
          // console.log(
          //   "error server failed to set as favorite. id: " + recipe.id
          // );
          this.isFavorite = !this.isFavorite;
          this.$store.recipesMetaData[
            this.recipe.id
          ].favorite = this.isFavorite;
        });
    },
    async removeFromFavorite() {
      const response = await this.axios
        .post(
          this.$store.server_domain +
            "user/removeFromFavorite?id=" +
            this.recipe.id,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          //if server failed restore previous value
          if (response.status !== 200) {
            // console.log(
            //   " not 200 server failed to set as favorite. id: " + recipe.id
            // );
            this.isFavorite = !this.isFavorite;
            this.$store.recipesMetaData[
              this.recipe.id
            ].favorite = this.isFavorite;
          }
        })
        .catch((error) => {
          // console.log(
          //   "error server failed to set as favorite. id: " + recipe.id
          // );
          this.isFavorite = !this.isFavorite;
          this.$store.recipesMetaData[
            this.recipe.id
          ].favorite = this.isFavorite;
        });
    },
    async updateRecipeMetadata() {
      if (this.$store.recipesMetaData[this.recipe.id]) {
        // recipe alredy in metadata store
        this.isFavorite = this.$store.recipesMetaData[this.recipe.id].favorite;
      } else {
        let MetaDataresponse = await this.axios
          .get(
            this.$store.server_domain +
              "user/recipeInfo/[" +
              this.recipe.id +
              "]",
            {
              withCredentials: true,
            }
          )
          .catch((error) => {
            // console.log("failed get recipes metadata: " + error);
          });
        this.$store.recipesMetaData[this.recipe.id] =
          MetaDataresponse.data[this.recipe.id];
        this.isFavorite = this.$store.recipesMetaData[this.recipe.id].favorite;
      }
      //update local store watched
      this.$store.recipesMetaData[this.recipe.id].watched = true;
    },
    async markAsWatched() {
      //update local shared store queue
      this.$store.lastWatched = this.$store.lastWatched.filter( rec => rec.id !== this.recipe.id); //remove recipe if already exist in queue
      this.$store.lastWatched.unshift(this.recipe); //add it to top
      //update server
      let response = await this.axios.post(
        this.$store.server_domain +
          "user/markAsWatched?id=" +
          this.$route.params.recipeId +
          "&type=" +
          this.$route.params.recipeType,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log("markAsWatched: " + response.status);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
