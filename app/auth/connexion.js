const express = require("express");
const router = express.Router();
const connection = require("../bdd");

router.post("/", (req, res) => {
  if (req.body.mail == undefined || req.body.mail == "" || req.body.mdp == undefined || req.body.mdp == "") {
    console.log("Remplir tous les champs.");
    res.redirect("/login");
  } else {
    console.log("Vérification 1");
    let func_id = function (callback) {
      connection.query("SELECT * FROM users WHERE mail = ?", req.body.mail, function (err, res) {
        if (err) throw err;
        if (res.length > 0) {
          console.log("Vérification 2");
          if (req.body.mdp === res[0].mdp) {
            if (res.length == 1) {
              console.log("Connexion réussie !");
              callback(res[0].id); //récupération de l'id en fonction du mail
            }
          } else {
            console.log("Mauvais mdp");
            callback(-2); //faux mdp
          }
        } else {
          console.log("Utilisateur non existant");
          callback(-3); //mail non existant
        }
      });
    };

    func_id(function (recup_id) {
      if (recup_id > 0) {
        let { userId } = req.session;
        req.session.userId = recup_id; //garder la session
        console.log("CONNECTÉ");
        res.redirect("/myprofile");
      } else if (recup_id == -2) {
        console.log("Erreur de mdp.");
        res.redirect("/login");
      } else if (recup_id == -3) {
        console.log("Utilisateur non existant.");
        res.redirect("/login");
      } else {
        console.log("Erreur de connexion.");
        res.redirect("/login");
      }
    });
  }
});

module.exports = router;
