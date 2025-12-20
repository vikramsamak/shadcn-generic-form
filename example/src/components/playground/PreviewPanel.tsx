/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlaygroundState } from './types';
import GenericForm from '@/components/generic-form/GenericForm';
import { buildFormProps } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeBlock from '@/components/CodeBlock';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
    state: PlaygroundState;
}

export default function PreviewPanel({ state }: PreviewPanelProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'logs'>('preview');
    const [submittedValues, setSubmittedValues] = useState<any>(null);

    const formProps = buildFormProps(state);

    // Intercept onSubmit to show values in log
    const originalOnSubmit = formProps.actions.onSubmit;
    const onSubmitHandler = (values: any) => {
        console.log("Form Submitted", values);
        setSubmittedValues(values);
        if (originalOnSubmit) originalOnSubmit(values);
        setActiveTab('logs');
    };

    const finalProps = {
        ...formProps,
        actions: {
            ...formProps.actions,
            onSubmit: onSubmitHandler,
        }
    };

    const codeString = `
import { GenericForm } from 'shadcn-generic-form';
// ... import UI components

const formConfig = {
  formFields: ${JSON.stringify(state.fields.map(f => ({ name: f.name, label: f.label, type: f.type, required: f.required })), null, 2)},
  // Note: render functions need to be implemented manually as shown in the example
};

export default function MyForm() {
  return (
    <GenericForm
      formConfig={...}
      formSettings={${JSON.stringify(state.formSettings, null, 2)}}
      layoutSettings={${JSON.stringify(state.layoutSettings, null, 2)}}
      actions={${JSON.stringify(state.actions, null, 2)}}
    />
  )
}
  `.trim();

    return (
        <div className="flex flex-col h-full bg-gray-50/50">
            <div className="p-4 border-b bg-background flex items-center justify-between">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="flex p-1 bg-muted rounded-md space-x-1">
                    {(['preview', 'code', 'logs'] as const).map((tab) => (
                        <Button
                            key={tab}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-8 px-3 text-xs capitalize",
                                activeTab === tab && "bg-background shadow-sm hover:bg-background"
                            )}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="bg-background border shadow-sm h-full flex flex-col overflow-hidden">
                    {activeTab === 'preview' && (
                        <ScrollArea className="h-full">
                            <div className="p-6 max-w-2xl mx-auto">
                                <GenericForm {...finalProps} />
                            </div>
                        </ScrollArea>
                    )}

                    {activeTab === 'code' && (
                        <ScrollArea className="h-full">
                            <div className="p-4">
                                <CodeBlock code={codeString} lang="tsx" />
                            </div>
                        </ScrollArea>
                    )}

                    {activeTab === 'logs' && (
                        <ScrollArea className="h-full bg-black text-white font-mono p-4 text-sm">
                            {submittedValues ? (
                                <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
                            ) : (
                                <div className="text-gray-500 italic">Submit the form to see values here...</div>
                            )}
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    );
}
