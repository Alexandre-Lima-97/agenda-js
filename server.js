require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
        app.emit("conected");
})
.catch(e => {
        console.log(e);
});



const session = require('express-session'); //referente as sessões do cliente (Salvar cookie para manter logado)
const MongoStore = require('connect-mongo'); //Para salvar as sessões na base de dados
const flash = require('connect-flash'); //Para mensagens autodestrutivas (ao ler irão sumir da base de dados)
const routes = require('./routes');
const path = require('path');
//const helmet = require('helmet');
//app.use(helmet());
const csrf = require('csurf');
const {checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
var bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));



const sessionOptions = session({
        secret: 'a9dnrh298djc(ued#$kdio',
        store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
        resave: false,
        saveUninitialized: false,
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
        }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views') );
app.set('view engine', 'ejs');

app.use(csrf());

app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

app.on('conected', () => {
        app.listen(3000, () => {
                console.log("Executando o servidor");
                console.log("http://localhost:3000");
        });
});
