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
//sample call  curl http://localhost:3000/data?api_key=123 -i -d {\"key\":\"a\"} -H "Content-Type: application/json"
app.post('/profile', (req, res) => {
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