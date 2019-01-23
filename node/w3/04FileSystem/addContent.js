var fs = require('fs');

fs.appendFile('appendfile1.txt', 'Adding content!', function (err) {
  if (err) throw err;
  console.log('Content added!');
});