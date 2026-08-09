import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import type { ViewProps } from "react-native";
import { cn } from "@/shared/lib";

interface ScreenProps extends ViewProps {
  edges?: Edge[];
}

const Screen = ({
  className,
  edges = ["top", "bottom"],
  children,
  ...props
}: ScreenProps) => {
  return (
    <SafeAreaView
      edges={edges}
      className={cn("flex-1 bg-background", className)}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export { Screen };
