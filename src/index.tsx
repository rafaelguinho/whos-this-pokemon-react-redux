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
    applicationId: '135d31a5-d99b-4965-beba-82a7a0f887b2',
    clientToken: 'pubc96a85ef2921c46ee957c28f24e2a87d',
    site: 'datadoghq.com',
    service:'test',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input'
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
