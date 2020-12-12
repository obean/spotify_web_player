import React, { useState, useEffect } from "react";
import './App.css';

const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
export const authEndpoint = 'https://accounts.spotify.com/authorize?'

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
      let _token = hash.access_token;
      console.log(hash.access_token)
      if(_token) {
        setToken(_token)
        console.log(token)
      }
  })


  return (
    <div className="App">
      <header className="App-header">
        {!token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            > Login to Spotify</a>  
        )}
  
      </header>
    </div>
  );
}

export default App;
