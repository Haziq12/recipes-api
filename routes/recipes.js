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
      details: {
        ingredients: [],
        numSteps: null
      }
    }

    
    for(let i = 0; i < allRecipes.length; i++){
      if(params == allRecipes[i].name){
        details.details.ingredients.push(...allRecipes[i].ingredients)
        details.details.numSteps = allRecipes[i].instructions.length
        res.send(details)
      } 
    }
  })
})

router.post('/', (req, res) => {
  let recipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  }
  fs.readFile('./data.json', 'utf8', (err, data) => {
    let allRecipes = JSON.parse(data)
    allRecipes.recipes.push(recipe)
    fs.writeFile('./data.json', JSON.stringify(allRecipes), (err) => {
      if (err) throw err
      res.send('New recipe added')
    })
  })
})

// router.post('/', (req, res) => {
//   let recipe = {
//     name: req.body.name,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions
//   }
//   const data = JSON.stringify(recipe)
//   fs.appendFile('./data.json', data, (err) => {
//     if (err) throw err
//     res.send('Data written to file')
//   })
// })

module.exports = router

