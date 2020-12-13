import React, { useState, useEffect, useRef } from "react";
import './controlBar.css'
import {FaPauseCircle, FaPlayCircle, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
function ControlBar(props) {
  const [isPlaying, setIsPlaying] = useState();
  const [volume, setVolume] = useState(100);

  // useEffect(() => {
  //   const getVolume = async () => {
  //     const data = await  props.player.getVolume()
  //                                     .then(data => setVolume(data) )
  //                                     .then(console.log(volume))
  //   }
  //   getVolume();
  // }, [props.player] )



  let interval = useRef();

  const pausePlayer = () => {
    props.player.pause()
                .then(() => setIsPlaying(false))
                .then(() => console.log("playback paused"))
  }

  const resumePlayer = () => {
    props.player.resume()
                .then(() => setIsPlaying(true))
                .then(() => console.log("playback resumed"))
  }

  const nextTrack = () => {
    props.player.nextTrack()
                .then(() => {
                  if(!isPlaying) {
                    setIsPlaying(true)
                  }
                })
                .then(() => console.log("track skipped"))
  }

  const previousTrack = () => {
    props.player.previousTrack() 
                .then(() => console.log("previous track "))
  }

  const setPlayerVolume = event => {
    props.player.setVolume(event.target.value/100)
    setVolume(event.target.value)
  }


  return(
    <div id="controlBar">
      <div class="controlBar-button"> <FaArrowAltCircleLeft onClick={previousTrack}/> </div>
      {isPlaying ? <div class="controlBar-button"> <FaPauseCircle onClick={() => pausePlayer()}/> </div> 
                 : <div class="controlBar-button"> <FaPlayCircle onClick={() => resumePlayer()}/> </div>
      }
      <div class="controlBar-button"> <FaArrowAltCircleRight onClick={() => nextTrack()}/> </div>
      <div class="controlBar-slider">
        <input type="range"
               class="slider"
               id="volume-slider"
               value={volume} 
               onChange={(event) => setPlayerVolume(event)} 
               min="0" max="100" 
        />
      </div>
    </div>
  )
}

export default ControlBar; 