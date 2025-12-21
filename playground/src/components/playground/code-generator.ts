import { PlaygroundState } from './types';
import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/plugins/typescript';
import parserEstree from 'prettier/plugins/estree';

// Helper to format objects as JS code (removing quotes from keys where safe)
const formatObject = (obj: unknown, indentLevel = 0): string => {
  const json = JSON.stringify(obj, null, 2);
  // Remove quotes from keys that are valid identifiers
  let formatted = json.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, '$1:');

  if (indentLevel > 0) {
    const indent = ' '.repeat(indentLevel);
    formatted = formatted
      .split('\n')
      .map((line, index) => {
        if (index === 0) return line;
        return indent + line;
      })
      .join('\n');
  }
  return formatted;
};

export async function generateFormCode(
  state: PlaygroundState
): Promise<string> {
  const { fields, formSettings, actions, layoutSettings } = state;

  // 1. Build Default Values
  const defaultValues = fields.reduce(
    (acc, field) => {
      if (field.type === 'checkbox' || field.type === 'switch') {
        acc[field.name] = false;
      } else if (field.type === 'slider') {
        acc[field.name] = [50];
      } else if (field.type === 'datePicker') {
        acc[field.name] = '___DATE___';
      } else {
        acc[field.name] = '';
      }
      return acc;
    },
    {} as Record<string, unknown>
  );

  const defaultValuesStr = formatObject(defaultValues, 2).replace(
    /"___DATE___"/g,
    'new Date()'
  );

  // 2. Build Validation Schema
  const schemaLines = fields.map((field) => {
    let zodType = 'z.string()';
    const validations: string[] = [];

    switch (field.type) {
      case 'checkbox':
      case 'switch':
        zodType = 'z.boolean()';
        if (field.required)
          validations.push('.refine(val => val === true, "Required")');
        break;
      case 'slider':
        zodType = 'z.array(z.number())';
        break;
      case 'datePicker':
        zodType = 'z.date()';
        break;
    }

    if (field.required && !validations.length) {
      validations.push(`.min(1, "${field.label} is required")`);
    } else if (
      !field.required &&
      field.type !== 'checkbox' &&
      field.type !== 'switch' &&
      field.type !== 'slider'
    ) {
      validations.push('.optional()');
    }

    return `    ${field.name}: ${zodType}${validations.join('')},`;
  });

  // 3. Build Form Fields Config
  const formFields = fields.map((field) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = field;
    return rest;
  });

  const formFieldsStr = formatObject(formFields, 2);

  // Indent actions content
  const actionsStr = `{\n    submitButtonText: '${actions.submitButtonText}',\n    showCancel: ${actions.showCancel},\n    cancelButtonText: '${actions.cancelButtonText}',\n    onSubmit: (values) => console.log(values),\n  }`;

  const rawCode = `import { z } from 'zod';
import { GenericForm } from '@/components/generic-form';

// 1. Define Schema
const formSchema = z.object({
${schemaLines.join('\n')}
});

export default function GeneratedForm() {
  // 2. Define Default Values
  const defaultValues = ${defaultValuesStr};

  // 3. Define Form Fields
  const formFields = ${formFieldsStr};

  // 4. Return Form Component
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-card">
      <GenericForm
        formConfig={{
          formFields,
          validationSchema: formSchema,
          defaultValues,
        }}
        formSettings={{
          mode: '${formSettings.mode}',
          disabled: ${formSettings.disabled},
        }}
        layoutSettings={${formatObject(layoutSettings, 8).trim()}}
        actions={${actionsStr}}
      />
    </div>
  );
}
`;

  try {
    return await prettier.format(rawCode, {
      parser: 'typescript',
      plugins: [parserTypescript, parserEstree],
      singleQuote: true,
      trailingComma: 'es5',
      tabWidth: 2,
      semi: true,
      printWidth: 80,
    });
  } catch (error) {
    console.error('Prettier formatting failed:', error);
    return rawCode;
  }
}
