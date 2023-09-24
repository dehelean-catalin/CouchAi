import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "/../uploads/"));
	},
	filename: function (req, file, cb) {
		cb(null, randomUUID() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: multerStorage });

export default upload;
