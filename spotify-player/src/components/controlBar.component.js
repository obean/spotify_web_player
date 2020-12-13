import React, { useState, useEffect, useRef } from "react";
import './controlBar.css'
import  pauseButton  from '../controlBarButtons/pauseButton.png'
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


  return(
    <div id="controlBar">
      <div class="controlBar-button">
      <FaArrowAltCircleLeft/>
      </div>
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