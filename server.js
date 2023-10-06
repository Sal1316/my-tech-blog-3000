const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store); // package and creates a new store constructor function SequelizeStore by passing session.Store to it.

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {
    expires: 24 * 60 * 60 * 1000, // logged in for 24 hr.
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    // where the SequelizeStore is instantiated. It tells the session middleware to use Sequelize to store session data in your database using the Sequelize instance sequelize that you've created.
    db: sequelize,
  }),
};

// Adds express-session middleware to Express.js applications using the 'sess' configuration object you defined earlier
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  let message = '\n🔥 Now listening';

  if (PORT === 3001) {
    message += ` App in now listening on: http://localhost:${PORT} 🔥\n`;
  }

  app.listen(PORT, () => console.log(message));
});

/* Notes:

*/

