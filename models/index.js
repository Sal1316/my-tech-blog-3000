const User = require("./User");
const Blog = require("./Blog");

// foregn key is defined in the TARGET model Blog.
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// foriegn key is defined in the SOURCE model Blog.
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Blog };
