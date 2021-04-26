//Import Modules
const express = require('express')
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const linksRouter = require('./controller/routes/routes')
const path = require('path');
// const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash')
// require('./controller/config/auth')(passport)


// Configurações
// Sessão
app.use(session({
  secret: 'teste_hvex',
  resave: true,
  saveUninitialized: true
}))
// app.use(passport.initialize())
// app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')

  next();
})





// Set handlebars template engine
  app.engine('handlebars', handlebars({
    defaultLayout: 'main'
  }))
  app.set('view engine', 'handlebars')


//config Body Parser to get datas of form method POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Public (static files)
app.use(express.static(path.join(__dirname, "public")))


//Rotas
app.use(linksRouter)


const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})