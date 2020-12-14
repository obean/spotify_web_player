import React, { useState, useEffect, useRef } from "react";

function MusicInformation(props)  {
  const [nowPlaying, setNowPlaying] = useState({ album: {
    images: [{ url: ""}, { url: "" }] 
 },
 device: "",
 name: "",
 artists: [{ name: "" }],
 duration_ms: 0
});

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
    //       if(data.status === 200) {
    //      playerIsLive(data.json())
            
    //    } else {
    //      console.log("nothing is playing")
    //    }
    // });
    // , {
    //   headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization':  "Bearer " + props.token
    //         }
    // }).then(data => data.json())
    //   .then(setNowPlaying(data.item))
    // // console.log(data)
    
    // // setIsPlaying(data.is_playing);
    // // setProgress_ms(data.progress_ms);
  }

  const playerIsLive = async (data) => {
    const parsedData = await data.json()
    console.log(await parsedData)
    console.log( parsedData.device.name)
    console.log(props.player._options.name)
    if( parsedData.device.id !== props.player._options.id) {
      console.log(`playing on  ${parsedData.device.name}`)
    }else {
      console.log("playing here!")
    }

  }

return (  
  <div class="musicInfo">
    <button onClick={() => getCurrentlyPlaying()}>Get info</button>
    {nowPlaying.name && (
      <h1>{nowPlaying.name}</h1>
    )}
  </div>
)
}  


export default MusicInformation;