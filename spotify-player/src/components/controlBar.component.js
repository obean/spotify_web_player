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
    props.player.pause()
                .then(() => setIsPlaying(true))
                .then(() => console.log("playback resumed"))
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
      <div class="controlBar-button"> <FaArrowAltCircleRight/> </div>
    </div>
  )
}

export default ControlBar; 