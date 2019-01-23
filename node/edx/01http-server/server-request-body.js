const http = require('http')
const port = 3000
http.createServer((request, response) => {
  console.log("headers: ", request.headers)
  console.log("method: " + request.method)
  console.log("statusCode: ",request.statusCode)
  console.log("url :", request.url)
  if (request.method == 'POST') {
    let buff = ''
    request.on('data', function (chunk) {
      buff += chunk  
    })
    request.on('end', function () {
      console.log(`Body: ${buff}`)
	  response.writeHead(404, {
    'Content-Length': '\nAccepted body\n\n'.length,
    'Content-Type': 'text/plain' })
	  response.statusCode = 200
      response.end('\nAccepted body\n\n')
    })
  } else {
    response.writeHead(200, {'Content-Length': 'Hello World\n'.length, 'Content-Type': 'text/plain'})
    response.end('Hello World\n')
  } 
}).listen(port)

console.log(`Server running at http://localhost:${port}/
You can try post: curl -X POST -d "my payload" http://localhost:${port}/
and curl http://localhost:${port}/`)

