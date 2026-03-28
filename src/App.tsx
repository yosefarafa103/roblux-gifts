import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Main from "./components/Main";
import { CoinsProvider } from "./context/coins.context";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CoinsProvider>
        <Toaster position="top-center" />
        <Main />
      </CoinsProvider>
    </QueryClientProvider>
  );
}

export default App;
