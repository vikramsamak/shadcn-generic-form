import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConfigPanel from './ConfigPanel';
import FieldEditor from './FieldEditor';
import PreviewPanel from './PreviewPanel';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { Github } from 'lucide-react';

export default function Playground() {
  return (
    <div className="h-screen w-full flex flex-col bg-background">
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
          <div className="w-1/4 min-w-[300px] h-full overflow-hidden">
            <ConfigPanel />
          </div>
          <div className="w-1/4 min-w-[350px] h-full overflow-hidden">
            <FieldEditor />
          </div>
          <div className="flex-1 h-full overflow-hidden bg-muted/5">
            <PreviewPanel />
          </div>
        </div>

        {/* Mobile Layout (Default, hidden on lg) */}
        <div className="lg:hidden h-full flex flex-col">
          <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <div className="border-b bg-background px-4">
              <TabsList className="h-12 w-full justify-start bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="config"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 text-xs font-bold uppercase tracking-wider"
                >
                  Config
                </TabsTrigger>
                <TabsTrigger
                  value="fields"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 text-xs font-bold uppercase tracking-wider"
                >
                  Fields
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 text-xs font-bold uppercase tracking-wider"
                >
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              <TabsContent value="config" className="h-full m-0 p-0">
                <ConfigPanel />
              </TabsContent>
              <TabsContent value="fields" className="h-full m-0 p-0">
                <FieldEditor />
              </TabsContent>
              <TabsContent
                value="preview"
                className="h-full m-0 p-0 bg-muted/5"
              >
                <PreviewPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
