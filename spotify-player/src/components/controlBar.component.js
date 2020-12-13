import React, { useState, useEffect, useRef } from "react";
import './controlBar.css'
import {FaPauseCircle, FaPlayCircle, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
function ControlBar(props) {
  const [isPlaying, setIsPlaying] = useState()

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


  return(
    <div id="controlBar">
      <div class="controlBar-button"> <FaArrowAltCircleLeft onClick={previousTrack}/> </div>
      {isPlaying && (
      <div class="controlBar-button"> <FaPauseCircle onClick={() => pausePlayer()}/> </div>
      )}
      {!isPlaying && (
        <div class="controlBar-button"> <FaPlayCircle onClick={() => resumePlayer()}/> </div>
       )}
      <div class="controlBar-button"> <FaArrowAltCircleRight onClick={() => nextTrack()}/> </div>
    </div>
  )
}

export default ControlBar; 