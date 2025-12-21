export interface FormActionsProps {
  disabled?: boolean;
  submitButtonText: string;
  cancelButtonText?: string;
  onCancel?: () => void;
  submitBtnClassName?: string;
  cancelBtnClassName?: string;
}
