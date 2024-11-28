const Sequelize = require('sequelize');
var db = require('./db');

console.log("Starting test");

console.log(`The type of Sequelize is: ${typeof(Sequelize)}.`);

db.put('k1', 'value 1'); 
db.put('k2', 'value 2');

db.get('k1', function(err, value) { 
  if (err) { 
    return handleError(err); 
  } 
  console.log('value:', value); 
  });

console.log("Done!");

function handleError(err) {
  console.error(err);
}
