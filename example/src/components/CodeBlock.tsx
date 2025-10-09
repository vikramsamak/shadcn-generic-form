import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const { theme } = useTheme();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const highlight = async () => {
      const shikiTheme = theme === 'dark' ? 'one-dark-pro' : 'min-light';

      const html = await codeToHtml(code.trim(), {
        lang,
        theme: shikiTheme,
      });
      setHtml(html);
    };
    highlight();
  }, [code, lang, theme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <Card className="relative overflow-hidden border bg-background/60 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2 text-xs font-mono text-muted-foreground">
        <span className="select-none">{lang}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-muted"
          onClick={handleCopy}
        >
          <Copy className="h-3.5 w-3.5" />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>

      {/* Code Content */}
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Card>
  );
}
