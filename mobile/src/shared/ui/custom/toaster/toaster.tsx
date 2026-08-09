import Toast, { BaseToast, ErrorToast, type BaseToastProps } from "react-native-toast-message";

const sharedToastProps = {
  style: { borderRadius: 16 },
  contentContainerStyle: { paddingHorizontal: 12 },
  text1Style: { fontSize: 14, fontWeight: "500" as const, color: "rgba(0,0,0,0.87)" },
  text1NumberOfLines: 2,
};

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...sharedToastProps}
      style={{ ...sharedToastProps.style, borderLeftColor: "#00aa55" }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      {...sharedToastProps}
      style={{ ...sharedToastProps.style, borderLeftColor: "#eb0b0b" }}
    />
  ),
};

const Toaster = () => <Toast config={toastConfig} />;

export { Toaster };
