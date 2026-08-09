import { Pressable } from "react-native";
import { Settings } from "lucide-react-native";

interface ServerSettingsTriggerProps {
  onPress: () => void;
}

const ServerSettingsTrigger = ({ onPress }: ServerSettingsTriggerProps) => (
  <Pressable onPress={onPress} hitSlop={8} className="size-9 items-center justify-center">
    <Settings size={18} color="rgba(0,0,0,0.38)" />
  </Pressable>
);

export { ServerSettingsTrigger };
