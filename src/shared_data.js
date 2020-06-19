export const shared_data = {
  server_domain: "https://recipes-tomer-yaara.herokuapp.com/",

  LoggedIn: true,

  userDetails: undefined,

  username: "yaara",

  recipes: {},

  recipesMetaData: {
    "111": {
      watched: true,
      favorite: false,
    },
    "222": {
      watched: false,
      favorite: true,
    },
    "638342": {
      watched: true,
      favorite: true,
    },
    "632826": {
      watched: true,
      favorite: true,
    },
  },

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
    },
    {
      id: 716380,
      title: "Watermelon Mocktail Drink",
      image: "https://spoonacular.com/recipeImages/716380-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      aggregateLikes: 33,
    },
    {
      id: 632169,
      title: "Almond Plum Cake with Creme Fraiche ",
      image: "https://spoonacular.com/recipeImages/632169-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      aggregateLikes: 8,
    },
    {
      id: 658967,
      title: "Saffron Chicken Tikka",
      image: "https://spoonacular.com/recipeImages/658967-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      aggregateLikes: 34,
    },
    {
      id: 637569,
      title: "Cheese Pork Chops",
      image: "https://spoonacular.com/recipeImages/637569-556x370.jpg",
      readyInMinutes: 30,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      aggregateLikes: 7,
    },
    {
      id: 665276,
      title: "Whole Wheat Chocolate Chip Cookies",
      image: "https://spoonacular.com/recipeImages/665276-556x370.jpg",
      readyInMinutes: 45,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      aggregateLikes: 59,
    },
  ],

  login(username) {

    this.username = username;
    console.log("login", this.username);
  },
  logout() {

    this.username = undefined;
  },
};
