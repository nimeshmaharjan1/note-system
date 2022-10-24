import { toast } from "react-toastify";

export enum ToastType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

export const toastInstance = (message: string, type: ToastType) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  } as Object;
  type === ToastType.ERROR
    ? toast.success(message, options)
    : type === ToastType.INFO
    ? toast.info(message, options)
    : toast.success(message, options);
};
