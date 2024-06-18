import { create } from "zustand";

type AlertModalData = {
  onConfirm: () => void;
  message: string;
};

type AlertModalState = {
  isOpen: boolean;
  data: AlertModalData;
  onClose: () => void;
  onOpen: (data: AlertModalData) => void;
};

export const useAlertModal = create<AlertModalState>((set) => ({
  isOpen: false,
  data: { onConfirm: () => {}, message: "" },
  onOpen: ({ onConfirm, message }) =>
    set({ isOpen: true, data: { onConfirm, message } }),
  onClose: () =>
    set({ isOpen: false, data: { onConfirm: () => {}, message: "" } }),
}));
