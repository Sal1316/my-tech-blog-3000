const router = require("express").Router();
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
// const withAuth = require("../utils/auth");

// withAuth,
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

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

// withAuth,
router.get("/blog/:id", async (req, res) => {
  try {
    const individualBlogData = await Blog.findByPk(req.params.id);
    const blog = individualBlogData.get({ plain: true });
    const commentData = await Comment.findAll({
      where: { user_id: req.params.id },
    });
    console.log("CommentData", commentData);
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log("Comments", comments);

    res.render("blog", {
      logged_In: req.session.logged_In,
      blog,
      comments: comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// withAuth,
router.get("/dashboard", async (req, res) => {
  const usersBlog = await Blog.findAll({
    where: {
      user_id: 1, // should return atleast 2 plus the one we created.
    },
  });
  if (!usersBlog || usersBlog.length === 0) {
    res
      .status(404)
      .json({ message: "Blog post not found, or you have not Blogs" });
    return;
  }
  const usersBlogs = usersBlog.map((blog) => blog.get({ plain: true }));

  const blogComment = await Comment.findAll();
  if (!blogComment || blogComment.length === 0) {
    res
      .status(404)
      .json({ message: "Blog post not found, or you have not Blogs" });
    return;
  }
  const blogComments = blogComment.map((comment) =>
    comment.get({ plain: true })
  );

  try {
    res.render("dashboardPage", {
      user: req.session.user,
      id: req.session.id,
      logged_in: req.session.logged_in,
      usersBlogs: usersBlogs,
      blogComments: blogComments,
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
