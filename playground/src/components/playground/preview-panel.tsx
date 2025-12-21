import { buildFormProps } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlaygroundStore } from './store';
import GenericForm from '@/components/generic-form/GenericForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeView from './code-view';
import { Code, Eye } from 'lucide-react';

export default function PreviewPanel() {
  const state = usePlaygroundStore();
  const formProps = buildFormProps(state);

  // Intercept onSubmit to show values in console
  const originalOnSubmit = formProps.actions.onSubmit;
  const onSubmitHandler = (values: Record<string, unknown>) => {
    console.log('Form Submitted', values);
    if (originalOnSubmit) originalOnSubmit(values);
  };

  const finalProps = {
    ...formProps,
    actions: {
      ...formProps.actions,
      onSubmit: onSubmitHandler,
    },
  };

  return (
    <div className="flex flex-col h-full bg-muted/5">
      <Tabs
        defaultValue="preview"
        className="flex-1 flex flex-col h-full gap-0"
      >
        <div className="px-4 border-b shrink-0 flex items-center justify-between h-14 bg-background/50">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:block">
            Result
          </h2>
          <TabsList className="h-9 w-full sm:w-auto p-1 bg-muted/50">
            <TabsTrigger value="preview" className="text-xs px-3 h-7">
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs px-3 h-7">
              <Code className="w-3.5 h-3.5 mr-1.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent
            value="preview"
            className="h-full m-0 p-4 data-[state=inactive]:hidden"
          >
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto">
                <GenericForm {...finalProps} />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="code"
            className="h-full m-0 p-0 data-[state=inactive]:hidden"
          >
            <CodeView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
