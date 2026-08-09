import RNToast from "react-native-toast-message";

const toast = {
  success: (message: string) =>
    RNToast.show({ type: "success", text1: message }),
  error: (message: string) => RNToast.show({ type: "error", text1: message }),
};

export { toast };
