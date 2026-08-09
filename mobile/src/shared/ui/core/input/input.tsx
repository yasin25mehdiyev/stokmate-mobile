import * as React from "react";
import { View, TextInput, Text, Pressable, type TextInputProps } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const inputBoxVariants = cva(
  "h-12 flex-row items-center gap-2 rounded-2xl border border-outline bg-transparent px-3",
  {
    variants: {
      status: {
        error: "border-negative-600 bg-input-active",
        success: "border-success bg-input-active",
        none: "",
      },
    },
    defaultVariants: {
      status: "none",
    },
  },
);

interface InputProps
  extends TextInputProps,
    VariantProps<typeof inputBoxVariants> {
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputClassName?: string;
}

const Input = ({
  className,
  inputClassName,
  label,
  status,
  helperText,
  startIcon,
  endIcon,
  secureTextEntry,
  editable = true,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const isPassword = !!secureTextEntry;

  return (
    <View className={cn("flex-col gap-1.5", className)}>
      {label && <Text className="text-sm font-medium text-ink">{label}</Text>}
      <View
        className={cn(
          inputBoxVariants({ status }),
          !editable && "bg-disabled",
          className,
        )}
      >
        {startIcon}
        <TextInput
          editable={editable}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="rgba(0,0,0,0.25)"
          className={cn("flex-1 py-0 text-sm text-ink", inputClassName)}
          {...props}
        />
        {isPassword ? (
          <Pressable
            onPress={() => setShowPassword((value) => !value)}
            hitSlop={8}
          >
            {showPassword ? (
              <EyeOff size={20} color="rgba(0,0,0,0.38)" />
            ) : (
              <Eye size={20} color="rgba(0,0,0,0.38)" />
            )}
          </Pressable>
        ) : (
          endIcon
        )}
      </View>
      {helperText && (
        <Text
          className={cn(
            "text-xs",
            status === "error" ? "text-negative-600" : "text-ink-secondary",
          )}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export { Input, inputBoxVariants };
