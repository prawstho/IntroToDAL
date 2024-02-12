const express = require("express");
const app = express();

const { getActors, getActorById } = require('./services/actors.dal')

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
    console.log("root route.")
    response.send("the route for the sites root /.")
})

app.get("/about", (request, response) => {
  console.log("/about route was accessed.")
  response.send("the /about route.")
})

app.get("/page", (request, response) => {
  console.log("rendered a web page at route /page.")
  response.render('page');
})

app.get("/darth", (request, response) => {
  console.log("rendered a web page at route /darth.")
  // call database to get data
  response.render('darth', {name: 'Luke Skywalker'});
})

app.get("/actors/:id", async (request, response) => {
  console.log("/actors/:id route was accessed.")
  // response.send(`The id is ${request.params.id}`)
  let theActor = await getActorById(request.params.id); // fetch actor from postgresql
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(theActor));
  response.end()
})

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});