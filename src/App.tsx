import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import PokemonGame from "./components/PokemonGame";

function App() {
  const { level, init, end } = useAppSelector((state) => state.game.levelConfigurations);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> {level} {init} {end}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <PokemonGame />
      </header>
    </div>
  );
}

export default App;
