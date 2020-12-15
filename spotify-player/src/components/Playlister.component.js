import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

const samplePlaylists = ["christmas songs", "gym songs", "music to cry in the shower too"]

const Playlister = ({ playlisterShowing, hide, token, playPlaylist }) => { 
  const [playlists, setPlaylists] = useState([{}]);

  useEffect(() => {
    getPlaylists()
  },[])

  const getPlaylists = async () => {
    const data =  await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async data => {
       let parsedData =  await data.json()
       setPlaylists(parsedData.items)
       console.log(parsedData.items)
    })
      

     
  }

  if(playlisterShowing) { 
    return (
      ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
              <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                  <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                    {playlists[1] && playlists.map(playlist => 
                      <p className="playlistName">
                        <span>{playlist.name}</span> <button onClick={() => playPlaylist(playlist.uri)}>play</button><button>view songs</button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
          </React.Fragment>, document.body)


)}else {return null}};

export default Playlister;