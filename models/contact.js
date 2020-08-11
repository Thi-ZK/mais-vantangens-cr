const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
	name: {type: String, required: false},
	surname: {type:String, require: false},
	email: {type: String, require: true},
	message: {type: String, require: true},
	telephone: {type: String, require: false},
	subject: {type: String, require: true}
});

module.exports = mongoose.model('contactForm', contactFormSchema);