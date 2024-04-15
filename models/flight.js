import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline:{
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport:{
    type: String,
    enmum: ['AUS', 'DFW', 'DEN', 'LAX']
  }
})