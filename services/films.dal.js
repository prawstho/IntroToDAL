const dal = require("./pdb");

//get all films for all actors.
var getAllFilmsForAllActors = function() {
  if(DEBUG) console.log("films.dal.getFilms()");
  return new Promise(function(resolve, reject) {

    const sql2 = `SELECT * FROM actor_films
      ORDER BY last_name ASC LIMIT 25;`

    dal.query(sql2, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

var getFilmById = function(theFilmId) {
  if(DEBUG) console.log("films.dal.getFilmById()");
  return new Promise(function(resolve, reject) {

    const sql = `SELECT * FROM actor_films \
      WHERE film_id = $1 \
      ORDER BY last_name ASC;`

    dal.query(sql, [theFilmId], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

var addFilm = function() {
  if(DEBUG) console.log("films.dal.addFilm()");
};

module.exports = {
  getAllFilmsForAllActors,
  getFilmById,
}