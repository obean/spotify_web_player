import React, {useEffect, useState, useRef} from "react";
import ReactDOM from 'react-dom';

const Searcher = ({ searcherShowing, hide, token,}) => {
  const [searchValue, setSearchValue] = useState("");
  const [resultToDisplay, setResultToDisplay] = useState("tracks")
  const [artistSearchResults, setArtistSearchResults] = useState()
  const [albumSearchResults, setAlbumSearchResults] = useState()
  const [trackSearchResults, setTrackSearchResults] = useState()



  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("making search") 
      makeSearch()
    }, 500 )
    return () => clearTimeout(timeout)
  }, [searchValue])

  
  const makeSearch = async () => {
    if(searchValue.length > 0){
      const data = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=album,track,artist`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then(async data => {
        let parsedData = await data.json();
        setAlbumSearchResults(parsedData.albums)
        setArtistSearchResults(parsedData.artists)
        setTrackSearchResults(parsedData.tracks.items)
        console.log(parsedData.tracks.items)
        console.log(trackSearchResults)
      })
    }
  }

  if(searcherShowing) { 
    return (
      ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
              <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                  <div className="modal-header">
                    {(artistSearchResults || albumSearchResults || trackSearchResults) && (
                      <div classNAme="filterSearch">
                        <button>albums</button>
                        <button>Artists</button>
                        <button>tracks</button>
                      </div>
                    )}
                   <form >
                     <input type="text" value={searchValue} placeholder="Search Spotify..." onChange={e => {setSearchValue(e.target.value)}}/>
                   </form>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide()}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                  {trackSearchResults && (
                    <div className="track-search-results">
                       {trackSearchResults.map(song => 
                            
                        <p className="song">
                          <span>{song.name} by {song.artists[0].name}</span>
                          {/* <button onClick={() => playPlaylistWithStartPoint(currentPlaylistUri, song.track.uri)}> play </button> */}
                         {/*  <button onClick={() => playPlaylist(currentPlaylist.uri, currentPlaylist.indexOf(song))} > play </button> */ }
                        </p>
                     )}
                     </div>
                        

                    
                  )}
                  </div>
                </div>
              </div>
          </React.Fragment>, document.body)

    )
  }else {
    return null
  }
};

export default Searcher;