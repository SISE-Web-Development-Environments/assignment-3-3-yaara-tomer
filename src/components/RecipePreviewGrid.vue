<template>
  <b-container>
    <b-row class="mb-5 mt-5" v-for="i in rowCount" :key="i">
      <b-col cols="4" v-for="r in itemCountInRow(i)" :key="r.id">
        <mdb1 :recipe="r"></mdb1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import mdb1 from "./mdb1";
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipePreviewGrid",
  components: {
    // RecipePreview,
    mdb1
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
