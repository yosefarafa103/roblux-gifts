import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Main from "./components/Main";
import { CoinsProvider } from "./context/coins.context";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CoinsProvider>
        <Main />
      </CoinsProvider>
    </QueryClientProvider>
  );
}

export default App;
