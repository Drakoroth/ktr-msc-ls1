const express = require("express");
const router = express.Router();
const connection = require("../bdd");
const isemail = require("isemail");

router.post("/", function(req,res){
  if(req.session.userId){
    let post = {
      id_user: req.session.userId,
      last_n: req.body.last_n,
      first_n: req.body.first_n,
      mail: req.body.mail,
      enterprise: req.body.enterprise,
      tel: req.body.tel
    };
    if(req.body.mail == undefined || req.body.mail == ""){
      res.redirect("/create_bcard");
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
            if((req.body.tel == undefined || req.body.tel == "") || (req.body.tel.length == 10 && (/^\d+$/.test(req.body.tel) == true))){
              let post = {
                id_user: req.session.userId,
                last_n: req.body.last_n,
                first_n: req.body.first_n,
                mail: req.body.mail,
                enterprise: req.body.enterprise,
                tel: req.body.tel
              };
              connection.query("INSERT INTO other_cards SET ?", post, function (err, res) {
                if (err) throw err;
              });
              res.redirect("/myprofile");
          } else {
            console.log("Format du numéro de téléphone incorrect");
            res.redirect("/create_bcard");
          }
        } else {
          console.log("Format du mail incorrect.");
          res.redirect("/create_bcard");
        }
      } else {
        console.log("Mail déjà utilisé.");
        res.redirect("/create_bcard");
      }
    });
  }
  }
});

module.exports = router;
