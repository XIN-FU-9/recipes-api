//Part 1: Build the Full CRUD API
const express = require("express");
const app = express();
const PORT = 8080;

let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

app.use(express.json()) // why move to to above app.use(myMiddleware), cz we need req.body, this allowed express.json() excess first.

//Part 2 Register A middleware
// example:
function myMiddleware(req, res, next){
    console.log(`This is a request for middleware,${req.method} , ${req.originalUrl}`)
    next();
}
app.use(myMiddleware)
//end par2



//Part 3: "Route-Specific" Middleware — Validation
//fist try:
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
//end part3


//Part 1--part of
//Set up Express, express.json(), and app.listen on port 8080 at the end.
// app.use(express.json()); this should move to the top of the app.use(myMiddleware)

//return all recipes.----------------------------this changed to part 4.4
// app.get("/api/recipes", (req, res) => res.json(recipes))

//part4.3 wrap logic in a try/catch block
app.get("/api/recipes", (req, res, next) =>{
     res.json(recipes);
})
// end of part 4.3

// return one recipe, or 404 if no id matches. ----------all block changed to part 4.3
// app.get("/api/recipes/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const recipe = recipes.find((recipe) => {
//         return recipe.id ===id
//     })

//     if(!recipe){
//         return res.status(404)
//     }else{
//         return res.json(recipe)
//     }
// })
// keep going next part 1:

//part 4.4/ part of ( wrap the logic in the try and catch block.)
// app.get("/api/recipes/:id", (req, res, next) => {
//     try {
//         const id = Number(req.params.id)
//         const recipe = recipes.find((recipe) => {
//         return recipe.id ===id
//     })

//     if(!recipe){
//         return res.status(404)
//     }else{
//         return res.json(recipe)
//     }} catch(error){
//         next(error)

//     }
// })

app.get("/api/recipes/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const recipe = recipes.find((recipe) => recipe.id ===id )
         if(!recipe){
            return res.sendStatus(404) // if not found then use return terminate the code
         }
            return res.json(recipe)
            } catch(err){
        next(err);
    }
})
//end of the part of the part 4.4

//keep going on part 1:
//create a recipe from req.body, assign it nextId, -----------------this changed to part 4.5
// add it to the array, respond 201 with the new recipe.
// app.post("/api/recipes", validationPost,(req, res) => {
    
//     const {
//         title,
//         cuisine,
//         minutes,
//         servings,
//         vegetarian,
//     } = req.body

//     const newRecipe = {
//         id: nextId, // need to use : sign, should not use = sign.
//         title,
//         cuisine,
//         minutes,
//         servings,
//         vegetarian,
//     }

//     nextId++;
//     recipes.push(newRecipe)
//     res.status(201).json(newRecipe)
// })

//part 4.5 wrap logic in a try/catch block
app.post("/api/recipes", validationPost,(req, res, next) => {
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
// end of part 4.5

//update only the fields sent in req.body, 404 if not found.----------this changed to part 4.6
// app.patch("/api/recipes/:id", (req, res) =>{
//     const id2 = Number(req.params.id)
//     const recipe = recipes.find((recipe) => recipe.id === id2)

//     if(!recipe){
//         res.sendStatus(404)
//     }else{
//         Object.assign(recipe, req.body)
//         // return res.sendStatus(204). 
//         res.status(204).send(recipe)
//     }
// })
// part 4.6 wrap logic in a try/catch block
app.patch("/api/recipes/:id", (req, res, next) =>{
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
// end of part 4.6


//remove the recipe, 404 if not found, respond 204.-------     ------changed to part 4.7
// app.delete("/api/recipes/:id", (req,res) => {
//     const recipeID = Number(req.params.id)
//     const recipeLocate = recipes.findIndex((recipe) =>
//         recipe.id === recipeID)
    
//     if(!recipeLocate) {
//         return res.status(404).send("The recipe is not found!")
//     }

//     recipes.splice(recipeLocate, 1);
//     res.sendStatus(204)
// })

// end part 1

// part 4.7 wrap logic in a try/catch block
app.delete("/api/recipes/:id", (req,res, next) => {
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
// end of part 4.7

// Part 4.1-4.7: Centralized Error Handling
// 4.1:this need to add above the app.listen and after all routes so it's the fallback for all errors.
function errorHandler(err, req, res, next) { // we need to test out all the router's throw, just make sure if it works.


    // wrap five recipe routes logic in the try/catch block:
    // "/api/recipes" // 1:the first route
    // "/api/recipes/:id" //2:return one recipe
    // "/api/recipes" //3: create the recipe
    // "/api/recipes/:id"// 4:update only one filed
    // "/api/recipes/:id"// 5:remove the recipe


  console.error(">>>>>>>>", err.message);
  res.sendStatus(500); 
}
// end part 4.1

// 4.2:register the error handler
app.use(errorHandler) 
// end the part 4.2

//This is the part of the firt step for set up. need code this at the end.
app.listen(PORT, () => {
    console.log('It is a working page.')
})
// app.listen(8080,() => console.log ("It is a working page."))