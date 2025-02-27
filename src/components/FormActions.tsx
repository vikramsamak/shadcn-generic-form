import { FormActionsProps } from "@/types";
import { JSX } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function FormActions({
  disabled,
  submitButtonText,
  cancelButtonText,
  onCancel,
  cancelBtnClassName,
  submitBtnClassName,
}: FormActionsProps): JSX.Element {
  const submitButtonWidth = cancelButtonText && onCancel ? "w-1/2" : "w-full";

  return (
    <div className="flex gap-4 mt-4">
      <Button
        type="submit"
        disabled={disabled}
        className={cn(submitButtonWidth, submitBtnClassName)}
      >
        {submitButtonText}
      </Button>
      {cancelButtonText && onCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className={cn("w-1/2", cancelBtnClassName)}
        >
          {cancelButtonText}
        </Button>
      )}
    </div>
  );
}

export default FormActions;
