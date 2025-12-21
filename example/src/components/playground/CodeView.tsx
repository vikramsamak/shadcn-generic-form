import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlaygroundStore } from './store';
import { generateFormCode } from './code-generator';
import { useState, useEffect } from 'react';

export default function CodeView() {
  const state = usePlaygroundStore();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    const generate = async () => {
      // Small delay to allow render cycle to complete and avoid strict mode warnings
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (mounted) setIsLoading(true);

      try {
        const generated = await generateFormCode(state);
        if (mounted) {
          setCode(generated);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Generation failed:', error);
        if (mounted) setIsLoading(false);
      }
    };

    generate();

    return () => {
      mounted = false;
    };
  }, [state]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative h-full flex flex-col bg-[#1e1e1e] group overflow-hidden">
      <div className="absolute top-4 right-4 z-10 transition-opacity opacity-0 group-hover:opacity-100">
        <Button
          onClick={handleCopy}
          size="sm"
          variant="outline"
          className="h-8 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-100 border-zinc-600 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1.5 text-green-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1.5" />
              Copy Code
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="h-full w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[300px] text-muted-foreground/50">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Formatting...
          </div>
        ) : (
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.8rem',
              lineHeight: '1.5',
              background: 'transparent',
            }}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </ScrollArea>
    </div>
  );
}
