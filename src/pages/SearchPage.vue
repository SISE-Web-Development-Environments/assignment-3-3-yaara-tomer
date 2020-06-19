<template>
  <b-container>
    <b-row class="mb-2 mt-2">
      <b-col>
        <b-form-input
          id="search-query"
          v-model="form.query"
          type="search"
          placeholder="Enter your search key word"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <b-form-select
          id="search-Cuisine"
          class="mb-2 mr-sm-2 mb-sm-0"
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
      </b-col>

      <b-col>
        <b-form-select
          id="search-Diet"
          v-model="form.diet"
          class="mb-2 mr-sm-2 mb-sm-0"
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
      </b-col>

      <b-col>
        <b-form-select
          id="search-intolerance"
          class="mb-2 mr-sm-2 mb-sm-0"
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
      </b-col>
      <b-col>
        <b-form-select
          id="search-number"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="form.number"
          :options="[{ text: 'Number of results', value: 5 }, 5, 10, 15]"
        ></b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-button block variant="primary" @click="onSearch">Search</b-button>
    </b-row>
    <b-overlay :show="loading" rounded="sm">
      <b-row class="mt-5">
        <b-col
          >{{ recipes.length }} recipe results for "{{ form.query }}"</b-col
        >
        <b-col></b-col>
        <b-col class="text-right">Sort By:</b-col>

        <b-col>
          <b-form-select
            id="search-sort"
            class="mb-2 mr-sm-2 mb-sm-0"
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
        </b-col>
      </b-row>
      <b-row>
        <RecipePreviewGrid :recipes="recipes" />
      </b-row>
    </b-overlay>
  </b-container>
</template>

<script>
import _ from "lodash";
import RecipePreviewGrid from "../components/RecipePreviewGrid";
export default {
  name: "Search",
  components: {
    RecipePreviewGrid,
  },
  mounted() {
    console.log("search mounted");
    if (this.$store.lastSearch) {
      this.recipes = this.$store.lastSearch.results;
      this.form = this.$store.lastSearch.form;
    }
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

        console.log(response.data);
        const SearchResultsRecipes = response.data;

        this.recipes = [];
        this.recipes.push(...SearchResultsRecipes);
        this.saveLastSearchResults();

        //add recipes meta data if loogedin
        if (this.$store.LoggedIn) {
          this.updateRecipesMetaData();
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
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
        console.log("created lastsearch: "+this.$store.lastSearch);
      }

      this.$store.lastSearch.results = this.recipes;
      this.$store.lastSearch.form = this.form;
      console.log("saved results:" + this.$store.lastSearch);
    },
  },
};
</script>
