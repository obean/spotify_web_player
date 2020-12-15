import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

const samplePlaylists = ["christmas songs", "gym songs", "music to cry in the shower too"]

const Playlister = ({ playlisterShowing, hide, token, playPlaylist, playPlaylistWithStartPoint}) => { 
  const [playlists, setPlaylists] = useState([{}]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [currentPlaylistUri, setCurrentPlaylistUri] = useState("")

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
       console.log(playlists)
    })
  }

  const getPlaylistTracks = async (playlist_id) => {
    const data = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async data => {
      let parsedData = await data.json()
      setCurrentPlaylist(parsedData)
      console.log(currentPlaylist)
      console.log(parsedData)
    })
  }
  if(currentPlaylist){console.log("theres a playlist :/")}
  if(playlisterShowing) { 
    return (
      ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
              <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                  <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide(); setCurrentPlaylist()}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                    {playlists[1] && !currentPlaylist && (playlists.map(playlist => 
                      <p className="playlistName">
                        <span>{playlist.name}</span> <button onClick={() => playPlaylist(playlist.uri)}>play</button><button onClick={() => {getPlaylistTracks(playlist.id); setCurrentPlaylistUri(playlist.uri)}}>view songs</button>
                      </p>)
                    )}
                    {currentPlaylist && (
                      <div className="playlist-songs">
                        {currentPlaylist.items.map(song => 
                            
                           <p className="song">
                             <span>{song.track.name} by {song.track.artists[0].name}</span>
                             <button onClick={() => playPlaylistWithStartPoint(currentPlaylistUri, song.track.uri)}> play </button>
                            {/*  <button onClick={() => playPlaylist(currentPlaylist.uri, currentPlaylist.indexOf(song))} > play </button> */ }
                           </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </React.Fragment>, document.body)


)}else {return null}};

export default Playlister;