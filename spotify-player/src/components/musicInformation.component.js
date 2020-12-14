import React, { useState, useEffect, useRef } from "react";

function MusicInformation(props)  {
  const [nowPlaying, setNowPlaying] = useState({ 
    album: {
      images: [{ url: ""}, { url: "" }] 
    },
    name: "",
    artists: [{ name: "" }],
    duration_ms: 0
  });
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    id: ""
  }
  );


  // useEffect(() => {
  //   if(props.token){
  //     getCurrentlyPlaying();
  //   }
  // }, [props.token])

  const getCurrentlyPlaying =   async  () => {
    console.log("here is the token: " + props.token) 
    const data = await fetch("https://api.spotify.com/v1/me/player",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + props.token
      }
    }
  
    ).then((data) => { data.status === 200 ? playerIsLive(data) : console.log("nothing is playing") })
     
  }

  const playerIsLive = async (data) => {
    const parsedData = await data.json()
    console.log(await parsedData)
    console.log( parsedData.device.name)
    console.log(props.player._options.name)
    if( parsedData.device.id !== props.player._options.id) {
      setNowPlaying( parsedData.item)
      setCurrentPlayer(parsedData.device)
      console.log(`playing on  ${parsedData.device.name}`)
    }else {
      // setCurrentPlayer
      console.log("playing here!")
    }
    console.log(nowPlaying)
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