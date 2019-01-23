const express = require('express') 
const app = express() 
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('dev'))

let profile = {
	username: 'sergio',
	email: 'sergio@bek.com',
	url: 'http://aka.ms'
}

app.get('/profile', (req, res) => {
  res.send(profile)
})

//If we post json (with proper header) it is added automatically to the request as req.body.
//sample call  curl http://localhost:3000/data?api_key=123 -i -d {\"key\":\"a\"} -H "Content-Type: application/json"
app.post('/profile', (req, res) => {
	profile = req.body
	console.log('created', profile)
	res.sendStatus(201)
})

app.put('/profile', (req, res) => {
	Object.assign(profile, req.body)
	console.log('updated', profile)
	res.sendStatus(204)
})


app.delete('/profile', (req, res) => {
	profile = {}
	console.log('deleted', profile)
	res.sendStatus(204)
})


//Error handling
app.use((error, req, res, next) =>
{
	console.log(error)
	res.status(500).send('internal error, sorry!')
})

app.listen(3000)