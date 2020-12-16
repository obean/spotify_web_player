import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

const samplePlaylists = ["christmas songs", "gym songs", "music to cry in the shower too"]

const Playlister = ({ playlisterShowing, hide, token, playPlaylist, playPlaylistWithStartPoint}) => { 
  const [playlists, setPlaylists] = useState([{}]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [currentPlaylistUri, setCurrentPlaylistUri] = useState("");
  const [searchOffset, setOffset] = useState(20);
  

  useEffect(() => {
    getPlaylists()
  },[])

  const getPlaylists = async (offset = 0) => {
    const data =  await fetch(`https://api.spotify.com/v1/me/playlists?offset=${offset}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async data => {
       let parsedData =  await data.json()
       offset === 0 ? setPlaylists(parsedData.items) : setPlaylists(playlists.concat(parsedData.items))
    })
    
  }

  // const getMorePlaylists = async () => {
  //   const data = await fetch
  // }

  const expandPlaylistSearch = async () => {
    const data = getPlaylistTracks(searchOffset)
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
                    {currentPlaylist && (<button type="button" className="modal-back-button" onClick={() => setCurrentPlaylist()} aria-label="Back">back</button>)}
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide(); setCurrentPlaylist()}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                    {playlists[1] && !currentPlaylist && (playlists.map(playlist => 
                      <p className="playlistName">
                        <span>{playlist.name}</span>
                        <button onClick={() => playPlaylist(playlist.uri)}>play</button>
                        <button onClick={() => {getPlaylistTracks(playlist.id); setCurrentPlaylistUri(playlist.uri)}}>view songs</button>
                      </p>)  
                      
                    )

                    }
                    {playlists[1] && !currentPlaylist && (
                    <div>
                    <button onClick={() => { setOffset(searchOffset + 20); getPlaylists(searchOffset)}}>More</button>
                    <button onClick={() => {setPlaylists(playlists.splice(-20)); setOffset(searchOffset - 20)}}>Less</button>
                    </div>
                    )}
                  
                    {currentPlaylist && (
                      <div className="playlist-songs">
                        {currentPlaylist.items.map(song => 
                            
                           <p className="song">
                             <span>{song.track.name} by {song.track.artists[0].name}</span>
                             <button onClick={() => playPlaylistWithStartPoint(currentPlaylistUri, song.track.uri)}> play </button>
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