const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        name: userData.name,
        email: userData.email,
        id: userData.id,
      };

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/blogs", (req, res) => {
  console.log("🏀 req.body from BLOGs POST:", req.body);
  console.log("USER ID from Blogs: ", req.session.user.id);

  Blog.create({ ...req.body, user_id: req.session.user.id })
    .then((reviewData) => res.json(reviewData))
    .catch((err) => res.json(err));
});

router.post("/comments", (req, res) => {
  console.log("USER NAME from Comment: ", req.session.user.name);
  console.log("USER ID from Comment: ", req.session.user.id);
  // Logs that a POST request was received

  Comment.create({
    ...req.body, // should be brought in from blog.handlebars script.
    user_name: req.session.user.name, // cannot be null
    user_id: req.session.user.id, // cannot be null
  })
    .then((reviewData) => {
      res.json(reviewData);
    })
    .catch((err) => res.json(err));
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        name: userData.name,
        email: userData.email,
        id: userData.id,
      };

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
