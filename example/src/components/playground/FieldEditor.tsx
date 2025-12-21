import { FieldsList } from './field-editor/FieldsList';
import { PropertyEditor } from './field-editor/PropertyEditor';

export default function FieldEditor() {
  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="flex-1 flex flex-col min-h-0 bg-background">
        <FieldsList />
        <PropertyEditor />
      </div>
    </div>
  );
}
