import "./App.css";
import Main from "./components/Main";
import { CoinsProvider } from "./context/coins.context";

function App() {
  return (
    <CoinsProvider>
      <Main />
    </CoinsProvider>
  );
}

export default App;
