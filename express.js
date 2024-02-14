const express = require("express");
const app = express();

const { getActors, getActorById } = require('./services/actors.dal')
const { getFilmById, getAllFilmsForAllActors } = require('./services/films.dal')

const PORT =  3000;

global.DEBUG = true;

// Create Read Update Delete (CRUD)
// app.post   //CREATE html
// app.get    //READ html
// app.put    //UPDATE
// app.patch  //UPDATE 
// app.delete //DELETE

app.set('view engine', 'ejs');

app.get("/", (request, response) => {
  if(DEBUG) console.log("root route.")
    response.send("the route for the sites root /.")
})

app.get("/about", (request, response) => {
  if(DEBUG) console.log("/about route was accessed.")
  response.send("the /about route.")
})

app.get("/actors", async (request, response) => {
  if(DEBUG) console.log("/actors route was accessed.")
  let theActors = await getActors(); // fetch actors from postgresql
  response.write(JSON.stringify(theActors));
  response.end();
})

app.get("/actors/:id", async (request, response) => {
  if(DEBUG) console.log("/actors/:id route was accessed.")
  // response.send(`The id is ${request.params.id}`)
  let anActor = await getActorById(request.params.id); // fetch actor from postgresql
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(anActor));
  response.end()
})

app.get("/films", async (request, response) => {
  if(DEBUG) console.log("/films route was accessed.")
  let theFilms = await getAllFilmsForAllActors();
  response.write(JSON.stringify(theFilms));
  response.end();
})

app.get("/films/:id", async (request, response) => {
  if(DEBUG) console.log("/films/:id route was accessed.")
  if(DEBUG) console.log(`The id is ${request.params.id}`)
  let aFilm = await getFilmById(request.params.id); // fetch film from postgresql
  response.write(JSON.stringify(aFilm));
  response.end()
})

app.use((request, response) => {
  if(DEBUG) console.log('404 - route not found.');
  response.status(404).write('404 - route not found.');
  response.end();
}) 

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});