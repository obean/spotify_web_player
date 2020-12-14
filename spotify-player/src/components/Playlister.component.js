import React from "react";
import ReactDOM from 'react-dom';

const samplePlaylists = ["christmas songs", "gym songs", "music to cry in the shower too"]

const Playlister = ({ playlisterShowing, hide }) => playlisterShowing ? ReactDOM.createPortal(
 <React.Fragment>
    <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
            {samplePlaylists.map(playlist => 
              <div className="playlistName">
                <span>{playlist}</span> <button>play</button><button>view songs</button>
              </div>
            )}
          </p>
        </div>
      </div>
  </React.Fragment>, document.body


) : null ;

export default Playlister;