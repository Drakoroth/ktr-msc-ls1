const express = require("express");
const router = express.Router();
const connection = require("../bdd");

router.post("/", function(req,res){
  if(req.session.userId){
    let post = {
      id_user: req.session.userId,
      id_other_user: req.body.id_other_user
    };
    connection.query("INSERT INTO library SET ?", post, function(err, result){
      if (err) throw (err);
      else {
        res.redirect("/search_bc");
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
