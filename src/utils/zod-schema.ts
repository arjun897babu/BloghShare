import { z } from "zod";
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
    confirm_password: passwordSchema,
  })
  .merge(loginSchema)
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
