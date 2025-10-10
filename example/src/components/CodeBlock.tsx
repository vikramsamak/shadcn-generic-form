import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Card, CardContent } from '@/components/ui/card';
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
      const shikiTheme =
        theme === 'dark' ? 'github-dark' : 'github-light-default';

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
    <Card className="border bg-accent backdrop-blur-sm">
      <CardContent className="relative overflow-hidden">
        <div className="absolute right-5 top-5 flex items-center text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted"
            aria-label="Copy code to clipboard"
            title="Copy code to clipboard"
            onClick={handleCopy}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Code Content */}
        <div
          className="overflow-x-auto p-4 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </CardContent>
    </Card>
  );
}
