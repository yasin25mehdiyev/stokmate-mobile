import { View } from "react-native";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/core/button";
import { Form, FormInput } from "@/shared/ui/custom/form";
import { useSignin } from "./lib/use-signin";
import {
  createSigninSchema,
  SigninFormValues,
  defaultValues,
} from "./lib/schema";

const SigninForm = () => {
  const { t } = useTranslation("auth");

  const signinSchema = createSigninSchema(t);
  const { handleSignin, isPending } = useSignin();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((values) => handleSignin(values));

  return (
    <Form {...form}>
      <View className="gap-5">
        <FormInput
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          startIcon={<Mail size={20} color="rgba(0,0,0,0.38)" />}
        />

        <FormInput
          name="password"
          label={t("password")}
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
          startIcon={<Lock size={20} color="rgba(0,0,0,0.38)" />}
        />
      </View>

      <Button
        onPress={onSubmit}
        loading={isPending}
        disabled={isPending}
        endIcon={
          !isPending ? <ArrowRight size={18} color="#ffffff" /> : undefined
        }
        className="mt-8"
      >
        {t("submit")}
      </Button>
    </Form>
  );
};

export { SigninForm };
