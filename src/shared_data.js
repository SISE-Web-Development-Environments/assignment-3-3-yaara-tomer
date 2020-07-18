export const shared_data = {
  server_domain: "https://recipes-tomer-yaara.herokuapp.com/",
  // server_domain: "http://localhost:8675/",

  loggedIn: false,

  userInfo: {},

  recipes: {},

  recipesMetaData: {},

  demoRecipes: [
    {
      id: 638342,
      title: "Chicken Stew For The Soul",
      image: "https://spoonacular.com/recipeImages/638343-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      aggregateLikes: 9,
      type:"r"
    },
    {
      id: 645147,
      title: "Grandma Inez's Pineapple Pie",
      image: "https://spoonacular.com/recipeImages/645147-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: true,
      glutenFree: false,
      aggregateLikes: 12,
      type:"r"
    },
    {
      id: 634986,
      title: "Bing's Banana Cake",
      image: "https://spoonacular.com/recipeImages/634986-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: true,
      glutenFree: false,
      aggregateLikes: 6,
      type:"r"
    },
  ],
};
