const express = require("express");
const app = express();

const myEmitter = require('./logEvents');

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
  try {
    let theActors = await getActors(); // fetch actors from postgresql
    myEmitter.emit('event', request.url, 'SUCCESS', 'Results fetched from database.');
    response.write(JSON.stringify(theActors));
    response.end();
  } catch {
    if(DEBUG) console.log("Error fetching actors data.")
    myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
    response.status(500).send('500 - Server error with data fetching.');
  }
})

app.get("/actors/:id", async (request, response) => {
  if(DEBUG) console.log(`/actors/:id route was accessed using id: ${request.params.id}.`)
  try {
    let anActor = await getActorById(request.params.id); // fetch actor from postgresql
    myEmitter.emit('event', request.url, 'SUCCESS', 'Result fetched from db for actor_id: ' + request.params.id + '.'); 
    response.write(JSON.stringify(anActor));
    response.end()
  } catch {
    if(DEBUG) console.log("Error fetching actor data.")
    myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
    response.status(500).send('500 - Server error with data fetching.');
  }
})

app.get("/films", async (request, response) => {
  if(DEBUG) console.log("/films route was accessed.")
  try {
    let theFilms = await getAllFilmsForAllActors();
    myEmitter.emit('event', request.url, 'SUCCESS', 'Results fetched from database.');
    response.write(JSON.stringify(theFilms));
    response.end();
  } catch {
    if(DEBUG) console.log("Error fetching films data.")
    myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
    response.status(500).send('500 - Server error with data fetching.');
  }
})

app.get("/films/:id", async (request, response) => {
  if(DEBUG) console.log(`/films/:id route was accessed using id: ${request.params.id}.`)
  try {
    let aFilm = await getFilmById(request.params.id); // fetch film from postgresql
    myEmitter.emit('event', request.url, 'SUCCESS', 'Result fetched from db for film_id: ' + request.params.id + '.');
    response.write(JSON.stringify(aFilm));
    response.end()
  } catch { 
    if(DEBUG) console.log("Error fetching film data.")
    myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
    response.status(500).send('500 - Server error with data fetching.');
  }
})

app.use((request, response) => {
  if(DEBUG) console.log('404 - route not found.');
  myEmitter.emit('event', request.url, 'ERROR', '404 - route not found.');
  response.status(404).write('404 - route not found.');
  response.end();
}) 

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});