//Import dos modulos
const express = require('express');
const exphbs =  require('express-handlebars');

const app = express();

// Import da conexão
const conn = require('./db/conn');

// Import da Tabela
const Task = require('./models/Task')

//Import da rota
const tasksRoutes = require('./routes/tasksRoutes')

// Tamplate Engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());

// Assets
app.use(express.static('public'))
app.use('/tasks', tasksRoutes)
app.use('/', tasksRoutes)


// Conexão
conn
.sync()
.then(() =>{
    app.listen(3000)
})
.catch((err) => console.log(err))
