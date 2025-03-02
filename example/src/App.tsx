import Header from "./components/header";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  return (
    <ScrollArea className="flex flex-col h-screen">
      <Header />
      <main></main>
    </ScrollArea>
  );
}

export default App;
