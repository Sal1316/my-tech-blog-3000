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
  // Logs that a POST request was received
  console.log(
    "POST ENDPOINT: ",
    `${req.method} request received to add a review`
  );
  console.log("BLOG REQUEST ENDPOINT!!!!!");
  Blog.create(req.body)
    .then((reviewData) => res.json(reviewData))
    .catch((err) => res.json(err));
});

router.post("/comments", (req, res) => {
  // Logs that a POST request was received
  console.log(
    "POST ENDPOINT: ",
    `${req.method} request received to add a review`
  );
  console.log("BLOG REQUEST ENDPOINT!!!!!");
  Comment.create(req.body)
    .then((reviewData) => res.json(reviewData))
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
