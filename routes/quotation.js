const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const csrf = require('csurf');
 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var csrfProtection = csrf({ cookie: true});

router.get('/', csrfProtection, (req, res) => {
	res.render('quotation', {page: "quotation", csrfToken: req.csrfToken()});
});

router.post('/request', bodyParser.json(), urlencodedParser, csrfProtection, (req, res) => {
	console.log(req.body.a);
	res.send("something");
});

module.exports = router;