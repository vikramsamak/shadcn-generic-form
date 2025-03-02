import { ScrollArea } from "./components/ui/scroll-area";
import Header from "./components/header";
import GenericFormCard from "./components/generic-form-card";

function App() {
  return (
    <ScrollArea className="flex flex-col h-screen">
      <Header />
      <main className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4">
        <GenericFormCard />
      </main>
    </ScrollArea>
  );
}

export default App;
