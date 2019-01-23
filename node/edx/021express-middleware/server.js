const express = require('express') 
const app = express() 

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

app.get('/', (req, res) => {
  res.send('hello world!')
})

//Adding middleware inline 
app.get('/accounts', (req, res, next) => {
	console.log('middleware for accounts only')
next()}
,(req, res) => {
  res.send('hello accounts!')
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
	res.status(500).send('internal error, sorry!')
})

app.listen(3000)