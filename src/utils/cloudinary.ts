import { CustomError } from "./custom-error";
import { v2 } from "../config/cloudinary-config";

export const uploadImge = async (filePath: string, folder: string) => {
  return v2.uploader
    .upload(filePath, { folder })
    .then((result) => {
      console.table(result);
      return result.secure_url;
    })
    .catch((error) => {
      console.error("Error Cloudinary:", error);
      throw new CustomError(
        500,
        "image upload failed please try again",
        "uploadError"
      );
    });
};
