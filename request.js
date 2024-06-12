var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/books',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: '\'{"title":"The Great Gatsby","author":"F. Scott Fitzgerald"}\''

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});