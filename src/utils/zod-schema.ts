import { string, z } from "zod";
import { errorMessage, invalidMessage } from "./validator-helper";

const passwordSchema = z
  .string()
  .nonempty(errorMessage("password"))
  .regex(/[A-Z]/, `at least one ${errorMessage("upper case")}`)
  .regex(/[a-z]/, `at least one ${errorMessage("smaller case")}`)
  .regex(/[\d]/, `at least one ${errorMessage("number")}`)
  .regex(
    /[-/~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
    `at least one ${errorMessage("special character")}`
  )
  .regex(/^.{6,20}$/, `Password must be between 6 and 20 characters`);

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty(errorMessage("email"))
    .regex(
      /^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/,
      invalidMessage("email")
    ),
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty(errorMessage("name"))
      .regex(/^.{3,25}$/, "min 3-25 character needed")
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, invalidMessage("name")),
  })
  .merge(loginSchema);

export const blogSchema = z.object({
  content: z.string(),
  title: z.string(),
  file: z.union([
    z.object({
      publicId: z.string(),
      url: z
        .string()
        .regex(/^https:\/\/res\.cloudinary\.com\/.*\.(jpeg|png|gif|webp)$/i, {
          message: "invalid image url",
        }),
    }),
    z.instanceof(File).refine(
      (file) => {
        
        if (!(file instanceof File)) {
          return false;
        }

        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!validImageTypes.includes(file.type)) {
          return false;
        }

        return true;
      },
      {
        message: "invalid image,Must be an image (jpeg, png, gif, webp)",
      }
    ),
  ]),
});
