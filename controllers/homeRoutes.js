const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    res.render('homepage', {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

