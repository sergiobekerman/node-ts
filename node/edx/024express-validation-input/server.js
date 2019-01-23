const express = require('express') 
const app = express() 
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('dev'))

let profile = [{
	username: 'sergio',
	email: 'sergio@bek.com',
	url: 'http://aka.ms'
}]

app.get('/profile', (req, res) => {
	if (req.query.id){
		return res.send(profile[req.query.id])
	}
  res.send('id is missing')
})

//If we post json (with proper header) it is added automatically to the request as req.body.
//sample call   curl http://localhost:3000/profile -i -H "Content-Type: application/json" -X POST -d {\"username\":\"aa\"}

//we could use express-validator package
app.post('/profile', (req, res) => {
	if (!req.body.username || !req.body.email){
		return res.send(400, { error: 'Please enter your email and password.' })
	}
	profile.push(req.body)
	console.log('created', profile)
	res.sendStatus(201)
})

app.put('/profile/:id', (req, res) => {
	Object.assign(profile[req.param.id], req.body)
	console.log('updated', profile[req.param.id])
	res.sendStatus(204)
})


app.delete('/profile/:id', (req, res) => {
	profile.splice(req.param.id, 1)
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