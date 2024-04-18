import {Flight} from '../models/flight.js'
import { Meal } from '../models/meal.js'


function index(req, res){
  Flight.find({})
  .then(flights =>{
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights',
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
    })
}

function newFlight(req, res){
  res.render('flights/new',{
    title: 'Add Flight',
    // default:{
    //   const newFlight = new Flight()
    //   const dt = newFlight.departs
    //   const departDate = dt.toIsoString().slice(0,16)
    // }
  })
}

function create(req, res){
  //remove empty properties on req.body
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  //use Flight model to create flight
  Flight.create(req.body)
    .then(movie =>{
      //redirect somewhere
      res.redirect('/flights')
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/')
      })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight =>{
    //redirect to flights index view
    res.redirect('/flights')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
    })
}

function show(req, res){
  //use Flight model to find a flight
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight =>{
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals =>{
      //render the view
      res.render('flights/show',{
        flight,
        title: 'Flight Details',
        meals,
      })
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res){
//find the flight by flight_id (req.params.flightId)
  Flight.findById(req.params.flightId)
  .then(flight =>{
    //render a view to edit
    console.log(flight)
    res.render('flights/edit',{
      flight,
      title: "Edit your Flight",

    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
    })
}

function update(req, res){
  //remove empty properties on req.body
  for (let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
    })
}

function createTicket(req, res){
  //find the flight by id
  Flight.findById(req.params.flightId)
  .then(flight =>{
    //create review by pushing into tickets array
    flight.tickets.push(req.body)
    //save the flight document
    flight.save()
    .then(() =>{
      //redirect to the show view
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
    })
}

function createMeal(req, res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.meals.push(req.body.mealId)
    flight.save()
      .then(()=>{
        res.redirect(`/flights/${flight._id}`)
      })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
    })
}


export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  createMeal,
}