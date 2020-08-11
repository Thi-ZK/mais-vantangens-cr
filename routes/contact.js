const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const csrf = require('csurf');
const midds = require('../middlewares/contact.js');
const contactFormModel = require('../models/contact');
 
var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });
var csrfProtection = csrf({ cookie: true});

router.get('/', csrfProtection, (req, res) => {
	res.render('contact', {page: "contact", csrfToken: req.csrfToken()});
});

router.post('/request', bodyParser.json(), urlencodedParser, csrfProtection, midds.formVerification, (req, res) => {
	const form_submission = new contactFormModel({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		message: req.body.message,
		telephone: req.body.tel_ddd + req.body.tel_number,
		subject: req.body.subject
	});

	form_submission.save((err, newFormSubmission) => {
		if (err) {
			res.send("Ocorreu um erro interno, por favor comunique-nos do mesmo! ET-DB-1");
		}else {
			res.send("Sua mensagem foi enviada com sucesso!");
		}
	});
});

module.exports = router;