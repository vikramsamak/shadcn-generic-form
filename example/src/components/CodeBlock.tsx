import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Card, CardContent } from './ui/card';
import { useTheme } from './theme-provider';

interface CodeBlockProps {
  code: string;
  lang: string;
}

const CodeBlock = ({ code, lang }: CodeBlockProps) => {
  const { theme } = useTheme();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const highlight = async () => {
      const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light';
      const html = await codeToHtml(code, {
        lang,
        theme: shikiTheme,
      });
      setHtml(html);
    };

    highlight();
  }, [code, lang, theme]);

  return (
    <Card>
      <CardContent className="p-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </CardContent>
    </Card>
  );
};

export default CodeBlock;
