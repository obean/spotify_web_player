import React, { useState, useEffect, useRef } from "react";
import './controlBar.css'
import  pauseButton  from '../controlBarButtons/pauseButton.png'
import {FaPauseCircle, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
function ControlBar(props) {



  return(
    <div id="controlBar">
      <div class="controlBar-button">
      <FaArrowAltCircleLeft/>
      </div>
      <div class="controlBar-button"> <FaPauseCircle/> </div>
      <div class="controlBar-button"> <FaArrowAltCircleRight/> </div>
    </div>
  )
}

export default ControlBar; 