const mysql = require("mysql"); //se connecter à la base de données

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bcm",
  port: "3306",
});

connection.connect(function (error) {
  if (!!error) console.log("Erreur connexion bdd !!");
  else console.log("Connexion à la bdd réussie !!");
});

module.exports = connection;
