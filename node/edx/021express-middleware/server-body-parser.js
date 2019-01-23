const express = require('express') 
const app = express() 
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const morgan = require('morgan');
app.use(morgan('combined'))

//declare middleware
//add content to the request for future use
const middleware = (request, response, next) => {
	
	console.log('added by declared middleware')
	request.initialization = true
  // Modify request or response
  // Execute the callback when done
  next()
}
app.use(middleware)

//Adds validation
//sample call curl http://localhost:3000/accounts?api_key=123 -i
app.use((req, res, next) => {
	if (req.query.api_key)
	{
		next()
	}
	else{
		res.status(401).send('api_key is missing');
	}
})

app.use((req, res, next) => {
	console.log(`initialize: ${req.initialization}, ${req.method} : ${req.url}`)
	next()
})

//If we post json (with proper header) it is added automatically to the request as req.body.
//sample call  curl http://localhost:3000/data?api_key=123 -i -d {\"key\":\"a\"} -H "Content-Type: application/json"
app.post('/data', (req, res) => {
	console.log(req.body)
  res.send('hello data!')
})

//Adding middleware inline 
app.get('/failing', (req, res, next) => {
	console.log('middleware throw error')
	next(new Error('something went wrong'))
	}
,(req, res) => {
  res.send('hello accounts!')
})

//Error handling
app.use((error, req, res, next) =>
{
	console.log(error)
	res.status(500).send('internal error, sorry!')
})

app.listen(3000)