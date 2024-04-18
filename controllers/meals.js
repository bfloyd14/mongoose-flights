import { Meal } from "../models/meal.js"

function newMeal(req, res){
  Meal.find({})
  .then(meals=>{
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    })
  })   
}

function create(req, res){
  //create a meal by using Meal model
  Meal.create(req.body)
  .then(meals =>{
    res.redirect('/meals/new')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/meals')
  })
}

function createMeal(req, res){
  Meal.findById(req.params.mealId)
  .then(flights =>{
    flight.meals.push(req.body)

  })
}

export{
  newMeal as new,
  create,
}