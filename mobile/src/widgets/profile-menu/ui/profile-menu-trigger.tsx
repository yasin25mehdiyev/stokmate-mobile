import { Pressable } from "react-native";
import { useGetCurrentUser } from "@/entities/profile";
import { UserAvatar } from "@/shared/ui/custom/user-avatar";

interface ProfileMenuTriggerProps {
  onPress: () => void;
}

const ProfileMenuTrigger = ({ onPress }: ProfileMenuTriggerProps) => {
  const { response: user } = useGetCurrentUser();

  return (
    <Pressable onPress={onPress} hitSlop={8} className="mr-1">
      <UserAvatar imageUrl={user?.imageUrl} size={32} />
    </Pressable>
  );
};

export { ProfileMenuTrigger };
