import { Meal } from "../models/meal.js"

function newMeal(req, res){
  res.render('meals/new', {
    title: 'Add Meals'
  })
}


export{
  newMeal as new
}