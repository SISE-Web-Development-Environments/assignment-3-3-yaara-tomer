import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/search",
    name: "search",
    component:  () => import("./pages/SearchPage")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/MyFamilyRecipe")
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/MyFavoriteRecipe")
  },
  {
    path: "/personalRecipe",
    name: "personalRecipe",
    component: () => import("./pages/MySelfRecipe")
  },
  
  {
    path: "/MakeYourRecipe",
    name: "MakeYourRecipe",
    component: () => import("./pages/CreateNewRecipe")
  },
  {
    path: "/recipe/:recipeType/:recipeId",
    name: "recipe",
    component: () => import("./pages/FullRecipeViewPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
