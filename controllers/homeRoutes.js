const router = require("express").Router();
// const withAuth = require("../utils/auth");

// I dont thing this need: withAuth, since its the first page that loads.
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log("Blogs: ", blogs);

    res.render("homepage", {
      user: req.session.user,
      logged_in: req.session.logged_in,
      blog: "Blog details",
      // blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This one requires: withAuth,
router.get("/dashboard", async (req, res) => {
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
// dont need /logout since its just wired to a button.
module.exports = router;
