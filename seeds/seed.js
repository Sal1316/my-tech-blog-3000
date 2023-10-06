const sequelize = require("../config/connection");
const { User, Blog } = require("../models");
// const { Review } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
// const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Blog.bulkCreate(blogData); // no hooks

  // await User.bulkCreate(reviewData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();

/* TO DO:
- Missing sessions table data.




*/
