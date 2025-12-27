const mongoose = require('mongoose')

const url = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

console.log(url)

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
    console.log(result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonenumberSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

// const PhoneNumber = mongoose.model('Phonenumber', phonenumberSchema)


phonenumberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.models.PhoneNumber || mongoose.model('PhoneNumber', phonenumberSchema)

