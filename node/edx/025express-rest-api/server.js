 const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

let store = {}
store.accounts = []

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/accounts', (req, res) => {
  res.status(200).send(store.accounts)
})

//post curl  http://localhost:3000/accounts -H "Content-Type: application/json" -X POST -d "{ \"balance\": 199, \"name\":\"checking\" }"
app.post('/accounts', (req, res) => {
  let newAccount = req.body
  let id = store.accounts.length
  store.accounts.push(newAccount)
  console.log(store.accounts)
  res.status(201).send({id: id})
})

app.put('/accounts/:id', (req, res) => {
  store.accounts[req.params.id] = req.body
  res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
  store.accounts.splice(req.params.id, 1)
  res.status(204).send()
})

app.listen(3000)