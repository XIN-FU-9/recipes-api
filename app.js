//Part 1: Build the Full CRUD API
const express = require("express");
const app = express();


let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

//Set up Express, express.json(), and app.listen on port 8080 at the end.
app.use(express.json());

//return all recipes.
app.get("/api/recipes", (req, res) => res.json(recipes))

// return one recipe, or 404 if no id matches.
app.get("/api/recipes/:id", (req, res) => {
    const id = Number(req.params.id)
    const recipe = recipes.find((recipe) => {
        return recipe.id ===id
    })

    if(!recipe){
        return res.status(404)
    }else{
        return res.json(recipe)
    }
})

//create a recipe from req.body, assign it nextId, 
// add it to the array, respond 201 with the new recipe.
app.post("/api/recipes", (req, res) => {
    
    const {
        title,
        cuisine,
        minutes,
        servings,
        vegetarian,
    } = req.body

    const newRecipe = {
        id: nextId, // need to use : sign, should not use = sign.
        title,
        cuisine,
        minutes,
        servings,
        vegetarian,
    }

    nextId++;
    recipes.push(newRecipe)
    res.status(201).json(newRecipe)
})

//update only the fields sent in req.body, 404 if not found.
app.patch("/api/recipes/:id", (req, res) =>{
    const id2 = Number(req.params.id)
    const recipe = recipes.find((recipe) => recipe.id === id2)

    if(!recipe){
        res.sendStatus(404)
    }else{
        Object.assign(recipe, req.body)
        // return res.sendStatus(204). 
        res.status(204).send(recipe)
    }
})

//remove the recipe, 404 if not found, respond 204.
app.delete("/api/recipes/:id", (req,res) => {
    const recipeID = Number(req.params.id)
    const recipeLocate = recipes.findIndex((recipe) =>
        recipe.id === recipeID)
    
    if(!recipeLocate) {
        return res.status(404).send("The recipe is not found!")
    }

    recipes.splice(recipeLocate, 1);
    res.sendStatus(204)
})



//This is the part of the firt step for set up. need code this at the end.
app.listen(8080,() => console.log ("It is a working page."))