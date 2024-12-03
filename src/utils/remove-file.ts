import { unlink } from "fs";

export const removeFile = (filePath: string) => {
  if (filePath) {
    unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
