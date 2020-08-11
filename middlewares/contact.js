const request = require('request');

contactFormRequestVerification = (req, res, next) => {
	let form_data = req.body;
	let email_regex = /^[a-z0-9áéíóúçâêôã]{1,22}((-|_|\.)[0-9a-záéíóúçâêôã]{2,16}){0,3}@([a-z]{2,8})(\.[a-z]{2,8}){1,3}$/;
	let message_regex = /^[A-Za-z0-9áéíóúçâêôã\-_\(\)"\.\s]{10,1500}$/;
	let name_regex = /^((([A-Za-záéíóúçâêôã]{2,20})\s?){1,3}|())$/;
	let tel_regex = /^(([0-9]{2}[0-9]{8,9})|())$/;
	let sub_regex = /^[A-Za-záéíóúçâêôã]{4,10}$/;
	const s_key = '6LcZpbAZAAAAAJCK0NtRlsdo4mjsb4dulsYqPTyV'; // use heroku var later
	const verification_url = `https://www.google.com/recaptcha/api/siteverify?secret=${s_key}&response=${form_data.gtoken}&remoteip=${req.connection.remoteAddress}`;

	if (
		!email_regex.test(form_data.email) 
		|| !name_regex.test(form_data.name)
		|| !name_regex.test(form_data.surname)
		|| !message_regex.test(form_data.message)
		|| !tel_regex.test(form_data.tel_ddd + form_data.tel_number)
		|| !sub_regex.test(form_data.subject)
	) {
		return res.send("Desculpe, ocorreu um erro de validação. Você inseriu algum campo inválido.");
	}

	request(verification_url, (err, response, body) => {
		body = JSON.parse(body);

		if (body.success) {
			next();
		}else {
			return res.send("Desculpe, mas você nao completou a verificação do captcha de forma correta.");
		}
	});

	// next();
}

module.exports = {
	formVerification: contactFormRequestVerification
};