const { Level } = require('level')
//var level = require('level'); // looks like this was the old interface
var path = require('path'); 
 
var dbPath = process.env.DB_PATH || path.join(__dirname, 'mydb'); 
// Create a database
const db = new Level(dbPath, { valueEncoding: 'json' })
 
module.exports = db;
