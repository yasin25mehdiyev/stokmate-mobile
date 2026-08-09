import * as React from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const buttonVariants = cva(
  "group/button flex-row shrink-0 items-center justify-center rounded-full active:opacity-90",
  {
    variants: {
      variant: {
        primary: "",
        outline: "border",
        ghost: "",
      },
      color: {
        brand: "",
        negative: "",
      },
      size: {
        36: "h-9 gap-1 px-3",
        44: "h-11 gap-1.5 px-4",
        48: "h-12 gap-1.5 px-5",
        52: "h-[52px] gap-1.5 px-5",
      },
      iconOnly: {
        true: "aspect-square px-0",
        false: "",
      },
      isDisabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "primary", color: "brand", isDisabled: false, className: "bg-brand-500" },
      { variant: "primary", color: "negative", isDisabled: false, className: "bg-negative-500" },
      { variant: "outline", color: "brand", isDisabled: false, className: "border-brand-100 bg-transparent" },
      { variant: "outline", color: "negative", isDisabled: false, className: "border-negative-500 bg-transparent" },
      { variant: "ghost", color: "brand", isDisabled: false, className: "bg-transparent" },
      { variant: "ghost", color: "negative", isDisabled: false, className: "bg-transparent" },
      { variant: "primary", isDisabled: true, className: "bg-disabled" },
      { variant: "outline", isDisabled: true, className: "border-disabled-border bg-transparent" },
      { variant: "ghost", isDisabled: true, className: "bg-transparent" },
    ],
    defaultVariants: {
      variant: "primary",
      color: "brand",
      size: 44,
      iconOnly: false,
      isDisabled: false,
    },
  },
);

const buttonTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      primary: "",
      outline: "",
      ghost: "",
    },
    color: {
      brand: "",
      negative: "",
    },
    isDisabled: {
      true: "text-ink-disabled",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "primary", isDisabled: false, className: "text-white" },
    { variant: "outline", color: "brand", isDisabled: false, className: "text-brand-500" },
    { variant: "outline", color: "negative", isDisabled: false, className: "text-negative-600" },
    { variant: "ghost", color: "brand", isDisabled: false, className: "text-ink" },
    { variant: "ghost", color: "negative", isDisabled: false, className: "text-negative-600" },
  ],
  defaultVariants: {
    variant: "primary",
    color: "brand",
    isDisabled: false,
  },
});

interface ButtonProps
  extends Omit<PressableProps, "children" | "disabled">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  className,
  variant,
  color,
  size,
  iconOnly,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      className={cn(
        buttonVariants({ variant, color, size, iconOnly, isDisabled, className }),
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#ffffff" : "#225df0"}
        />
      ) : (
        <>
          {startIcon}
          {typeof children === "string" ? (
            <Text
              className={cn(buttonTextVariants({ variant, color, isDisabled }))}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {endIcon}
        </>
      )}
    </Pressable>
  );
};

export { Button, buttonVariants, buttonTextVariants };
