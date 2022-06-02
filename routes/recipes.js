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

router.get('/details/:id', (req, res) => {
  
})

module.exports = router

