// class note
const express = require('express')
const miniRouter  = express.Router()

// this part 5 moved from the app.js
let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;
// end part 5


//routers
miniRouter.get("/", (req, res, next) =>{
res.json(recipes);
})

function validationPost(req, res, next){
    const title = req.body.title
    const cuisine = req.body.cuisine
    if(title && cuisine){
        next()
    }else{
        console.log("handled after middleware ran")
        res.sendStatus(400)
         // stop next steps. only show error messages 404
                            // res.status(404) website can continues . 
    }
//   res.send("handled after middleware ran");
};

// step 1: delete the /api for each router, since we have it in the app.js file 
// this line already:app.use('/api', recipeRouter)

// step2: delete the/recipes for each routers, since we have these lines in the index.js
//const reviewRouter  = require('/recipes');
// const recipeRouter = require('/recipes');

miniRouter.get("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const recipe = recipes.find((recipe) => recipe.id ===id )
         if(!recipe){
            res.sendStatus(404) // if not found then use return terminate the code
         }
          res.json(recipe)
          throw Error  ('not find the recipes error.')
            } catch(err){
                console.log('caught in the catch!! --- pass the error')
        next(err);
    }
})

miniRouter.post("/", validationPost,(req, res, next) => {
   try{
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

        }catch(err){
            next(err)
        }
    
})

miniRouter.patch("/:id", (req, res, next) =>{
    try{
        const id2 = Number(req.params.id)
        const recipe = recipes.find((recipe) => recipe.id === id2)

            if(!recipe){
                res.sendStatus(404)
            }else{
                Object.assign(recipe, req.body)
                // return res.sendStatus(204). 
                res.json(recipe)
            }
    }catch(err){
        next(err)
        }
})

miniRouter.delete("/:id", (req,res, next) => {
    try{
        const recipeID = Number(req.params.id)
        const recipeLocate = recipes.findIndex((recipe) =>
        recipe.id === recipeID)
    
        if(recipeLocate === -1) {
        return res.status(404).send("The recipe is not found!")
        }

        recipes.splice(recipeLocate, 1);
        res.sendStatus(204)
    } catch (err){
        next(err)
    }
})


module.exports = miniRouter