var express = require('express');
var routes=require('./routes');
var app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
app.get('/todos', routes.todos);
app.post('/todos', routes.submit);
app.get('/todos/removecompleted', routes.removecompleted);
app.get('/todos/removeall', routes.removeall);
app.get('/todos/sorted', routes.sorted);
app.get('/todos/sortednumbers', routes.sortednumbers);
app.get('/todos/:id', routes.select);
app.post('/todos/:id', routes.change);

// process... so heroku can choose port
app.listen(process.env.PORT || 3850);
