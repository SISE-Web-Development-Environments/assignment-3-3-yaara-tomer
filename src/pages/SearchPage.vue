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
    <b-overlay v-if="showResults" :show="loading" rounded="sm">
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
        <RecipePreviewGrid v-if="show" :recipes="demoRecipes" />
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
  data() {
    return {
      form: {
        query: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        number: 5,
      },
      show: true,
      loading: false,
      showResults: true,
      recipes: [],
      demoRecipes: this.$store.demoRecipes,
      sortBy: {
        key: "",
        order: "",
      },
    };
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.items.length / this.itemsPerRow);
    },
  },

  methods: {
    onSearch(evt) {
      evt.preventDefault();
      this.updateRecipes();
      //alert(JSON.stringify(this.form));
    },
    async updateRecipes() {
      this.loading = true;
      try {
        // const response = await this.axios.get(
        //   this.$store.server_domain + "search",
        //   {
        //     params: {
        //       q: this.form.query,
        //       n: this.form.number,
        //       cuisine: this.form.cuisine,
        //       diet: this.form.diet,
        //       intolerances: this.form.diet,
        //     },
        //   }
        // );
        const response = await this.axios.get(
          "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        console.log(response.data);
        const SearchResultsRecipes = response.data.recipes;
        console.log("type of SearchResultsRecipes: " + SearchResultsRecipes);

        this.recipes = [];
        this.recipes.push(...SearchResultsRecipes);
        // this.recipes.push(...SearchResultsRecipes);
        // this.recipes.shift();

        //add recipes meta data if loogedin
        if (this.$store.LoggedIn) {
          console.log("before sending");
          //console.log(this.$store.recipesMetaData);

          //new recipes ids
          let all_ids = this.recipes.map((recipe) => recipe.id);
          console.log("all ids: " + all_ids);

          //filter only recipes we dont have meta data on
          let ids = all_ids.filter((id) => !this.$store.recipesMetaData[id]);
          console.log("relevant ids: " + ids);

          // let MetaDataresponse = await this.axios.get(
          //   this.$store.server_domain + "user/recipeInfo/[" + ids + "]",
          //   { withCredentials: true }
          // );
          let MetaDataresponse = await this.axios.get(
            this.$store.server_domain + "user/recipeInfo/[" + 638342 + "]",
            { withCredentials: true }
          );
          this.$store.recipesMetaData[638342] = MetaDataresponse.data[638342];
          // add recipes meta data to shared store
          ids.map((recipe_id) => {
            this.$store.recipesMetaData[recipe_id] =
              MetaDataresponse.data[recipe_id];
          });
          console.log(this.$store.recipesMetaData);
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
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
  },
};
</script>
