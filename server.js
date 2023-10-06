const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');


const SequelizeStore = require('connect-session-sequelize')(session.Store); 

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    expires: 24 * 60 * 60 * 1000, // logged in for 24 hr.
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

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

