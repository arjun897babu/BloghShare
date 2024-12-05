import { CustomError } from "./custom-error";
import { v2 as cloudinary } from "../config/cloudinary-config";

type UploadImageReturn = {
  publicId: string;
  url: string;
};

export class CloudinaryService {
  async uploadImage(
    filePath: string,
    folder: string
  ): Promise<UploadImageReturn> {
    try {
      const result = await cloudinary.uploader.upload(filePath, { folder });
      console.table(result);
      return { publicId: result.public_id, url: result.secure_url };
    } catch (error) {
      console.error("Error Cloudinary:", error);
      throw new CustomError(
        500,
        "Image upload failed, please try again.",
        "uploadError"
      );
    }
  }

  async deleteImage(publicId: string): Promise<any> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Delete result:", result); 
      return result;
    } catch (error) {
      console.error("Error Cloudinary:", error);
      throw new CustomError(
        500,
        "Image deletion failed, please try again.",
        "deleteError"
      );
    }
  }
}
