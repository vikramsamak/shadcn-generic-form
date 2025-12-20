import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  prism,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTheme = theme === 'dark' ? vscDarkPlus : prism;

  return (
    <Card className="border bg-background/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="relative p-0">
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy code to clipboard"
            title="Copy code to clipboard"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="text-sm leading-relaxed overflow-hidden">
          <SyntaxHighlighter
            language={lang}
            style={activeTheme}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              background: 'transparent',
              borderRadius: '0px',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'var(--font-mono)',
              },
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
}
