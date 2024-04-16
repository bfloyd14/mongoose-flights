import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline:{
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport:{
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
    },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    default: function(){
      let newDate = new Date()
      let adjustedDate = newDate.setFullYear(new Date().getFullYear() + 1)
      return adjustedDate 
    }
  } 
})
