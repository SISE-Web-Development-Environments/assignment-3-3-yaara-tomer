<template>
  <div class="container">
    <div
      class="jumbotron text-center"
      style="width: 100%; background-color: #ffffcc    ;"
    >
      <div class="row">
        <div class="col">
          <h1 style="color:#ff9999">Search</h1>
          <br />
          <b-form-input
            id="search-query"
            v-model="form.query"
            type="search"
            style="width:250px;margin-left:58px; "
            placeholder="Enter your search key word"
          ></b-form-input>
          <br />
          <b-form-select
            id="search-number"
            style="width:200px; "
            v-model="form.number"
            :options="[{ text: 'Number of results', value: 5 }, 5, 10, 15]"
          ></b-form-select>
          <button
            type="button"
            class="btn btn-amber"
            style="width:150px;color:white;margin-left: 40px;"
            @click="onSearch"
          >
            <i class="fas fa-search"></i> Search
          </button>
        </div>
        <div class="col">
          <br />
          <h4 style="color:#ff9999">Filters (optional) :</h4>
          <h9 style="color:#cc0066">Cuisine: </h9
          ><b-form-select
            id="search-Cuisine"
            style="width:200px;  margin: 15px; margin-left: 40px;"
            v-model="form.cuisine"
            :options="[
              { text: 'Filter by Cuisine', value: null },
              'African',
              'American',
              'British',
              'Cajun',
              'Caribbean',
              'Chinese',
              'Eastern European',
              'European',
              'French',
              'German',
              'Greek',
              'Indian',
              'Irish',
              'Italian',
              'Japanese',
              'Jewish',
              'Korean',
              'Latin American',
              'Mediterranean',
              'Mexican',
              'Middle Eastern',
              'Nordic',
              'Southern',
              'Spanish',
              'Thai',
              'Vietnamese',
            ]"
          ></b-form-select>
          <br />
          <h9 style="color:#cc0066">Diet: </h9>
          <b-form-select
            id="search-Diet"
            v-model="form.diet"
            style="width:200px;  margin-left: 45px;  "
            :options="[
              { text: 'Filter by Diet', value: null },
              'Gluten Free',
              'Ketogenic',
              'Vegetarian',
              'Lacto-Vegetarian',
              'Ovo-Vegetarian',
              'Vegan',
              'Pescetarian',
              'Paleo',
              'Primal',
              'Whole30',
            ]"
          ></b-form-select>
          <br />
          <h8 style="color:#cc0066">Intolerance: </h8
          ><b-form-select
            id="search-intolerance"
            style="width:200px;  margin: 15px;  "
            v-model="form.intolerance"
            :options="[
              { text: 'Filter by Intolerance', value: null },
              'Dairy',
              'Egg',
              'Gluten',
              'Grain',
              'Peanut',
              'Seafood',
              'Sesame',
              'Shellfish',
              'Soy',
              'Sulfite',
              'Tree Nut',
              'Wheat',
            ]"
          ></b-form-select>
          <br />
        </div>
      </div>

      <br />

      <b-overlay :show="loading" rounded="sm">
        <div class="row">
          <h4 style="color:#ff9999;  margin-left:150px;">
            {{ recipes.length }} recipe results for "{{ form.query }}"
          </h4>

          <h4 style="color:#ff9999; margin-left:400px;">Sort By:</h4>

          <!-- <b-col class="text-right">Sort By:</b-col> -->

          <b-form-select
            id="search-sort"
            style="width:200px;"
            v-model="sortBy"
            @change="orderedRecipes"
            :options="[
              {
                text: 'Preparation Time',
                value: {
                  key: 'readyInMinutes',
                  order: 'asc',
                },
              },
              {
                text: 'Most Popular',
                value: {
                  key: 'aggregateLikes',
                  order: 'desc',
                },
              },
            ]"
          >
          </b-form-select>
        </div>

        <RecipePreviewGrid :recipes="recipes" />
      </b-overlay>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import RecipePreviewGrid from "../components/RecipePreviewGrid";
export default {
  name: "Search",
  components: {
    RecipePreviewGrid,
  },
  async mounted() {
    console.log("search start mounted");
    if (this.$store.lastSearch) {
      this.recipes = this.$store.lastSearch.results;
      this.form = this.$store.lastSearch.form;

      //if user loggedIn after search - get all recipes metadata
      // if (this.$store.loggedIn === true) {
      //   if (this.isLoggedIn === false) {
      //     this.isLoggedIn = true;
      //      await this.updateAllRecipesMetaData();
      //   }
      // } else {
      //   this.isLoggedIn = false;
      // }
    }
    console.log("search finish mounted");
  },
  data() {
    return {
      form: {
        query: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        number: 5,
      },
      // show: false,
      loading: false,
      isLoggedIn: false,
      recipes: [],
      demoRecipes: this.$store.demoRecipes,
      sortBy: {
        key: "",
        order: "",
      },
    };
  },
  methods: {
    onSearch(evt) {
      evt.preventDefault();
      this.updateRecipes();
    },
    async updateRecipes() {
      this.loading = true;
      try {
        const response = await this.axios.get(
          this.$store.server_domain + "search",
          {
            params: {
              q: this.form.query,
              n: this.form.number,
              cuisine: this.form.cuisine,
              diet: this.form.diet,
              intolerances: this.form.diet,
            },
          }
        );

        const SearchResultsRecipes = response.data;

        this.recipes = [];
        this.recipes.push(...SearchResultsRecipes);

        //add recipe type to all recipe - (r=regular, p=personal, f=family)
        this.recipes.forEach(function(recipe) {
          recipe.type = "r";
        });

        //save search result
        this.saveLastSearchResults();

        //add recipes meta data if loogedin
        if (this.$store.loggedIn) {
          this.updateRecipesMetaData();
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async updateRecipesMetaData() {
      console.log("updateRecipesMetaDta started");

      //search results recipes ids
      let all_ids = this.recipes.map((recipe) => recipe.id);
      console.log("all ids: " + all_ids);

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
    orderedRecipes() {
      if (this.sortBy.key) {
        this.recipes = _.orderBy(
          this.recipes,
          this.sortBy.key,
          this.sortBy.order
        );
      }
    },
    async saveLastSearchResults() {
      console.log("start saving results");
      if (!this.$store.lastSearch) {
        this.$store.lastSearch = {};
        console.log("created lastsearch: " + this.$store.lastSearch);
      }

      this.$store.lastSearch.results = this.recipes;
      this.$store.lastSearch.form = this.form;
      console.log("saved results:" + this.$store.lastSearch);
    },
  },
};
</script>
