import multer from "multer";
import path from "path";

const tempDir = path.resolve("tmp");

const multerConfig = {
  storage: multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
      console.log("req:", req.body);
      cb(null, file.originalname);
    },
  }),
};
export const upload = multer(multerConfig);
