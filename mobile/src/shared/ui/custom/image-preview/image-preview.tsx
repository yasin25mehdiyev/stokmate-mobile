import { View, type ViewProps } from "react-native";
import { Image } from "expo-image";
import { Package } from "lucide-react-native";
import { cn } from "@/shared/lib";

interface ImagePreviewProps extends ViewProps {
  src?: string | null;
}

const ImagePreview = ({ src, className, ...props }: ImagePreviewProps) => {
  return (
    <View
      className={cn(
        "items-center justify-center overflow-hidden rounded-xl border border-outline bg-wash",
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={150}
        />
      ) : (
        <Package size={24} color="rgba(0,0,0,0.25)" />
      )}
    </View>
  );
};

export { ImagePreview };
