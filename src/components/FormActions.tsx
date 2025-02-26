interface FormActionsProps {
  disabled?: boolean;
  submitButtonText: string;
  cancelButtonText?: string;
  onCancel?: () => void;
}

function FormActions({
  disabled,
  submitButtonText,
  cancelButtonText,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <button type="submit" disabled={disabled} className="btn-primary">
        {submitButtonText}
      </button>
      {cancelButtonText && onCancel && (
        <button type="button" onClick={onCancel} className="btn-secondary">
          {cancelButtonText}
        </button>
      )}
    </div>
  );
}

export default FormActions;
