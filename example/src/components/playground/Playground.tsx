import ConfigPanel from './ConfigPanel';
import FieldEditor from './FieldEditor';
import PreviewPanel from './PreviewPanel';
import { usePlayground } from './usePlayground';
import { Github } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';

export default function Playground() {
  const {
    state,
    updateLayoutSettings,
    updateFormSettings,
    updateActions,
    addField,
    updateField,
    removeField,
  } = usePlayground();

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-2xl font-bold">Generic Form Playground</h1>
        <div className="flex items-center gap-4">
          <a href="https://github.com/vikramsamak/generic-form" target="_blank">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="w-full lg:w-1/4 lg:min-w-[300px] h-1/3 lg:h-full border-r border-b lg:border-b-0 overflow-hidden">
            <ConfigPanel
              layoutSettings={state.layoutSettings}
              formSettings={state.formSettings}
              actions={state.actions}
              onUpdateLayout={updateLayoutSettings}
              onUpdateForm={updateFormSettings}
              onUpdateActions={updateActions}
            />
          </div>
          <div className="w-full lg:w-1/4 lg:min-w-[300px] h-1/3 lg:h-full border-r border-b lg:border-b-0 overflow-hidden">
            <FieldEditor
              fields={state.fields}
              onAddField={addField}
              onUpdateField={updateField}
              onRemoveField={removeField}
            />
          </div>
          <div className="flex-1 h-1/3 lg:h-full overflow-hidden">
            <PreviewPanel state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}
