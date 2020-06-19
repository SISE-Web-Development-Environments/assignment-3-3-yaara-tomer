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
              <mdb-icon icon="clock" size="lg" class="blue-text pr-2" />
              {{ recipe.readyInMinutes }} min
            </p>
            <p>
              <mdb-icon icon="thumbs-up" size="lg" class=" blue-text pr-4" />
              {{ recipe.aggregateLikes }}
              Likes
            </p>
          </div>
          <div class="d-flex justify-content-between ">
            <p v-if="showVegan">
              <mdb-icon icon="leaf" size="lg" class="green-text pr-2" />{{
                leafText
              }}
            </p>
            <p v-if="showglutenFree">
              <mdb-icon
                icon="bread-slice"
                size="lg"
                class="amber-text pr-1"
              />Gluten Free
            </p>
          </div>
        </div>
        <hr v-if="isLoggedIn" class="my-2" />

        <div v-if="isLoggedIn" class="d-flex justify-content-between ">
          <a v-if="!isFavorite" @click="handleFavorite" class="px-2"
            ><mdb-icon far icon="star" size="lg" /> Add To Favorite</a
          >
          <a v-if="isFavorite" @click="handleFavorite" class="px-2"
            ><mdb-icon class="blue-text" fas icon="star" size="lg" />
            Favorite</a
          >
          <a v-if="showEye" class="px-2"
            ><mdb-icon class="black-text" fas icon="eye" size="lg" /> Watched</a
          >
        </div>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbIcon,
  mdbView,
  mdbMask,
  mdbBtn,
  mdbTooltip,
  mdbChip,
} from "mdbvue";

export default {
  name: "RecipePreview",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    // mdbCardText,
    mdbIcon,
    mdbView,
    // mdbMask,
    // mdbBtn,
    // mdbChip,
  },
  mounted() {
    console.log("recipe preview mounted!");
    console.log("recipesMetaData: " + this.$store.recipesMetaData.data);
    this.showVegan = this.recipe.vegan || this.recipe.vegetarian;
    if (this.recipe.vegan === true) this.leafText = "Vegan";
    this.showglutenFree = this.recipe.glutenFree;
    this.isLoggedIn = this.$store.LoggedIn;
    if (this.isLoggedIn) {
      console.log(
        "recpie meta date:" + this.$store.recipesMetaData[this.recipe.id]
      );
      this.isFavorite = this.$store.recipesMetaData[this.recipe.id].favorite;
      this.showEye = this.$store.recipesMetaData[this.recipe.id].watched;
    }
  },
  data() {
    return {
      showVegan: true,
      showglutenFree: true,
      showEye: false,
      //isFavorite: false,
      isLoggedIn: true,
      leafText: "Vegetarian",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // a computed getter
    isFavorite: function() {
      console.log("isFavorite computed");
      return this.$store.recipesMetaData[this.recipe.id].favorite;
    },
  },
  methods: {
    handleFavorite() {
      console.log("favorite");
      this.isFavorite = !this.isFavorite;
      this.$store.recipesMetaData[this.recipe.id].favorite = this.isFavorite;
      //TODO update server
    },
    handleEnterRecipe() {
      console.log("EnterRecipe");
      //this.$router.push({ path: `/recipe/${recipe.id}` });
      this.$router.push({ path: `/recipe/123` });
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
