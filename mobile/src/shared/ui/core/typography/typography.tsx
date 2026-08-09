import * as React from "react";
import { Text, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const typographyVariants = cva("font-sans", {
  variants: {
    variant: {
      h1: "text-4xl leading-[44px] font-bold",
      h2: "text-3xl leading-9 font-bold",
      h3: "text-2xl leading-8 font-bold",
      h4: "text-xl leading-7 font-bold",
      h5: "text-lg leading-6 font-semibold",
      h6: "text-base leading-6 font-semibold",
      p: "text-base leading-6 font-normal",
      span: "text-sm leading-5 font-normal",
      caption: "text-xs leading-4 font-normal",
    },
    color: {
      primary: "text-ink",
      secondary: "text-ink-secondary",
      tertiary: "text-ink-tertiary",
      disabled: "text-ink-disabled",
      brand: "text-brand-500",
      "brand-bold": "text-brand-700",
      "secondary-brand": "text-secondary-brand",
      positive: "text-positive",
      warning: "text-warning",
      negative: "text-negative-600",
      success: "text-success",
      inverse: "text-white",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "primary",
  },
});

interface TypographyProps
  extends TextProps,
    VariantProps<typeof typographyVariants> {}

const Typography = ({ className, variant, color, ...props }: TypographyProps) => {
  return (
    <Text
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
