import { Plus, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PlaygroundField } from '../types';
import { FIELD_TYPES } from './constants';
import { FieldCard } from './FieldCard';
import { useState } from 'react';
import { usePlaygroundStore } from '../store';

export function FieldsList() {
  const { fields, selectedFieldId, showProperties, addField, selectField } =
    usePlaygroundStore();

  const [newFieldType, setNewFieldType] =
    useState<PlaygroundField['type']>('text');

  return (
    <div
      className={cn(
        'flex flex-col min-h-0 bg-background flex-1',
        showProperties && 'hidden'
      )}
    >
      <div className="p-4 border-b shrink-0 flex items-center h-14 bg-background/50">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Form Fields
        </h2>
      </div>

      <div className="p-4 border-b bg-muted/10 shrink-0">
        <div className="flex gap-2">
          <Select
            value={newFieldType}
            onValueChange={(val) =>
              setNewFieldType(val as PlaygroundField['type'])
            }
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Add field..." />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map(({ type, icon: Icon, label }) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => addField(newFieldType)}
            size="icon"
            className="h-9 w-9"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden bg-background">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2 pb-10">
            {fields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                isSelected={selectedFieldId === field.id}
                onSelect={() => selectField(field.id)}
              />
            ))}
            {fields.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <div className="p-3 rounded-full bg-muted/30 mb-3">
                  <Settings2 className="h-8 w-8 opacity-20" />
                </div>
                <p className="text-sm font-medium">No fields added yet</p>
                <p className="text-xs">Use the selector above to add fields.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
