import React, { useState, useEffect, useRef } from "react";
import './App.css';
import ControlBar from './components/controlBar.component.js'

const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
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
  const [player, setPlayer] = useState();
  const [devices, setDevices] = useState([]);

  let interval = useRef();

  useEffect(() => {
      let _token = hash.access_token;
      if(_token) {
        setToken(_token)
        console.log(token)
        checkForPlayer()
      }
  }, [])

  useEffect(() => {
    if(token) {
      interval = setInterval(() => checkForPlayer(), 1000);

    }
  }, [token])
  
  useEffect(() => {
    if(player){
    player.connect();
    console.log("player connect hasn't thrown an error, nice")
    }
  }, [player])

  const checkForPlayer = () => {
    clearInterval(interval)
    console.log("about to check if window.spotify is null")
    if(window.Spotify != null) {
      console.log("window.spotify is defined")
      setPlayer(new window.Spotify.Player({
        name: "HomeHub Spotify Player",
        getOAuthToken: cb => cb(token)
      }
      ))   
    }
  }
    
  //below function for getting all devices currently activated on the spotify user account. Not currently needed but returns correct information. 

  // const getCurrentDevices = async () => {
  //  const activeDevices = await fetch('https://api.spotify.com/v1/me/player/devices', {
  //     headers: {
  //       "Authorization": "Bearer " + token 
  //     }
  //   }).then(activeDevices => activeDevices.json())
  //     .then(activeDevices =>  setDevices(activeDevices.devices))
  //     .then(  console.log(devices))
  // }

  const setActivePlayer = async () => {
    console.log(devices)
    await fetch(`https://api.spotify.com/v1/me/player`,{ //    id=${player._options.id}`, {
      method: "PUT",
      headers: {
        'Authorization':  "Bearer " + token
      }, 
      body: JSON.stringify({
        "device_ids": [
          "137c510a442d23d27ad158d9231a7e788983773c"
        ]
      })
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        {!token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            > Login to Spotify</a>  
        )}
        {token && (
          <div id="player-frame">
            <ControlBar 
              player={player}
            />  
            <button onClick={() => setActivePlayer() }>play through this device</button>  {/* button for development only, enables you to set current playback to this browser, rather than selecting this browser on another device.*/}
          </div>  
          
        )}
        {/* {devices > 0 && (
        devices.map(device =>  {return <h3> {device.id}: {device.name} </h3>})
        )} */}
      </header>
    </div>
  );
}

export default App;
