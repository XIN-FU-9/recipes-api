// calss note:

const express = require("express");
const miniRouter  = express.Router()



const recipesRouter = require('./recipes');
const reviewRouter  = require('./reviews');

miniRouter.use('/recipes', recipesRouter)
miniRouter.use('/review',reviewRouter )

module.exports = miniRouter

//'.api/recipes/'
// note ends