require('dotenv').config()
const express = require('express')
const app = express()
const PhoneNumber = require('./models/phonenumber')


//muutoksia



const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }



  next(error)

}


app.use(express.json())
var morgan = require('morgan')
app.use(morgan('tiny'))



app.get('/api/persons', (request, response) => {
  PhoneNumber.find({}).then((numbers) => {
    response.json(numbers)
  })

})


app.get('/api/info', (request, response) => {

  const time = new Date()

  PhoneNumber.find({}).then((numbers) => {
    response.send(`<p>Phonebook has info for ${numbers.length} people</p><p>${time}</p>`)
  })
}
)

app.get('/api/persons/:id', (request, response, next) => {

  const id = request.params.id
  PhoneNumber.findById(id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  PhoneNumber.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end()
      console.log(result)
    })
    .catch((error) => next(error))




})

app.post('/api/persons', (request, response, next) => {
  const random_id = Math.floor(Math.random() * 1000)
  const body = request.body
  console.log(body)




  /*   if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name missing or number missing'
    })
  }*/



  const number = new PhoneNumber({
    name: body.name,
    number: body.number,
    id: random_id
  })



  number.save().then(result => {
    console.log('added', body.name, 'number', body.number, 'to phonebook')
    response.status(201).json(result)

  })
    .catch(error => next(error))
}
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app



