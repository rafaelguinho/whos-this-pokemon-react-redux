import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonGame from "./components/PokemonGame";
import GameOverScreen from "./components/GameOverScreen";
import GameBeatScreen from "./components/GameBeatScreen";
import GlobalStyle from "./global-styles";

import { datadogRum } from "@datadog/browser-rum";

try {
  datadogRum.init({
    applicationId: "13a95106-dbfe-4bf3-8512-5ec0b734407a",
    clientToken: "pubdcc68c76d8a57ca0ab26c0a673bc0e92",
    site: "datadoghq.com",
    service: "pipe-de-vendas",
    // Specify a version number to identify the deployed version of your application in Datadog
    version: "1.0.0",
    defaultPrivacyLevel: "mask-user-input",
  });

  datadogRum.startSessionReplayRecording();
} catch (e) {
  console.log(e);
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/game">
            <PokemonGame />
          </Route>
          <Route path="/game-over">
            <GameOverScreen />
          </Route>
          <Route path="/game-beat">
            <GameBeatScreen />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
