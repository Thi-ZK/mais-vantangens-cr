const express = require('express');
const router = express.Router();
 
router.get('/', (req, res) => {
	res.render('home', {page: "home"});
});

module.exports = router;