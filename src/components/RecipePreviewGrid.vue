<template>
  <b-container>
    <b-row class="mb-5 mt-5" v-for="i in rowCount" :key="i">
      <b-col cols="4" v-for="r in itemCountInRow(i)" :key="r.id">
        <RecipePreview :recipe="r"></RecipePreview>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipePreviewGrid",
  components: {
    RecipePreview,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemsPerRow:3
    };
  },
  
  computed: {
    rowCount: function() {
      return Math.ceil(this.recipes.length / this.itemsPerRow);
    },
  },
  methods: {
    itemCountInRow(index) {
      return this.recipes.slice(
        (index - 1) * this.itemsPerRow,
        index * this.itemsPerRow
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
