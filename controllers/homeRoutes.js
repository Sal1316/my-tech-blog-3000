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
router.get("/blogs/:id", withAuth, async (req, res) => {
  try {
    const individualBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          attributes: ["title", "body", "name", "createdAt"],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }
    const blog = individualBlogData.get({ plain: true });
    res.render("blogs", {
      gallery,
      loggedIn: req.session.loggedIn,
      blog,
    });
  } catch (err) {
    console.log(err);
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

/*

// GET one gallery
router.get('/gallery/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbGalleryData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Painting,
            attributes: [
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const gallery = dbGalleryData.get({ plain: true });
      res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


*/
