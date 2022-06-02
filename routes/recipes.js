const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET recipe name
router.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      let allRecipes = JSON.parse(data)
      allRecipes = allRecipes.recipes
      let recipeNames = {
        recipeNames: []
      }
      for(let i = 0; i < allRecipes.length; i++){
        recipeNames.recipeNames.push(allRecipes[i].name)
      }
      res.send(recipeNames)
    })
})

// GET recipe details
router.get('/details/:id', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    let allRecipes = JSON.parse(data)
    allRecipes = allRecipes.recipes
    const params = req.params.id
    let details = {
      ingredients: [],
      numSteps: null
    }
    for(let i = 0; i < allRecipes.length; i++){
      if(params == allRecipes[i].name){
        details.ingredients.push(allRecipes[i].ingredients)
        details.numSteps = allRecipes[i].instructions.length
      }
    }
    res.send(details)
  })
})

module.exports = router

