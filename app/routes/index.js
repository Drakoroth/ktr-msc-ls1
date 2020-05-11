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

router.get("/myprofile", function (req, res) { //si connecté affiche sur le profil sinon redirection à l'accueil
  if (req.session.userId) {
      connection.query("SELECT * FROM users WHERE id = ?", req.session.userId, function (err, result) {
          if (err) throw(err);
          else {
            return res.render("./profile", { result: result });
          }
        }
      );
  } else {
    res.redirect("/");
  }
});

router.get("/logout", function (req, res) { //déconnexion
  req.session.destroy(function (err) {
    if (err) throw err;
    else res.redirect("/");
  });
});

router.get("/search_bc", function(req,res){ //affiche les autres utilisateurs
  if(req.session.userId){

    connection.query("SELECT * FROM users WHERE id != ? AND (id NOT IN (SELECT id_other_user FROM library WHERE id_user = ?) OR NOT EXISTS (SELECT id_other_user FROM library WHERE id_user = ?))", [req.session.userId, req.session.userId, req.session.userId], function(err, result){
      if (err) throw (err);
      else {
        res.render("./search_bcards", {result: result});
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/bcards_book", function(req,res){ //affiche les utilisateurs déjà séléctionnés
  if(req.session.userId){
    connection.query("SELECT * FROM users WHERE id IN (SELECT id_other_user FROM library WHERE id_user = ?)", [req.session.userId], function(err, result){
      if (err) throw (err);
      else {
        res.render("./bcards_book", {result: result});
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get('/showprofile', function(req, res, next) { //affiche le profil de l'utlisateur sélectionné dans la librairie
  if (!req.session.userId) res.redirect("/");
  else res.render('./showprofile');
});

module.exports = router;
