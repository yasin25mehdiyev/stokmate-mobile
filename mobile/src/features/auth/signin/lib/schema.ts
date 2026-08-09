import { z } from "zod";
import type { TFunction } from "i18next";

const createSigninSchema = (t: TFunction<"auth">) =>
  z.object({
    email: z.string().min(1, t("validation.emailRequired")).email(t("validation.emailInvalid")),
    password: z.string().min(6, t("validation.passwordMin")),
  });

type SigninFormValues = z.infer<ReturnType<typeof createSigninSchema>>;

const defaultValues: SigninFormValues =  { 
  email: "", 
  password: "",
};

export { createSigninSchema, type SigninFormValues, defaultValues };
