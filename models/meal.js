import mongoose from "mongoose"

const Schema = mongoose.Schema

const MealSchema = new Schema ({
  name: String
})

const Meal = mongoose.model('Meal', MealSchema)

export {
  Meal
}
