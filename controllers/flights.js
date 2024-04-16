import {Flight} from '../models/flight.js'

function index(req, res){
  Flight.find({})
  .then(flights =>{
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights',
      time: req.time
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
    })
}

function newFlight(req, res){
  res.render('flights/new',{
    title: 'Add Flight'
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

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
}