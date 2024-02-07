const dal = require("./pdb");

//get all films for all actors.
var getAllFilmsForAllActors = function() {
  if(DEBUG) console.log("films.dal.getFilms()");
  return new Promise(function(resolve, reject) {

    const sql = `SELECT * FROM actor_films
      ORDER BY last_name ASC LIMIT 25;`

    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the films.dal.getAllFilmsForAllActors() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

var getFilmById = function() {
  if(DEBUG) console.log("films.dal.getFilmById()");
};

var addFilm = function() {
  if(DEBUG) console.log("films.dal.addFilm()");
};

module.exports = {
  getAllFilmsForAllActors,
}