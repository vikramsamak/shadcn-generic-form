import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConfigPanel from './ConfigPanel';
import FieldEditor from './FieldEditor';
import PreviewPanel from './PreviewPanel';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { Github } from 'lucide-react';

export default function Playground() {
  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Workspace Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 lg:px-6 bg-muted/20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-lg overflow-hidden border border-border/50">
            <img
              src="/logo.svg"
              alt="Generic Form Logo"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight leading-none">
              Form Playground
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
              v2.0
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:flex items-center px-2 py-1 rounded bg-green-500/10 text-[10px] font-bold text-green-600 uppercase tracking-tight border border-green-500/20 mr-2">
            <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse mr-1.5" />
            Live Preview
          </div>
          <a
            href="https://github.com/vikramsamak/generic-form"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Github className="h-4 w-4" />
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
            <div className="border-b bg-background">
              <TabsList className="h-12 w-full justify-start bg-transparent p-0">
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
                  Result
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
