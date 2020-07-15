<template>
  <mdb-container>
    <mdb-card class="preview-card" style="width: 20rem">
      <mdb-view>
        <a @click="handleEnterRecipe">
          <mdb-card-image
            top
            class="zoom"
            :src="recipe.image"
            alt="Card image cap"
          />
        </a>
      </mdb-view>

      <mdb-card-body>
        <mdb-card-title class="font-weight-bold"
          ><a @click="handleEnterRecipe">{{ recipe.title }}</a></mdb-card-title
        >

        <hr class="my-3" />
        <div class="line1">
          <div class="d-flex justify-content-between ">
            <p>
              <mdb-icon icon="clock" size="lg" class="orange-text" />
              {{ recipe.readyInMinutes }} min
            </p>
            <p v-if="recipe.type==='r'">
              <mdb-icon icon="thumbs-up" size="lg" class=" cyan-text pr-2" />
              {{ recipe.aggregateLikes }}
              Likes
            </p>
          </div>
          <div class="d-flex justify-content-between ">
            <p v-if="recipe.vegan || recipe.vegetarian">
              <mdb-icon icon="leaf" size="lg" class="green-text pr-2" />{{
                recipe.vegan ? "Vegan" : "Vegetarian"
              }}
            </p>
            <p v-if="recipe.glutenFree">
              <mdb-icon
                icon="bread-slice"
                size="lg"
                class="amber-text pr-1"
              />Gluten Free
            </p>
            <p v-else>
              <mdb-icon
                icon="bread-slice"
                size="lg"
                class="amber-text pr-1"
              />with Gluten
            </p>
          </div>
        </div>
        <hr v-if="isLoggedIn" class="my-2" />

        <div v-if="isLoggedIn" class="d-flex justify-content-between ">
          <a v-if="!isFavorite && recipe.type==='r'" @click="handleFavorite" class="px-2"
            ><mdb-icon far icon="star" size="lg" /> Add To Favorite</a
          >
          <a v-if="isFavorite" @click="handleFavorite" class="px-2"
            ><mdb-icon class="pink-text" fas icon="star" size="lg" />
            Favorite</a
          >
          <a v-if="isWatched" class="px-2"
            ><mdb-icon class="grey-text" fas icon="eye" size="lg" /> Watched</a
          >
        </div>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbIcon,
  mdbView,
} from "mdbvue";

export default {
  name: "RecipePreview",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbIcon,
    mdbView,
  },
  mounted() {
    console.log("RecipePreview mounted!");
    this.isLoggedIn = this.$store.loggedIn;
    if (this.$store.recipesMetaData[this.recipe.id]) {
      this.isFavorite = this.$store.recipesMetaData[this.recipe.id].favorite;
      this.isWatched = this.$store.recipesMetaData[this.recipe.id].watched;
    }
  },
  data() {
    return {
      isFavorite: false,
      isWatched: false,
      isLoggedIn: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
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
    handleEnterRecipe() {
      this.$router.push({
        name: "recipe",
        params: { recipeType: this.recipe.type, recipeId: this.recipe.id },
      });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font-weight-bold {
  min-height: 3.5rem;
}
.line1 {
  min-height: 4.9rem;
}
.collapse {
  transition: height 0.3s;
}
.collapse-item {
  transition: all 0.5s;
}
</style>
