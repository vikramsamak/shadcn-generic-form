import Header from "./components/header";
import ConfigPanel from "./components/playground/ConfigPanel";
import { PlaygroundProvider } from "./contexts/PlaygroundContext";

function App() {
  return (
    <>
      <Header />
      <PlaygroundProvider>
        <main>
          <ConfigPanel />
        </main>
      </PlaygroundProvider>
    </>
  );
}

export default App;
