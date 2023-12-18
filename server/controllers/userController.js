const User = require('../models/user');

exports.userCreateGet = async (req, res, next) => {
	try {
		res.json({
			message: 'NOT IMPLEMENTED: USER CREATE GET',
		});
	} catch (err) {
		return next(err);
	}
};
