const express = require("express");
const router = express.Router();
const connection = require("../bdd");
//const bcrypt = require("bcrypt");
const isemail = require("isemail");
const path = require("path");


router.post("/", (req, res) => {
  console.log(req.body.last_n);
  console.log(req.body.first_n);
  console.log(req.body.mail);
  console.log(req.body.mdp);
  console.log(req.body.enterprise);
  console.log(req.body.tel);
  if (req.body.last_n == undefined || req.body.last_n == "" || req.body.first_n == undefined || req.body.first_n == "" || req.body.mail == undefined || req.body.mail == "" || req.body.mdp == undefined || req.body.mdp == ""){ //|| req.body.enterprise == undefined || req.body.enterprise == "" || req.body.tel == undefined || req.body.tel == ""){
    res.redirect("/signup");
  } else {
    let func_mail = function (callback) { //unicité du mail
      connection.query("SELECT * FROM users WHERE mail = ?", req.body.mail, function (err, res) {
        if (err) throw err;
        if (res.length == 0) callback(0); //mail inexistant dans la bdd
        else callback(-1);
      });
    };

    func_mail(function (m) {
      if (m == 0) {
        if (isemail.validate(req.body.mail)) {
          if (req.body.mdp.length >= 8) {
            if((req.body.tel == undefined || req.body.tel == "") || (req.body.tel.length == 10 && (/^\d+$/.test(req.body.tel) == true))){
              let post = {
                last_n: req.body.last_n,
                first_n: req.body.first_n,
                mail: req.body.mail,
                //mdp: bcrypt.hashSync(req.body.mdp, 10),
                mdp: req.body.mdp,
                enterprise: req.body.enterprise,
                tel: req.body.tel
              };
              connection.query("INSERT INTO users SET ?", post, function (err, res) {
                if (err) throw err;
              });
              res.redirect("/login");
            } else {
              console.log("Format du numéro de téléphone incorrect");
              res.redirect("/signup");
            }
          } else {
            console.log("Au moins 8 caractères pour le mdp.");
            res.redirect("/signup");
          }
        } else {
          console.log("Format du mail incorrect.");
          res.redirect("/signup");
        }
      } else {
        console.log("Mail déjà utilisé.");
        res.redirect("/signup");
      }
    });
  }
});

module.exports = router;
