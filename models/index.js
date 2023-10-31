const Blog = require("./Blog");
const Comment = require("./Comment");
const Review = require("./Review");
const User = require("./User");

// foriegn key is defined in the TARGET model Blog.
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// foriegn key is defined in the SOURCE model Blog.
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// foriegn key is defined in the SOURCE model Comment.
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Blog, Comment, Review, User };
