import React, { useState, useEffect, useRef } from "react";
import './controlBar.css'
import  pauseButton  from '../controlBarButtons/pauseButton.png'
function ControlBar(props) {



  return(
    <div id="controlBar">
      <div class="controlBar-button">
      <h3>&#10094;</h3>
      </div>
      <div class="controlBar-button"><img src={pauseButton} /></div>
      <div class="controlBar-button"><h3>&#10095;</h3></div>
    </div>
  )
}

export default ControlBar; 