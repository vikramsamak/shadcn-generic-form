import { LayoutSettings, FormSettings, FormActionsSettings } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConfigPanelProps {
  layoutSettings: LayoutSettings;
  formSettings: FormSettings;
  actions: FormActionsSettings;
  onUpdateLayout: (settings: Partial<LayoutSettings>) => void;
  onUpdateForm: (settings: Partial<FormSettings>) => void;
  onUpdateActions: (settings: Partial<FormActionsSettings>) => void;
}

export default function ConfigPanel({
  layoutSettings,
  formSettings,
  actions,
  onUpdateLayout,
  onUpdateForm,
  onUpdateActions,
}: ConfigPanelProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b shrink-0 flex items-center h-14 bg-background/50">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Configuration
        </h2>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Layout Settings */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                Layout
              </h3>

              <div className="space-y-2">
                <Label>Type</Label>
                <RadioGroup
                  value={layoutSettings.layout}
                  onValueChange={(val) =>
                    onUpdateLayout({ layout: val as 'grid' | 'flex' })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grid" id="layout-grid" />
                    <Label htmlFor="layout-grid">Grid</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flex" id="layout-flex" />
                    <Label htmlFor="layout-flex">Flex</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Columns (Grid only)</Label>
                  <span className="text-xs text-muted-foreground">
                    {layoutSettings.columns}
                  </span>
                </div>
                <Slider
                  value={[layoutSettings.columns]}
                  min={1}
                  max={4}
                  step={1}
                  onValueChange={(val) => onUpdateLayout({ columns: val[0] })}
                  disabled={layoutSettings.layout !== 'grid'}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Gap</Label>
                  <span className="text-xs text-muted-foreground">
                    {layoutSettings.gap}
                  </span>
                </div>
                <Slider
                  value={[layoutSettings.gap]}
                  min={0}
                  max={16}
                  step={2}
                  onValueChange={(val) => onUpdateLayout({ gap: val[0] })}
                />
              </div>
            </div>

            {/* Form Settings */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                Form
              </h3>

              <div className="space-y-2">
                <Label>Validation Mode</Label>
                <Select
                  value={formSettings.mode}
                  onValueChange={(val) =>
                    onUpdateForm({
                      mode: val as FormSettings['mode'],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onChange">onChange</SelectItem>
                    <SelectItem value="onBlur">onBlur</SelectItem>
                    <SelectItem value="onSubmit">onSubmit</SelectItem>
                    <SelectItem value="onTouched">onTouched</SelectItem>
                    <SelectItem value="all">all</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="disabled-form">Disabled</Label>
                <Switch
                  id="disabled-form"
                  checked={formSettings.disabled}
                  onCheckedChange={(checked) =>
                    onUpdateForm({ disabled: checked })
                  }
                />
              </div>
            </div>

            {/* Actions Settings */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                Actions
              </h3>

              <div className="space-y-2">
                <Label>Submit Button Text</Label>
                <Input
                  value={actions.submitButtonText}
                  onChange={(e) =>
                    onUpdateActions({ submitButtonText: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Cancel Button Text</Label>
                <Input
                  value={actions.cancelButtonText}
                  onChange={(e) =>
                    onUpdateActions({ cancelButtonText: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-cancel">Show Cancel Button</Label>
                <Switch
                  id="show-cancel"
                  checked={actions.showCancel}
                  onCheckedChange={(checked) =>
                    onUpdateActions({ showCancel: checked })
                  }
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
