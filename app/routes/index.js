var express = require('express');
var router = express.Router();
const connection = require("../bdd");

/* GET home page. */
router.get('/', function(req, res, next) { //affiche la page d'accueil
  if (req.session.userId) res.redirect("/myprofile");
  else res.render('./index');
});

router.get('/signup', function(req, res, next) { //affiche vers la page d'inscription
  if (req.session.userId) res.redirect("/myprofile");
  else res.render('./signup');
});

router.get('/login', function(req, res, next) { //affiche vers la page de connexion
  if (req.session.userId) res.redirect("/myprofile");
  else res.render('./login');
});
module.exports = router;
