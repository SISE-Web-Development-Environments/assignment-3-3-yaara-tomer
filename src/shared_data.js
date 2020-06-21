export const shared_data = {
  server_domain: "https://recipes-tomer-yaara.herokuapp.com/",

  loggedIn: false,

  userInfo: undefined,
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

  FullRecipeDemo : {
    
    "title": "Açaí Breakfast Bowl Recipe",
    "readyInMinutes": "10",
    "image": "https://res.cloudinary.com/dafevgodq/image/upload/v1591350629/webdev/AcaiBowlRecipe_rvfcbk.webp",
    "vegan": "true",
    "vegetarian": "true",
    "glutenFree": "true",
    "aggregateLikes": "30",
    "ingredients": [
        " strawberries",
		"blueberries",
		"mango",
		"bananas",
		"açaí",
		"almond milk"
        
    ],
    "extendedIngredients": [
        {
            "name": "2 cups strawberries (frozen)",
            "originalString": "strawberries",
            "amount": "2",
            "unit": "cup"
        },
        {
            "name": "1/2 cup blueberries (frozen)",
            "originalString": "blueberries",
            "amount": "0.5",
            "unit": "cup"
        },
        {
            "name": "1/2 cup mango slices",
            "originalString": "mango",
            "amount": "0.5",
            "unit": "cup"
        },
        {
            "name": "2 ripe bananas (sliced and frozen)",
            "originalString": "bananas",
            "amount": "0.5",
            "unit": "unit"
        },
        {
            "name": "4 tablespoons organic açaí freeze-dried powder",
            "originalString": "açaí",
            "amount": "4",
            "unit": "tablespoons"
        },
        {
            "name": "1 cup unsweetened almond milk",
            "originalString": "almond milk",
            "amount": "1",
            "unit": "cup"
        }
    ],
    "instructions": "<string>",
    "analyzedInstructions": [
        {
            "name": "<string>",
            "steps": [
                {
                    "number": "1",
                    "step": "The night before, wash and dry your fruits. Remove any leaves from the strawberries and stems from the blueberries. Slice the banana. Pop all the fruits pieces into a Ziploc bag and freeze for the next morning. You can also buy ready frozen fruits, which are always handy to keep in the freezer just in case."
                },
                {
                    "number": "2",
                    "step": "When you are ready for breakfast or a power-packed snack, blend the fruits using an immersion blender or food processor, with the açaí powder, the almond milk to create a thick, yogurt-like consistency. Do not over-process or the mixture can go slimy. If the puree is too thick, add a little more nut milk. Too thin, whizz again with another banana or more frozen fruits."
                },
                {
                    "number": "3",
                    "step": "Divide the açaí blend between two bowls, roomy enough to hold the toppings. Then pile on your chosen healthy topping; the choice is up to you. "
                }
            ]
        }
    ],
    "servings": "2"
},
  
};
