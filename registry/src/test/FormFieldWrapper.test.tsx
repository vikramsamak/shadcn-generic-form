import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import FormFieldWrapper from '../generic-form/FormFieldWrapper';
import { Form } from '@/components/ui/form';
import { FormFieldConfig } from '@/types';

describe('FormFieldWrapper', () => {
  const TestComponent = ({ formField }: { formField: FormFieldConfig<any> }) => {
    const form = useForm({ defaultValues: { name: '' } });
    return (
      <Form {...form}>
        <FormFieldWrapper formField={formField} control={form.control} />
      </Form>
    );
  };

  it('should render the field with a label', () => {
    const formField = {
      name: 'name',
      label: 'Name',
      render: () => <input />,
    };
    render(<TestComponent formField={formField} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('should render the description', () => {
    const formField = {
      name: 'name',
      label: 'Name',
      description: 'This is a description',
      render: () => <input />,
    };
    render(<TestComponent formField={formField} />);

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('should apply full width by default', () => {
    const formField = {
      name: 'name',
      label: 'Name',
      render: () => <input />,
    };
    const { container } = render(<TestComponent formField={formField} />);

    expect(container.firstChild).toHaveClass('w-full');
  });

  it('should apply half width', () => {
    const formField = {
      name: 'name',
      label: 'Name',
      width: 'half',
      render: () => <input />,
    };
    const { container } = render(<TestComponent formField={formField} />);

    expect(container.firstChild).toHaveClass('w-1/2');
  });

  it('should call the render prop with the field object', () => {
    const renderField = vi.fn(() => <input />);
    const formField = {
      name: 'name',
      label: 'Name',
      render: renderField,
    };
    render(<TestComponent formField={formField} />);

    expect(renderField).toHaveBeenCalledWith(expect.objectContaining({ name: 'name' }));
  });
});
