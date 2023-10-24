const router = require("express").Router();
const Blog = require("../models/Blog");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log("Blogs: ", blogs);

    res.render("homepage", {
      user: req.session.user,
      logged_in: req.session.logged_in,
      blog: "Blog details",
      blogs: blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    res.render("dashboardPage", {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      text: "SIgn UP now",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// dont need /logout since its just wired to a button.
module.exports = router;
