var express = require('express');
var router = express.Router();
const connection = require("../bdd");

router.post("/", function (req, res) { //si connecté affiche sur le profil de l'utilisateur sélectionné sinon redirection à l'accueil
  if (req.session.userId) {
      connection.query("SELECT * FROM users WHERE id = ?", req.body.id_other_user, function (err, result) {
        if (err) throw(err);
        else {
          res.render("./showprofile", { result: result });
        }
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
