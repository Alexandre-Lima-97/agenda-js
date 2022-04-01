const express = require('express');
const router = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

router.get('/', homeController.index);

//Rotas de login
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);
router.get('/contato/index', contatoController.index);

module.exports = router;