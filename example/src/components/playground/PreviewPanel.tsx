import { PlaygroundState } from './types';
import { buildFormProps } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/CodeBlock';
import GenericForm from '@/components/generic-form/GenericForm';

interface PreviewPanelProps {
  state: PlaygroundState;
}

export default function PreviewPanel({ state }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'logs'>(
    'preview'
  );
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  const formProps = buildFormProps(state);

  // Intercept onSubmit to show values in log
  const originalOnSubmit = formProps.actions.onSubmit;
  const onSubmitHandler = (values: any) => {
    console.log('Form Submitted', values);
    setSubmittedValues(values);
    if (originalOnSubmit) originalOnSubmit(values);
    setActiveTab('logs');
  };

  const finalProps = {
    ...formProps,
    actions: {
      ...formProps.actions,
      onSubmit: onSubmitHandler,
    },
  };

  const codeString = `
import { GenericForm } from 'shadcn-generic-form';
// ... import UI components

const formConfig = {
  formFields: ${JSON.stringify(
    state.fields.map((f) => ({
      name: f.name,
      label: f.label,
      type: f.type,
      required: f.required,
    })),
    null,
    2
  )},
  formSettings: ${JSON.stringify(state.formSettings, null, 2)},
  layoutSettings: ${JSON.stringify(state.layoutSettings, null, 2)},
  actions: ${JSON.stringify(state.actions, null, 2)},
};

export default function MyForm() {
  return (
    <GenericForm
      formConfig={formConfig}
      formSettings={formConfig.formSettings}
      layoutSettings={formConfig.layoutSettings}
      actions={formConfig.actions}
    />
  )
}
  `.trim();

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="flex flex-col h-full gap-0"
      >
        <div className="p-4 border-b bg-background flex items-center justify-between shrink-0">
          <h2 className="text-lg font-semibold">Preview</h2>
          <TabsList className="bg-muted">
            <TabsTrigger value="preview" className="text-xs capitalize">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs capitalize">
              Code
            </TabsTrigger>
            <TabsTrigger value="logs" className="text-xs capitalize">
              Logs
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="preview" className="h-full m-0 p-0 border-none">
            <ScrollArea className="h-full bg-background border shadow-sm">
              <div className="p-6 max-w-2xl mx-auto">
                <GenericForm {...finalProps} />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="code" className="h-full m-0 p-0 border-none">
            <ScrollArea className="h-full bg-background border shadow-sm">
              <div className="p-4">
                <CodeBlock code={codeString} lang="tsx" />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="logs" className="h-full m-0 p-0 border-none">
            <div className="bg-black text-white font-mono h-full border shadow-sm flex flex-col">
              <ScrollArea className="flex-1 p-4 text-sm">
                {submittedValues ? (
                  <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
                ) : (
                  <div className="text-gray-500 italic">
                    Submit the form to see values here...
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
