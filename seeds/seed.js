const sequelize = require("../config/connection");
const { Blog, Review, User } = require("../models");

const blogData = require("./blogData.json");
const reviewData = require("./reviewData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  // await Review.bulkCreate(reviewData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();

/* TO DO:



*/
