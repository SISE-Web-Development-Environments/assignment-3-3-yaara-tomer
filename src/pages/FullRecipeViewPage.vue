<template>
  <div class="container" >
    <div class="jumbotron text-center" style="width:100%; background-color:#e6fff2;">
      <!-- Title -->
      
        <h4 class="indigo-text h5 mb-4">{{ recipe.title }}</h4>
        <img :src="recipe.image" class="center" style=" border-radius: 25px;" />
   
      <br />
      <div class="row"  style="width:100%;">
        <div class="col-md-2">
          <mdb-icon icon="clock" size="lg" class="orange-text" />
          {{ recipe.readyInMinutes }} min
        </div>
        <div class="col-md-2">
          <mdb-icon icon="thumbs-up" size="lg" class=" blue-text pr-2" />
          {{ recipe.aggregateLikes }}
          Likes
        </div>

        <div class="col-md-2">
          <mdb-icon icon="users" size="lg" class=" purple-text pr-2" />
          {{ recipe.servings }}
          Servings
        </div>

        <div class="col-md-2">
          <p>
            <mdb-icon
              icon="bread-slice"
              size="lg"
              class="amber-text pr-1"
            />Gluten Free
          </p>
        </div>
        <div class="col-md-2">
          <p v-if="showVegan">
            <mdb-icon icon="leaf" size="lg" class="green-text pr-2" />{{
              leafText
            }}
          </p>
        </div>

        <div class="col  px-lg-1" v-if="isLoggedIn">
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


        <div class="row">
           <div class="col-4">
   <h4 class="indigo-text h5 mb-4">Ingredients:</h4>
   <div style="  font-weight: normal; text-align: left; border-radius: 25px;padding :10px; 
  background: #ffffe6;">
   <ul style=" list-style-type: none;  ">
              <li 
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              ><div style=" text-align: left; margin-left:-30px;  padding:4px 1px 4px 1px;">
                {{ r.name }} </div>
             
              </li>
            </ul>
    </div></div>
    <div class="col-8">
      <h4 class="indigo-text h5 mb-4">Instructions:</h4>

     <ol style="font-size: 18px; font-weight: bold; ">
              <li v-for="s in recipe._instructions" :key="s.number">
               <div  style="  font-weight: normal; text-align: left; border-radius: 25px;
  background: #ffffe6;
  padding: 20px; "> {{ s.step }} </div> <br>
              </li>
            </ol>
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
      recipe: null,
      isFamily: false,
      isLoggedIn: false,
      showVegan: true,
      showglutenFree: true,
      leafText: "Vegetarian",
      isFavorite: false,
      isWatched: true,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$store.server_domain + "recipes/fullRecipeByid",
          {
            params: { id: this.$route.params.recipeId },
          }
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        //this.$router.replace("/");
        return;
      }
      console.log(response);
      this.isLoggedIn = this.$store.loggedIn;
      let {
        aggregateLikes,
        analyzedInstructions,
        extendedIngredients,
        glutenFree,
        id,
        image,
        instructions,
        readyInMinutes,
        servings,
        title,
        vegan,
        vegetarian,
       } = response.data;
     // } = this.$store.FullRecipeDemo;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        id,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings,
      };

      this.recipe = _recipe;
      this.showVegan = this.recipe.vegan || this.recipe.vegetarian;
      if (this.recipe.vegan === true) this.leafText = "Vegan";
      this.showglutenFree = this.recipe.glutenFree;
      this.isLoggedIn = this.$store.loggedIn;
      if (this.$store.loggedIn) {
        if (this.$store.recipesMetaData[this.recipe.id]) {
          // recipe alredy in metadata
          this.isFavorite = this.$store.recipesMetaData[
            this.recipe.id
          ].favorite;
          this.isWatched = true;
        } else {
          let MetaDataresponse = await this.axios
            .get(this.$store.server_domain + "user/recipeInfo/[" + this.recipe.id + "]", {
              withCredentials: true,
            })
            .catch((error) => {
              console.log("failed get recipes metadata: " + error);
            });
          this.$store.recipesMetaData[this.recipe.id] =
            MetaDataresponse.data[this.recipe.id];
          this.isFavorite = this.$store.recipesMetaData[
            this.recipe.id
          ].favorite;
          this.isWatched = this.$store.recipesMetaData[this.recipe.id].watched;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // async getRegularRecipe() {
    //   try {
    //     let response = await this.axios.get(
    //       "https://test-for-3-2.herokuapp.com/recipes/info",
    //       {
    //         params: { id: this.$route.params.recipeId },
    //       }
    //     );

    //     // console.log("response.status", response.status);
    //     if (response.status !== 200) this.$router.replace("/NotFound");
    //   } catch (error) {
    //     console.log("error.response.status", error.response.status);
    //     //this.$router.replace("/");
    //     return;
    //   }
    // },
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
            console.log(
              " not 200 server failed to set as favorite. id: " + recipe.id
            );
            this.isFavorite = !this.isFavorite;
            this.$store.recipesMetaData[
              this.recipe.id
            ].favorite = this.isFavorite;
          }
        })
        .catch((error) => {
          console.log(
            "error server failed to set as favorite. id: " + recipe.id
          );
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
            console.log(
              " not 200 server failed to set as favorite. id: " + recipe.id
            );
            this.isFavorite = !this.isFavorite;
            this.$store.recipesMetaData[
              this.recipe.id
            ].favorite = this.isFavorite;
          }
        })
        .catch((error) => {
          console.log(
            "error server failed to set as favorite. id: " + recipe.id
          );
          this.isFavorite = !this.isFavorite;
          this.$store.recipesMetaData[
            this.recipe.id
          ].favorite = this.isFavorite;
        });
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
