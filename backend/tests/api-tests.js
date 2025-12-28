const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const PhoneNumber = require('../models/phonenumber')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await PhoneNumber.deleteMany({})
  const newPhoneNumber = {
    name: 'testinimi',
    number:  '0202020202'
  }
  const newPhoneNumber2 = {
    name: 'testinimi2',
    number:  '0202020202'
  }

  await api
    .post('/api/persons')
    .send(newPhoneNumber)
    .expect(201)
  await api
    .post('/api/persons')
    .send(newPhoneNumber2)
    .expect(201)
})

test('Right amount of phonenumbers', async () => {
  const responseNumbers = await api
    .get('/api/persons')
    .expect(200)
  console.log(responseNumbers)
  assert.strictEqual(responseNumbers.body.length, 2)
})

test('Delete phonenumber', async () => {
  const responseNumbers = await api
    .get('/api/persons')
    .expect(200)   
  const id = responseNumbers.body[0].id
     
  await api
    .delete(`/api/persons/${id}`)

  const responseNumbers2 = await api
    .get('/api/persons')
    .expect(200)   
  
  assert.strictEqual(responseNumbers2.body.length, 1)
    
})


test('Get one phonenumber', async () => {
  const responseNumbers = await api
    .get('/api/persons')
    .expect(200)   
  const id = responseNumbers.body[0].id
     

  const responseNumbers2 = await api
    .get(`/api/persons/${id}`)
    .expect(200)   

  console.log(responseNumbers2, 'one number')
  
  assert.strictEqual(responseNumbers2.body.name, 'testinimi')
    
})



after(async () => {
  await mongoose.connection.close()
})