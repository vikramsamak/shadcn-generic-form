import ConfigPanel from './ConfigPanel';
import FieldEditor from './FieldEditor';
import PreviewPanel from './PreviewPanel';
import { usePlayground } from './usePlayground';
import { Github, Settings, FileJson, Eye } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function Playground() {
  const {
    state,
    updateLayoutSettings,
    updateFormSettings,
    updateActions,
    addField,
    updateField,
    removeField,
    duplicateField,
  } = usePlayground();

  const configContent = (
    <ConfigPanel
      layoutSettings={state.layoutSettings}
      formSettings={state.formSettings}
      actions={state.actions}
      onUpdateLayout={updateLayoutSettings}
      onUpdateForm={updateFormSettings}
      onUpdateActions={updateActions}
    />
  );

  const editorContent = (
    <FieldEditor
      fields={state.fields}
      onAddField={addField}
      onUpdateField={updateField}
      onRemoveField={removeField}
      onDuplicateField={duplicateField}
    />
  );

  const previewContent = <PreviewPanel state={state} />;

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between shrink-0 h-16">
        <h1 className="text-xl lg:text-2xl font-bold truncate">
          Generic Form Playground
        </h1>
        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href="https://github.com/vikramsamak/generic-form"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex h-full">
          <div className="w-[30%] h-full border-r overflow-hidden">
            {configContent}
          </div>
          <div className="w-[30%] h-full border-r overflow-hidden">
            {editorContent}
          </div>
          <div className="flex-1 h-full overflow-hidden">{previewContent}</div>
        </div>

        {/* Mobile Layout (Default, hidden on lg) */}
        <div className="lg:hidden h-full flex flex-col">
          <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-hidden">
              <TabsContent value="config" className="h-full m-0 outline-none">
                {configContent}
              </TabsContent>
              <TabsContent value="fields" className="h-full m-0 outline-none">
                {editorContent}
              </TabsContent>
              <TabsContent
                value="preview"
                className="h-full m-0 outline-none p-0"
              >
                {previewContent}
              </TabsContent>
            </div>

            <div className="p-2 border-t bg-background shrink-0">
              <TabsList className="grid w-full grid-cols-3 h-12">
                <TabsTrigger value="config" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-xs">Config</span>
                </TabsTrigger>

                <TabsTrigger value="fields" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  <span className="text-xs">Fields</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-xs">Preview</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
