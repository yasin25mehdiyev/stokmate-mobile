import { View } from "react-native";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { cn } from "@/shared/lib";

interface UserAvatarProps {
  imageUrl?: string | null;
  size?: number;
  className?: string;
}

const UserAvatar = ({ imageUrl, size = 36, className }: UserAvatarProps) => {
  return (
    <View
      className={cn("items-center justify-center overflow-hidden rounded-full bg-wash", className)}
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: size, height: size }}
          contentFit="cover"
        />
      ) : (
        <User size={size * 0.55} color="rgba(0,0,0,0.6)" />
      )}
    </View>
  );
};

export { UserAvatar };
