import { NestInterceptor, Type } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as tmp from 'tmp';

export const AvatarFileInterceptor = (fileKey: string = 'file'): Type<NestInterceptor> => {
  const storage = diskStorage({
    destination: getTempDirPath(),
    filename: (req, file, cb) => {
      const fileComponents = path.parse(file.originalname);
      const filename: string = fileComponents.name.replace(/\W+/g, '') + uuidv4();
      const extension: string = fileComponents.ext;

      cb(null, `~${filename}${extension}`);
    },
  });
  return FileInterceptor(fileKey, { storage: storage, limits: { files: 1 } });
};

let tempFilderObj;
const getTempFolder = () => {
  // create once, and create lazily
  if (!tempFilderObj) {
    tempFilderObj = tmp.dirSync();
    tmp.setGracefulCleanup();
  }
  return tempFilderObj;
};

const getTempDirPath = (): string => {
  return getTempFolder().name;
};
