// Importation des packages
const multer = require('multer');

// Déclaration des formats autorisés
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
};

// Déclaration de storage qui permet de sauvegarder les images
// en leur indiquant la destination, et en changeant le nom
// de l'image ainsi que l'extension
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
    const DateNow = Date.now()
		callback(null, name + DateNow + '.' + extension);
	},
});

module.exports = multer({storage}).single('image');