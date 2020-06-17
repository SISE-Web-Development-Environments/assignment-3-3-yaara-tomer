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
                text: 'Preparation time',
                value: {
                  key: 'readyInMinutes',
                  order: 'desc',
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
        <RecipePreviewGrid
          v-if="show"
          class="RandomRecipes center"
          :itemsPerRow="4"
          :recipes="recipes"
        />
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
      sortBy: {
        key: "readyInMinutes",
        order: "desc",
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
        //const SearchResultsRecipes = response.data;
        const SearchResultsRecipes = response.data.recipes;

        this.recipes = [];
        this.recipes.push(...SearchResultsRecipes);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    orderedRecipes() {
      console.log(this.sortBy);

      console.log(this.recipes);
      if (this.sortBy.key) {
        this.recipes = _.sortBy(
          this.recipes,
          this.sortBy.key,
          this.sortBy.oredr
        );
      }
      console.log(this.recipes);
    },
  },
};
</script>
