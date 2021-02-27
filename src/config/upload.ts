import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

//local de armazenamento de imagens
const uploadFolder = path.resolve(__dirname, '..', '..', '/uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
