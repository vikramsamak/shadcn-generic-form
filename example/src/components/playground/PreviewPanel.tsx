import { PlaygroundState } from './types';
import { buildFormProps } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import GenericForm from '@/components/generic-form/GenericForm';

interface PreviewPanelProps {
  state: PlaygroundState;
}

export default function PreviewPanel({ state }: PreviewPanelProps) {
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
      <div className="p-4 border-b shrink-0">
        <h2 className="text-lg font-semibold">Preview</h2>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full">
          <GenericForm {...finalProps} />
        </ScrollArea>
      </div>
    </div>
  );
}
