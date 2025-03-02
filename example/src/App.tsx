import Header from "./components/header";
import ConfigPanel from "./components/playground/ConfigPanel";
import { ScrollArea } from "./components/ui/scroll-area";
import { PlaygroundProvider } from "./contexts/PlaygroundContext";

function App() {
  return (
    <ScrollArea className="flex flex-col h-screen">
      <Header />
      <PlaygroundProvider>
        <main>
          <ConfigPanel />
        </main>
      </PlaygroundProvider>
    </ScrollArea>
  );
}

export default App;
