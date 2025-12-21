import { buildFormProps } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlaygroundStore } from './store';
import GenericForm from '@/components/generic-form/GenericForm';

export default function PreviewPanel() {
  const state = usePlaygroundStore();
  const formProps = buildFormProps(state);

  // Intercept onSubmit to show values in console
  const originalOnSubmit = formProps.actions.onSubmit;
  const onSubmitHandler = (values: any) => {
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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 flex items-center h-14 bg-background/50">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Preview
        </h2>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full">
          <GenericForm {...finalProps} />
        </ScrollArea>
      </div>
    </div>
  );
}
