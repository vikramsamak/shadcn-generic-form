import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormActions from '../generic-form/FormActions';

describe('FormActions', () => {
  it('should render only the submit button by default', () => {
    render(<FormActions submitButtonText="Submit" />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  it('should render both submit and cancel buttons', () => {
    render(<FormActions submitButtonText="Submit" cancelButtonText="Cancel" onCancel={() => {}} />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<FormActions submitButtonText="Submit" cancelButtonText="Cancel" onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalled();
  });

  it('should disable both buttons', () => {
    render(
      <FormActions
        submitButtonText="Submit"
        cancelButtonText="Cancel"
        onCancel={() => {}}
        disabled={true}
      />
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
  });

  it('should apply custom class names', () => {
    render(
      <FormActions
        submitButtonText="Submit"
        cancelButtonText="Cancel"
        onCancel={() => {}}
        submitBtnClassName="custom-submit"
        cancelBtnClassName="custom-cancel"
      />
    );

    expect(screen.getByRole('button', { name: /submit/i })).toHaveClass('custom-submit');
    expect(screen.getByRole('button', { name: /cancel/i })).toHaveClass('custom-cancel');
  });
});
