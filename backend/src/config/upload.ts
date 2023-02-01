import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

export default {
  tmpFolder,
  uploadsFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${uuid()}`;

      return callback(null, fileName);
    },
  }),
};
