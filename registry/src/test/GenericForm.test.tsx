import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import GenericForm from '../generic-form/GenericForm';
import { FormFieldConfig } from '../types/FormField.types';

describe('GenericForm', () => {
  const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    age: z.number().min(18, 'You must be at least 18'),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const formFields: FormFieldConfig<FormValues>[] = [
    { name: 'name', label: 'Name', render: (field) => <input {...field} /> },
    { name: 'email', label: 'Email', render: (field) => <input {...field} /> },
    { name: 'age', label: 'Age', render: (field) => <input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /> },
  ];

  const formConfig = {
    formFields,
    validationSchema,
    defaultValues: { name: '', email: '', age: 0 },
  };

  it('should render the form with all fields', () => {
    const actions = { onSubmit: vi.fn() };
    render(<GenericForm formConfig={formConfig} actions={actions} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should submit the form with valid data', async () => {
    const onSubmit = vi.fn();
    const actions = { onSubmit };
    render(<GenericForm formConfig={formConfig} actions={actions} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe', email: 'john.doe@example.com', age: 30 }, expect.anything());
    });
  });

  it('should show validation errors with invalid data', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();
    const actions = { onSubmit, onError };
    render(<GenericForm formConfig={formConfig} actions={actions} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await vi.waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('You must be at least 18')).toBeInTheDocument();
      expect(onError).toHaveBeenCalled();
    });
  });

  it('should handle conditional fields', async () => {
    const conditionalSchema = validationSchema.extend({
      extra: z.string().optional(),
    });

    const conditionalFormConfig = {
      ...formConfig,
      validationSchema: conditionalSchema,
      formFields: [
        ...formFields,
        {
          name: 'extra' as const,
          label: 'Extra Field',
          condition: (values: any) => values.name === 'John Doe',
          render: (field: any) => <input {...field} />
        },
      ],
    };

    const actions = { onSubmit: vi.fn() };
    const { rerender } = render(<GenericForm formConfig={conditionalFormConfig} actions={actions} />);

    expect(screen.queryByLabelText('Extra Field')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });

    rerender(<GenericForm formConfig={conditionalFormConfig} actions={actions} />);

    await vi.waitFor(() => {
      expect(screen.getByLabelText('Extra Field')).toBeInTheDocument();
    });
  });

  it('should handle form cancellation', () => {
    const onCancel = vi.fn();
    const actions = { onSubmit: vi.fn(), onCancel, cancelButtonText: 'Cancel' };
    render(<GenericForm formConfig={formConfig} actions={actions} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it('should apply grid layout', () => {
    const actions = { onSubmit: vi.fn() };
    const { container } = render(
      <GenericForm formConfig={formConfig} actions={actions} layoutSettings={{ layout: 'grid', columns: 3 }} />
    );

    expect(container.firstChild?.firstChild).toHaveClass('grid grid-cols-3');
  });

  it('should disable the form', () => {
    const actions = { onSubmit: vi.fn() };
    render(<GenericForm formConfig={formConfig} actions={actions} formSettings={{ disabled: true }} />);

    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Age')).toBeDisabled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});
