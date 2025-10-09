import { ScrollArea } from "./components/ui/scroll-area";
import Header from "./components/header";
import GenericFormCard from "./components/generic-form-card";
import CodeBlock from "./components/CodeBlock";

function App() {
  const installationCommand =
    "npx shadcn@latest add https://shadcn-generic-form.vercel.app/shadcn-generic-form.json";

  return (
    <ScrollArea className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] p-4 gap-4">
        <CodeBlock code={installationCommand} lang="bash" />
        <GenericFormCard />
      </main>
    </ScrollArea>
  );
}

export default App;
