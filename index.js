//const Sequelize = require('sequelize');
const { Sequelize, DataTypes } = require("sequelize");
var db = require('./db');  // this is using leveldb for the moment

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

// Initialize a Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite" // Path to SQLite database file
});

// Define a model (e.g., a "User" table)
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

/*
User.sync().error(function(err) {
 console.log(err);
 });
 */

/*
// Main function to handle database operations
(async () => {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true }); // `force: true` will drop the table if it already exists
    console.log("Database synced!");

    // Populate the database with some data
    await User.create({ name: "Alice", email: "alice@example.com", age: 25 });
    await User.create({ name: "Bob", email: "bob@example.com", age: 30 });

    console.log("Users added!");

    // Query the database
    const users = await User.findAll();
    console.log("All Users:", users.map(user => user.toJSON()));

    // Query specific data
    const user = await User.findOne({ where: { email: "alice@example.com" } });
    console.log("Found User:", user.toJSON());
  } catch (error) {
    console.error("Error interacting with the database:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log("Database connection closed.");
  }
  })();
*/

sequelize
    .sync({force : true})
    .catch(error => {
	console.error(`Error interacting with the database ${error}.`);
    })
    .finally(() => {
	sequelize
	    .close()
	    .then(() => console.log("Database connection closed."))
	    .catch(err => console.error(`Error closing database conn: ${error}.`));
    });

/*
  const { Sequelize, DataTypes } = require("sequelize");

// Initialize a Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite" // Path to SQLite database file
});

// Define a model (e.g., a "User" table)
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

// Handle database operations using promises
sequelize
  .sync({ force: true }) // `force: true` will drop the table if it already exists
  .then(() => {
    console.log("Database synced!");

    // Populate the database with some data
    return Promise.all([
      User.create({ name: "Alice", email: "alice@example.com", age: 25 }),
      User.create({ name: "Bob", email: "bob@example.com", age: 30 })
    ]);
  })
  .then(() => {
    console.log("Users added!");

    // Query all users
    return User.findAll();
  })
  .then(users => {
    console.log("All Users:", users.map(user => user.toJSON()));

    // Query a specific user by email
    return User.findOne({ where: { email: "alice@example.com" } });
  })
  .then(user => {
    console.log("Found User:", user.toJSON());
  })
  .catch(error => {
    console.error("Error interacting with the database:", error);
  })
  .finally(() => {
    // Close the database connection
    sequelize
      .close()
      .then(() => console.log("Database connection closed."))
      .catch(err => console.error("Error closing the database connection:", err));
  });
*/

console.log("Done!");

function handleError(err) {
  console.error(err);
}
