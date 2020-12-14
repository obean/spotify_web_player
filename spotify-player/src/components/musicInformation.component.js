import React, { useState, useEffect, useRef } from "react";

function MusicInformation(props)  {
  const [nowPlaying, setNowPlaying] = useState({ 
    album: {
      images: [
        { url: ""}, 
        { url: "" }
      ] 
    },
    name: "",
    artists: [
      { name: "" }
    ],
    duration_ms: 0,
    id: ''
  });

  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    id: ""
  });

  let interval = useRef();

  const waitForPlayerUpdates = () => {
    props.player.on('player_state_changed', state => {
      console.log(state.track_window.current_track.name)
      console.log(nowPlaying.name)
      if(state.track_window.current_track.name !== nowPlaying.name) {
        console.log("we changin")
      }
    })
  }  

  const followExternalPlayer = () => {
    clearInterval(interval)
    interval = setInterval(() => {
      getCurrentlyPlaying()}
      , 5000)
  }



  const getCurrentlyPlaying =   async  () => {
    const data = await fetch("https://api.spotify.com/v1/me/player",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + props.token
      }
    }).then((data) => { data.status === 200 ? playerIsLive(data) : console.log("nothing is playing") })  
  }

  const playerIsLive = async (data) => {
    const parsedData = await data.json()
    if( parsedData.device.id !== props.player._options.id) {
      setNowPlaying( parsedData.item)
      setCurrentPlayer(parsedData.device)
      followExternalPlayer()
    }else {
      clearInterval(interval)
      waitForPlayerUpdates();
      setCurrentPlayer(parsedData.device);
      setNowPlaying( parsedData.item);
      
    }
  }

return (  
  <div class="musicInfo">
    <button onClick={() => getCurrentlyPlaying()}>Get info</button>
    {nowPlaying.name && (
      <div class="artist-info">
        <img src={nowPlaying.album.images[1].url} />
        <h2>{nowPlaying.name}</h2>
        <h3>{nowPlaying.artists[0].name}</h3>
        <p>playing on {currentPlayer.name}</p>
      </div>
    )}
  </div>
)
}  


export default MusicInformation;