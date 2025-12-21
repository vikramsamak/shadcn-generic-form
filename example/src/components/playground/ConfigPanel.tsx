import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlaygroundStore } from './store';

export default function ConfigPanel() {
  const {
    layoutSettings,
    formSettings,
    actions,
    updateLayoutSettings,
    updateFormSettings,
    updateActions,
  } = usePlaygroundStore();

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-4 border-b shrink-0 h-14 flex items-center bg-background/50">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Configuration
        </h2>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-8 pb-10">
            {/* Layout Settings */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                Layout
              </h3>
              <div className="space-y-3">
                <Label className="text-xs">Form Layout</Label>
                <RadioGroup
                  value={layoutSettings.layout}
                  onValueChange={(val: 'grid' | 'flex') =>
                    updateLayoutSettings({ layout: val })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grid" id="grid" />
                    <Label htmlFor="grid" className="font-normal text-xs">
                      Grid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flex" id="flex" />
                    <Label htmlFor="flex" className="font-normal text-xs">
                      Flex
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {layoutSettings.layout === 'grid' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Columns</Label>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {layoutSettings.columns}
                    </span>
                  </div>
                  <Slider
                    value={[layoutSettings.columns]}
                    onValueChange={([val]) =>
                      updateLayoutSettings({ columns: val })
                    }
                    min={1}
                    max={4}
                    step={1}
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">Gap (px)</Label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {layoutSettings.gap * 4}px
                  </span>
                </div>
                <Slider
                  value={[layoutSettings.gap]}
                  onValueChange={([val]) => updateLayoutSettings({ gap: val })}
                  min={0}
                  max={12}
                  step={1}
                />
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Form Settings */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                Behavior
              </h3>
              <div className="space-y-3">
                <Label className="text-xs">Validation Mode</Label>
                <Select
                  value={formSettings.mode}
                  onValueChange={(val: any) =>
                    updateFormSettings({ mode: val })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onChange">On Change</SelectItem>
                    <SelectItem value="onBlur">On Blur</SelectItem>
                    <SelectItem value="onSubmit">On Submit</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs">Disabled State</Label>
                  <p className="text-[10px] text-muted-foreground">
                    Disable entire form
                  </p>
                </div>
                <Switch
                  checked={formSettings.disabled}
                  onCheckedChange={(checked) =>
                    updateFormSettings({ disabled: checked })
                  }
                />
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Action Settings */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                Form Actions
              </h3>
              <div className="space-y-3">
                <Label className="text-xs">Submit Button Text</Label>
                <Input
                  value={actions.submitButtonText}
                  onChange={(e) =>
                    updateActions({ submitButtonText: e.target.value })
                  }
                  className="h-9"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs">Show Cancel Button</Label>
                </div>
                <Switch
                  checked={actions.showCancel}
                  onCheckedChange={(checked) =>
                    updateActions({ showCancel: checked })
                  }
                />
              </div>

              {actions.showCancel && (
                <div className="space-y-3">
                  <Label className="text-xs">Cancel Button Text</Label>
                  <Input
                    value={actions.cancelButtonText}
                    onChange={(e) =>
                      updateActions({ cancelButtonText: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
