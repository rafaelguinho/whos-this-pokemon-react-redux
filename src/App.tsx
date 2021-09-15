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
        
        <PokemonGame />
      </header>
    </div>
  );
}

export default App;
